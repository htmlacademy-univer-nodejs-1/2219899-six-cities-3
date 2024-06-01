import {Command} from './command.interface.js';
import chalk from 'chalk';
import {RentOffer} from '../../common/types/index.js';
import {
  DefaultUserService,
  UserEntity,
  UserModel,
  UserService
} from '../../common/modules/user/index.js';
import {DefaultOfferService, OfferModel, OfferService} from '../../common/modules/offer/index.js';
import {parseOffer} from '../../common/utils/index.js';
import {DatabaseClient, MongoClient} from '../../common/libs/database_client/index.js';
import {ConsoleLogger, Logger} from '../../common/libs/logger/index.js';
import {TsvReader} from '../../common/libs/reader/index.js';

class CommandImport implements Command {
  private readonly importErrorMessage: string = 'Error while importing file data.\nMessage error: ';

  private readonly importArgumentErrorMessage: string =
    `Command "--import" accepts argument of filename.
Example: ./src/main.cli.ts --import mocks/offer_rent.tsv`;

  private readonly name: string = '--import';

  private readonly userService: UserService;
  private readonly offerService: OfferService;
  private readonly dbClient: DatabaseClient;
  private readonly logger: Logger;
  private salt!: string;

  constructor() {
    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.dbClient = new MongoClient(this.logger);

    this.onImportComplete = this.onImportComplete.bind(this);
    this.onImportedLine = this.onImportedLine.bind(this);
  }

  getName(): string {
    return this.name;
  }

  async process(..._params: string[]): Promise<void> {
    const [fileName, mongoURI, salt] = _params;
    this.salt = salt;
    await this.dbClient.connect(mongoURI);

    if (fileName === undefined) {
      console.error(chalk.red(this.importArgumentErrorMessage));
      return;
    }

    const tsvReader = new TsvReader();
    tsvReader.on('line', this.onImportedLine);
    tsvReader.on('end', this.onImportComplete);

    try {
      await tsvReader.readStream(fileName);
    } catch (e: unknown) {
      console.error(chalk.red.bold(this.importErrorMessage));
    }
  }

  private async onImportedLine(line: string, resolve: () => void): Promise<void> {
    const rent: RentOffer = parseOffer(line);
    await this.saveOffer(rent);
    resolve();
  }

  private async onImportComplete(rowCount: number): Promise<void> {
    console.log(`Successfully imported ${rowCount} rows to database`);
    await this.dbClient.disconnect();
  }

  private async saveOffer(offer: RentOffer): Promise<void> {
    const user: UserEntity = await this.userService.findOrCreate({
      ...offer.user, password: 'any',
    }, this.salt);
    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: {name: offer.city, location: {longitude: offer.location.longitude, latitude: offer.location.latitude}},
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      type: offer.type,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      price: offer.price,
      goods: offer.goods,
      location: {longitude: offer.location.longitude, latitude: offer.location.latitude},
      host: user.id
    });
  }
}

export {CommandImport};

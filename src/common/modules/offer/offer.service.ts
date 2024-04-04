import {DocumentType, types} from '@typegoose/typegoose';
import {CreateOfferDto} from './dto';
import {OfferService} from './offer-service.interface';
import {OfferEntity} from './offer.entity';
import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {Logger} from '../../logger';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }


  async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Offer "${result.title}" is created`);
    return result;
  }

  async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById(id).exec();
  }
}

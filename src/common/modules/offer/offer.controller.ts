import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {OfferService} from './offer-service.interface.js';
import {Request, Response} from 'express';
import {schemaValidate} from '../../utils';
import {OfferRDO} from './rdo';
import {CreateOfferDto} from './dto';
import {StatusCodes} from 'http-status-codes';
import {
  BaseController,
  HTTPException,
  HttpMethod,
  RequestBody,
  RequestParams
} from '../../libs/rest';
import {Logger} from '../../libs/logger';


type CreateUpdateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.addRoute({method: HttpMethod.GET, path: '/offers', handler: this.getOffers});
    this.addRoute({method: HttpMethod.POST, path: '/offers', handler: this.createOffer});
    this.addRoute({method: HttpMethod.GET, path: '/offers/:id', handler: this.getOfferById});
    this.addRoute({method: HttpMethod.PATCH, path: '/offers/:id', handler: this.updateOfferByID});
    this.addRoute({method: HttpMethod.DELETE, path: '/offers/:id', handler: this.deleteOfferById});
    this.addRoute({method: HttpMethod.GET, path: '/premium', handler: this.getPremiumOffers});
    this.addRoute({method: HttpMethod.GET, path: '/favourites', handler: this.getFavouritesOffers});
    this.addRoute({
      method: HttpMethod.POST,
      path: '/favourites/:id',
      handler: this.addFavoriteOffer
    });
    this.addRoute({
      method: HttpMethod.DELETE,
      path: '/favourites/:id',
      handler: this.deleteFavoriteOffer
    });
  }

  public async getOffers(_req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.find();
    const responseData = schemaValidate(Array<OfferRDO>, offer);
    this.ok(res, responseData);
  }

  public async createOffer({body}: CreateUpdateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const responseData = schemaValidate(OfferRDO, result);
    this.created(res, responseData);
  }

  public async getOfferById(req: Request, res: Response): Promise<void> {
    const offerId = req.params.id;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.NOT_FOUND, 'Not found');
    }
    const offerRDO = schemaValidate(OfferRDO, offer);
    this.ok(res, offerRDO);
  }

  public async updateOfferByID(req: CreateUpdateOfferRequest, res: Response): Promise<void> {
    const offerId = String(req.params.id);
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Bad Request');
    }
    const updated = await this.offerService.updateById(offerId, req.body);
    const offerRDO = schemaValidate(OfferRDO, updated);
    this.ok(res, offerRDO);
  }

  public async deleteOfferById(req: Request, res: Response): Promise<void> {
    const offerId = String(req.params.id);
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Bad Request');
    }
    await this.offerService.deleteById(offerId);
    this.noContent(res);
  }

  public async getPremiumOffers(req: Request, res: Response): Promise<void> {
    const city = req.params.city;
    if (!city) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, '"city" is required at params');
    }
    const offers = await this.offerService.findPremiumOffers(city);
    const responseData = schemaValidate(Array<OfferRDO>, offers);
    this.ok(res, responseData);
  }

  public async getFavouritesOffers(_req: Request, res: Response): Promise<void> {
    const favouriteOffers = await this.offerService.findFavouriteOffer();
    const responseData = schemaValidate(Array<OfferRDO>, favouriteOffers);
    this.ok(res, responseData);
  }

  public async addFavoriteOffer(req: Request, res: Response): Promise<void> {
    const offerId = req.params.id;
    if (!offerId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Bad request');
    }
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.NOT_FOUND, 'Not found');
    }
    const result = await this.offerService.addFavourite(offerId);
    const responseData = schemaValidate(OfferRDO, result);
    this.ok(res, responseData);
  }

  public async deleteFavoriteOffer(req: Request, res: Response): Promise<void> {
    const offerId = req.params.id;
    if (!offerId) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Bad Request');
    }
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.NOT_FOUND, 'Not found');
    }
    const result = await this.offerService.deleteFavourite(offerId);
    const responseData = schemaValidate(OfferRDO, result);
    this.ok(res, responseData);
  }
}

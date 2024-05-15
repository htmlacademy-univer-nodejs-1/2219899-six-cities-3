import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {OfferService} from './offer-service.interface.js';
import {Request, Response} from 'express';
import {schemaValidate} from '../../utils';
import {OfferListRdo, OfferRDO} from './rdo';
import {CreateOfferDto} from './dto';
import {StatusCodes} from 'http-status-codes';
import {
  BaseController,
  HTTPException,
  HttpMethod,
  RequestBody,
  RequestParams,
  RequestQuery
} from '../../libs/rest';
import {Logger} from '../../libs/logger';
import {CommentRdo} from '../comment/rdo/comment.rdo';
import {CommentService} from '../comment';
import {ParamsDictionary} from 'express-serve-static-core';

export type ParamOfferId = { offerId: string } | ParamsDictionary;
type CreateUpdateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
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
    this.addRoute({
      handler: this.getOfferComments,
      method: HttpMethod.GET,
      path: '/offers/:offerId/comments'
    });
  }

  public async getOffers(
    {query}: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.find(query.limit);
    const responseData = schemaValidate(Array<OfferListRdo>, offer);
    this.ok(res, responseData);
  }

  public async createOffer({body}: CreateUpdateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    const responseData = schemaValidate(OfferRDO, offer);
    this.created(res, responseData);
  }

  public async getOfferById({params}: Request, res: Response): Promise<void> {
    const offerId = params.id;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.NOT_FOUND, 'Not found');
    }
    const offerRDO = schemaValidate(OfferRDO, offer);
    this.ok(res, offerRDO);
  }

  public async updateOfferByID({
    body,
    params
  }: CreateUpdateOfferRequest, res: Response): Promise<void> {
    const offerId = String(params.id);
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Bad Request');
    }
    const updated = await this.offerService.updateById(offerId, body);
    const offerRDO = schemaValidate(OfferRDO, updated);
    this.ok(res, offerRDO);
  }

  public async deleteOfferById({params}: Request, res: Response): Promise<void> {
    const offerId = String(params.id);
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'Bad Request');
    }
    await this.offerService.deleteById(offerId);
    this.noContent(res);
  }

  public async getPremiumOffers(
    {query}: Request<unknown, unknown, unknown, RequestQuery>,
    res: Response
  ): Promise<void> {
    const city = query.city;
    if (!city) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, '"city" is required at params');
    }
    const offers = await this.offerService.findPremiumOffers(city);
    const responseData = schemaValidate(Array<OfferListRdo>, offers);
    this.ok(res, responseData);
  }

  public async getFavouritesOffers(_req: Request, res: Response): Promise<void> {
    const favouriteOffers = await this.offerService.findFavouriteOffer();
    const responseData = schemaValidate(Array<OfferListRdo>, favouriteOffers);
    this.ok(res, responseData);
  }

  public async addFavoriteOffer({params}: Request, res: Response): Promise<void> {
    const offerId = params.id;
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

  public async deleteFavoriteOffer({params}: Request, res: Response): Promise<void> {
    const offerId = params.id;
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

  public async getOfferComments({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.isExists(params.offerId)) {
      throw new HTTPException(StatusCodes.NOT_FOUND, `Offer with id ${params.offerId} not found.`);
    }
    const comments = await this.commentService.getCommentsByOfferId(params.offerId);
    this.ok(res, schemaValidate(CommentRdo, comments));
  }
}

import {
  BaseController,
  HTTPException,
  HttpMethod,
  PrivateRouteMiddleware,
  RequestBody,
  ValidateObjectIDMiddleware
} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {OfferService} from '../offer/index.js';
import {StatusCodes} from 'http-status-codes';
import {schemaValidate} from '../../utils/index.js';
import {Request, Response} from 'express';
import {CreateCommentDTO} from './dto/index.js';
import {CommentRdo} from './rdo/index.js';
import {ParamsDictionary} from 'express-serve-static-core';

type ParamOfferId = { offerId: string } | ParamsDictionary;
type CreateCommentRequest = Request<ParamOfferId, RequestBody, CreateCommentDTO>;

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for CommentController');
    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [
        new ValidateObjectIDMiddleware('offerId'),
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async create(
    {body, params, tokenPayload}: CreateCommentRequest,
    res: Response
  ): Promise<void> {
  const offer = await this.offerService.findById(params.offerId);
    if (!offer) {
      throw new HTTPException(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...body, userId: tokenPayload.id, offerId: offer.id});
    await this.offerService.incrementCommentCount(offer.id);
    await this.offerService.updateOfferRating(offer.id);
    this.created(res, schemaValidate(CommentRdo, comment));
  }
}

import {
  BaseController,
  HTTPException,
  HttpMethod,
  PrivateRouteMiddleware,
  RequestBody,
  ValidateDTOMiddleware,
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
        new ValidateDTOMiddleware(CreateCommentDTO),
        new PrivateRouteMiddleware()
      ]
    });
  }

  public async create(
    {body, params, tokenPayload}: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (!await this.offerService.isExists(params.offerId)) {
      throw new HTTPException(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'CommentController'
      );
    }

    if (params.offerId !== body.offerId) {
      throw new HTTPException(
        StatusCodes.BAD_REQUEST,
        'Offer Ids not equals.',
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...body, userId: tokenPayload.id});
    await this.offerService.incrementCommentCount(params.offerId);
    await this.offerService.updateOfferRating(params.offerId);
    this.created(res, schemaValidate(CommentRdo, comment));
  }
}

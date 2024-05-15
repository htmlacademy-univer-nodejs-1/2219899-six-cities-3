import {BaseController, HTTPException, RequestBody} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {UserService} from '../user/index.js';
import {OfferService} from '../offer/index.js';
import {StatusCodes} from 'http-status-codes';
import {schemaValidate} from '../../utils/index.js';
import {Request, Response} from 'express';
import {CreateCommentDTO} from './dto/index.js';
import {CommentRdo} from './rdo/index.js';

type ParamOfferId = {offerId: string};
type CreateCommentRequest = Request<ParamOfferId, RequestBody, CreateCommentDTO>;

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
  ) {
    super(logger);

  }

  public async create(
    { body, params }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.isExists(params.offerId)) {
      throw new HTTPException(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'CommentController'
      );
    }

    if (!await this.userService.findById(body.userId)) {
      throw new HTTPException(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incrementCommentCount(params.offerId);
    // await this.offerService.updateRank(params.offerId);
    this.created(res, schemaValidate(CommentRdo, comment));
  }
}

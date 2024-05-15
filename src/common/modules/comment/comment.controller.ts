import {BaseController, HTTPException, RequestBody} from '../../libs/rest';
import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {Logger} from '../../libs/logger';
import {CommentService} from './comment-service.interface';
import {UserService} from '../user';
import {OfferService} from '../offer';
import {StatusCodes} from 'http-status-codes';
import {schemaValidate} from '../../utils';
import {Request, Response} from 'express';
import {CreateCommentDTO} from './dto';
import {CommentRdo} from './rdo';

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

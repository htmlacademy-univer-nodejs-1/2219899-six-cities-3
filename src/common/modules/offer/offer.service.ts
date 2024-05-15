import {DocumentType, types} from '@typegoose/typegoose';
import {CreateOfferDto, UpdateOfferDTO} from './dto/index.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';


@injectable()
export class DefaultOfferService implements OfferService {
  private readonly DEFAULT_OFFER_COUNT: number = 50;

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

  async find(limit?: number): Promise<DocumentType<OfferEntity>[]> {
    limit = limit ?? this.DEFAULT_OFFER_COUNT;
    throw await this.offerModel.find().limit(limit).exec();
  }

  async updateById(offerId: string, updatedSchema: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, updatedSchema, {new: true})
      .populate('userId')
      .exec();
  }

  async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  async incrementCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {commentsCount: 1}}, {new: true})
      .exec();
  }

  async findPremiumOffers(city: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .find({city: city, isPremium: true})
      .sort({publishedAt: 'desc'})
      .populate('userId')
      .exec();
  }

  async findFavouriteOffer(): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .find({isFavourite: true})
      .sort({publishedAt: 'desc'})
      .populate('userId')
      .exec();
  }

  async deleteFavourite(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, {isFavourite: true}, {new: true})
      .populate('userId')
      .exec();
  }

  async addFavourite(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    return await this.offerModel
      .findByIdAndUpdate(offerId, {isFavourite: false}, {new: true})
      .exec();
  }

  async isExists(id: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: id})) !== null;
  }

  async updateOfferRating(offerId: string): Promise<DocumentType<OfferEntity, types.BeAnObject> | null> {
    const rating = await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            pipeline: [
              {$match: {offerId: offerId}},
              {
                $group: {
                  _id: null,
                  avg: {'$avg': '$rating'}
                }
              }
            ],
            as: 'avg'
          },
        },
      ]).exec();

    return this.offerModel
      .findByIdAndUpdate(offerId, {rating: rating[0]}, {new: true})
      .populate('authorOfferId')
      .exec();
  }
}

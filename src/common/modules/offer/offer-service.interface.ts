import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto, UpdateOfferDTO} from './dto/index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(id: string): Promise<DocumentType<OfferEntity> | null>;

  find(limit?: number): Promise<DocumentType<OfferEntity>[]>;

  updateById(offerId: string, updatedSchema: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  incrementCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  findPremiumOffers(city: string): Promise<DocumentType<OfferEntity>[]>;

  findFavouriteOffer(): Promise<DocumentType<OfferEntity>[]>;

  deleteFavourite(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  addFavourite(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  isExists(id: string): Promise<boolean>;

  updateOfferRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}

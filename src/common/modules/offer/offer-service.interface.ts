import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity';
import {CreateOfferDto, UpdateOfferDTO} from './dto';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(id: string): Promise<DocumentType<OfferEntity> | null>;

  find(limit: number): Promise<DocumentType<OfferEntity>[]>;

  updateById(offerId: string, updatedSchema: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;

  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  incrementCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  findPremiumOffers(city: string): Promise<DocumentType<OfferEntity>[]>;

  findFavouriteOffer(city: string): Promise<DocumentType<OfferEntity>[]>;

  deleteFavourite(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  addFavourite(offerId: string): Promise<DocumentType<OfferEntity> | null>;

  isExists(id: string): Promise<boolean>;

  updateOfferRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}

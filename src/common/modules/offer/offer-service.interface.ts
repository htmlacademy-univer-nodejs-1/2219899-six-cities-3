import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity';
import {CreateOfferDto} from './dto';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;

  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}

import {Container} from 'inversify';
import {OfferService} from './offer-service.interface';
import {Component} from '../../types';
import {DefaultOfferService} from './offer.service';
import {types} from '@typegoose/typegoose';
import {OfferEntity, OfferModel} from './offer.entity';

export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  return offerContainer;
}

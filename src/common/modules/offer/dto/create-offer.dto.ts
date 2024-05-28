import {AccommodationType, ConveniencesEnum, Location, RequestCity} from '../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsObject,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {CreateOfferValidationMessage} from './create-offer.messages.js';

export class CreateOfferDto {
  @IsString({message: CreateOfferValidationMessage.title.required})
  @Length(10,100, {message: CreateOfferValidationMessage.title.length})
  public title: string;

  @IsString({message: CreateOfferValidationMessage.description.required})
  @Length(20, 1024, {message: CreateOfferValidationMessage.description.length})
  public description: string;

  @IsObject({message: CreateOfferValidationMessage.city.invalid})
  public city: RequestCity;

  @IsString({message: CreateOfferValidationMessage.previewImage.required})
  @MaxLength(256, {message: CreateOfferValidationMessage.previewImage.maxLength})
  public previewImage: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  @Length(6, 6, {message: CreateOfferValidationMessage.images.length})
  public images: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsInt({message: CreateOfferValidationMessage.bedrooms.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.bedrooms.minValue})
  @Max(8, {message: CreateOfferValidationMessage.bedrooms.maxValue})
  public bedrooms: number;

  @IsInt({message: CreateOfferValidationMessage.maxAdults.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.maxAdults.minValue})
  @Max(10, {message: CreateOfferValidationMessage.maxAdults.maxValue})
  public maxAdults: number;

  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.goods.invalidFormat})
  @IsEnum(ConveniencesEnum, {each: true, message: CreateOfferValidationMessage.goods.invalid})
  public goods: ConveniencesEnum[];

  @IsObject({message: CreateOfferValidationMessage.location.invalidFormat})
  public location: Location;

  @IsEnum(AccommodationType, {message: CreateOfferValidationMessage.type.invalid})
  public type: AccommodationType;

  @IsMongoId({message: CreateOfferValidationMessage.host.invalidId})
  public host: string;
}

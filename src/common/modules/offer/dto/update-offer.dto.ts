import {AccommodationType, ConveniencesEnum, Location} from '../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber, IsObject,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min
} from 'class-validator';
import {UpdateOfferValidationMessage} from './update-offer.messages.js';
import {City} from '../../../types/index.js';

export class UpdateOfferDTO {
  @IsString({message: UpdateOfferValidationMessage.title.required})
  @Length(10,100,{message: UpdateOfferValidationMessage.title.length})
  public title: string;

  @IsString({message: UpdateOfferValidationMessage.description.required})
  @Length(20,1024, {message: UpdateOfferValidationMessage.description.length})
  public description: string;

  @IsOptional()
  @IsEnum(City, {message: UpdateOfferValidationMessage.type.invalid})
  public city: string;

  @IsOptional()
  @IsString({message: UpdateOfferValidationMessage.previewImage.required})
  @MaxLength(256, {message: UpdateOfferValidationMessage.previewImage.maxLength})
  public previewImage: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.images.invalidFormat})
  @Length(6, 6, {message: UpdateOfferValidationMessage.images.length})
  public images: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isFavourites.invalidFormat})
  public isFavourite: boolean;

  @IsOptional()
  @IsNumber({}, {message: UpdateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.rating.minValue})
  @Max(5, {message: UpdateOfferValidationMessage.rating.maxValue})
  public rating: number;

  @IsOptional()
  @IsEnum(AccommodationType, {message: UpdateOfferValidationMessage.type.invalid})
  public type: AccommodationType;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.bedrooms.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.bedrooms.minValue})
  @Max(8, {message: UpdateOfferValidationMessage.bedrooms.maxValue})
  public bedrooms: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.maxAdults.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.maxAdults.minValue})
  @Max(10, {message: UpdateOfferValidationMessage.maxAdults.maxValue})
  public maxAdults: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: UpdateOfferValidationMessage.price.minValue})
  @Max(100000, {message: UpdateOfferValidationMessage.price.maxValue})
  public price: number;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.goods.invalidFormat})
  @IsEnum(ConveniencesEnum, {each: true, message: UpdateOfferValidationMessage.goods.invalid})
  public goods: ConveniencesEnum[];

  @IsObject({message: UpdateOfferValidationMessage.location.invalidFormat})
  public location: Location;

  @IsOptional()
  @IsMongoId({message: UpdateOfferValidationMessage.host.invalidId})
  public host: string;
}

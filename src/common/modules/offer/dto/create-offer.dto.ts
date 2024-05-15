import {AccommodationType, ConveniencesEnum} from '../../../types';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsMongoId,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {CreateOfferValidationMessage} from './create-offer.messages';
import {City} from '../../../types';

export class CreateOfferDto {
  @IsString({message: CreateOfferValidationMessage.title.required})
  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title!: string;

  @IsString({message: CreateOfferValidationMessage.description.required})
  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description!: string;

  @IsEnum(City, {message: CreateOfferValidationMessage.type.invalid})
  public city!: City;

  @IsString({message: CreateOfferValidationMessage.previewImage.required})
  @MaxLength(256, {message: CreateOfferValidationMessage.previewImage.maxLength})
  public previewImage!: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  @Length(6, 6, {message: CreateOfferValidationMessage.images.length})
  public images!: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium!: boolean;
  public isFavourite!: boolean;

  @IsInt({message: CreateOfferValidationMessage.bedrooms.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.bedrooms.minValue})
  @Max(8, {message: CreateOfferValidationMessage.bedrooms.maxValue})
  public bedrooms!: number;

  @IsInt({message: CreateOfferValidationMessage.maxAdults.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.maxAdults.minValue})
  @Max(10, {message: CreateOfferValidationMessage.maxAdults.maxValue})
  public maxAdults!: number;

  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price!: number;

  @IsArray({message: CreateOfferValidationMessage.goods.invalidFormat})
  @IsEnum(ConveniencesEnum, {each: true, message: CreateOfferValidationMessage.goods.invalid})
  public goods!: ConveniencesEnum[];

  @IsArray({message: CreateOfferValidationMessage.location.invalidFormat})
  @Length(2, 2, {message: CreateOfferValidationMessage.location.length})
  @IsInt({each: true, message: CreateOfferValidationMessage.location.invalidFormat})
  public location!: [number, number];

  @IsEnum(AccommodationType, {message: CreateOfferValidationMessage.type.invalid})
  public type!: AccommodationType;

  @IsMongoId({message: CreateOfferValidationMessage.host.invalidId})
  public host!: string;
}

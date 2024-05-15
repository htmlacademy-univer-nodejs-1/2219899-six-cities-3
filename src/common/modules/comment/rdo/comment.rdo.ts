import {Expose, Type} from 'class-transformer';
import {OfferRDO} from '../../offer';
import {UserRDO} from '../../user';


export class CommentRdo {
  // TODO: Проверить
  @Expose()
  public id?: string;

  @Expose()
  public comment?: string;

  @Expose()
  public rating?: number;

  @Expose({name: 'createdAt'})
  public postDate?: string;

  @Expose({name: 'userId'})
  @Type(() => UserRDO)
  public user?: UserRDO;

  @Expose({name: 'offerId'})
  @Type(() => OfferRDO)
  public offer?: OfferRDO;
}

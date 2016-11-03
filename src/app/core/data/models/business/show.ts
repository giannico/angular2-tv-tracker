import { BusinessModel } from '../business-model';
import { PartialBusinessModel } from '../partial-business-model';
import { ModelUtils } from '../model-utils';

const TYPE = 'shows';

export class PartialShow extends PartialBusinessModel {
  static deserializeList: (items: Array<any>) => Array<PartialShow> =
      ModelUtils.getDeserializeListFn<PartialShow>(PartialShow);

  static deserializeItem: (item: any) => PartialShow =
      ModelUtils.getDeserializeItemFn<PartialShow>(PartialShow);

  name: string;
  image: any;

  constructor(data) {
    super(TYPE, data.$key);
    this.name = data.name;
    this.image = data.image;
  }

  toJSON() {
    return {
      name: this.name,
      image: this.image
    };
  }
}

export class Show extends BusinessModel {
  static deserializeList: (items: Array<any>) => Array<Show> =
      ModelUtils.getDeserializeListFn<Show>(Show);

  static deserializeItem: (item: any) => Show =
      ModelUtils.getDeserializeItemFn<Show>(Show);

  public name: string;
  public network: string;
  public image: any;

  public derivedData = {
    isFavorite: null
  };

  constructor(data) {
    super(TYPE, data.$key);
    this.name = data.name;
    this.network = data.network;
    this.image = data.image;
  }

  toPartialShow(): PartialShow {
    return new PartialShow(this);
  }

  toJSON() {
    return {
      name: this.name,
      network: this.network,
      image: this.image
    };
  }
}

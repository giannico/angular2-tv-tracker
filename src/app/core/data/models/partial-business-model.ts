import { Model } from './model';

export abstract class PartialBusinessModel extends Model {
  foreignKey: string;

  constructor(type: string, $key: string) {
    super(type, $key);
    this.foreignKey = $key.split('_')[1];
  }

  abstract toJSON(): any;
}

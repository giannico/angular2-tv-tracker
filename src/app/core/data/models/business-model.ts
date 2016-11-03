import { Model } from './model';

export abstract class BusinessModel extends Model {
  constructor(type: string, $key: string) {
    super(type, $key);
  }

  public getReferenceKey(): string {
    return `${this.type}_${this.$key}`;
  }
}

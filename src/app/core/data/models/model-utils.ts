import { PartialBusinessModel } from './partial-business-model';

export class ModelUtils {
  static getDeserializeItemFn<T>(clazz: { new (data: any): T }): (value: any) => T {
    return (item) => {
      if (item == null) { return null; }

      return new clazz(item);
    };
  }

  static getDeserializeListFn<T>(clazz: { new (data: any): T }): (value: any[]) => T[] {
    return (items) => {
      if (items == null) { return null; }

      if (!Array.isArray(items)) {
        throw new Error(`ModelsUtils.deserializeModeList expects an array!`);
      }

      return items.map((item: any) => new clazz(item));
    };
  }

  static getForeignKeyMap(items: Array<PartialBusinessModel>): Map<string, any> {
    return items.reduce((acc: Map<string, PartialBusinessModel>, cur: PartialBusinessModel) => {
      acc.set(cur.foreignKey, cur);
      return acc;
    }, new Map<string, PartialBusinessModel>());
  }
}

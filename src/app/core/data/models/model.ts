export abstract class Model {
  constructor(public type: string, public $key: string) { }

  abstract toJSON(): any;
}

import { Injectable } from '@angular/core';
import { ToasterService, Toast, IToasterConfig, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Injectable()
export class Notifier {
  constructor(private toasterService: ToasterService) { }

  pop(type: string | Toast, title?: string, body?: string): Toast {
    return this.toasterService.pop(type, title, body);
  };

  success(title?: string, body?: string): Toast {
    return this.toasterService.pop('success', title, body);
  }

  error(title?: string, body?: string): Toast {
    return this.toasterService.pop('error', title, body);
  }
}

export class NotifierConfig extends ToasterConfig {
  constructor(configOverrides?: IToasterConfig) {
    super(configOverrides);
  }
}

export { Toast };

import { Directive, ElementRef, Renderer, OnInit, Input } from '@angular/core';
import { AuthManager, AuthUser } from '../../core';

@Directive({
  selector: '[hideAuth]'
})
export class HideAuthDirective implements OnInit {
  nativeElement: any;

  @Input() hidden: string;

  constructor(private el: ElementRef, private renderer: Renderer, private authManager: AuthManager) {
    this.nativeElement = el.nativeElement;
  }

  ngOnInit() {
    if (this.hidden != null) {
      throw new Error('hideAuth directive should not be used in combination with hidden');
    }

    this.authManager.authChange$
      .subscribe((user: AuthUser) => {
        this.updateVisibility();
      });
  }

  private updateVisibility() {
    const hideAttributeValue: string = this.authManager.isAuthenticated() ? 'true' : null;
    this.renderer.setElementAttribute(this.nativeElement, 'hidden', hideAttributeValue);
  }
}

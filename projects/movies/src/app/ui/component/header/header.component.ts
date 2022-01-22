import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-header',
  template: `
    <header>
      <ng-content></ng-content>
    </header>
  `,
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent {}

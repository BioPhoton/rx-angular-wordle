import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-modal',
  template: `
    <div class="overlay" [ngClass]="{ open: open }">
      <div class="content">
        <header>
          <h1>{{ title }}</h1>
          <button (click)="hide.emit()">
            <ui-icon icon="close"></ui-icon>
          </button>
        </header>
        <div class="content-container">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ModalComponent {

  @Input()
  public title: string = '';

  @Input()
  public open: boolean = false;

  @Output()
  public hide = new EventEmitter();
}

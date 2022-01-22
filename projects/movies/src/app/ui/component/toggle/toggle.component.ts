import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

let toggleId = 0;

@Component({
  selector: 'ui-toggle',
  template: `
    <label for="{{ id }}">
      <div class="text">
        <div class="title">{{ label }}</div>
        <div *ngIf="description" class="description">
          {{ description }}
        </div>
      </div>
      <div class="toggle">
        <input
          class="toggle-track"
          type="checkbox"
          id="{{ id }}"
          [checked]="checked"
          (change)="toggle.emit()"
        />
      </div>
    </label>
  `,
  styleUrls: ['toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class ToggleComponent {
  @Input()
  public label: string = '';

  @Input()
  public description: string | null = null;

  @Input()
  public checked: boolean = false;

  @Output()
  public toggle = new EventEmitter();

  public id: number;

  public constructor() {
    this.id = ++toggleId;
  }
}

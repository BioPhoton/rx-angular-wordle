import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TileRow } from '../../../shared/game/game.model';

@Component({
  selector: 'ui-board-row',
  template: `
    <ng-container *ngIf="state">
      <ui-board-tile *ngFor="let tile of state" [state]="tile.state">
        {{ tile.letter }}
      </ui-board-tile></ng-container
    >
  `,
  styleUrls: ['board-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BoardRowComponent {
  @Input()
  public state: TileRow | null = null;
}

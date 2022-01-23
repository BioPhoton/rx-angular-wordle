import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TileState } from 'projects/movies/src/app/shared/game/game.model';

@Component({
  selector: 'ui-board-tile',
  template: `<div class="tile" [ngClass]="state">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['board-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class BoardTileComponent {
  @Input()
  public state: TileState = 'empty';
}

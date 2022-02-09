import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map, Observable } from 'rxjs';
import { GameUiInputModel } from '../internal/game-ui-input.model';
import { getBoard, maxTry } from './board.transforms';
import { BoardModel } from './board.model';

@Component({
  selector: 'ui-board',
  template: `
    <div id="board">
      <ui-board-row *rxFor="let row of board$" [state]="row"></ui-board-row>
    </div>
  `,
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class BoardComponent {
  board$ = this.s.select('board');

  @Input()
  public nGuesses: number = maxTry;

  @Input()
  set boardState(_: Observable<GameUiInputModel>) {
    this.s.connect('board', _.pipe(map(getBoard)));
  }

  constructor(private s: RxState<BoardModel>) {
    this.s.set({ board: getBoard({ boardState: [], evaluations: [] }) });
  }

}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxInputType } from '../../../shared/rxa-custom/input-type.typing';
import { GameStateModel, BoardState } from '../../../shared/game/game.model';
import { RxState } from '@rx-angular/state';
import { coerceObservable } from '../../../shared/utils/coerceObservable';
import { map } from 'rxjs';

interface BoardModel {
  board: BoardState;
}

@Component({
  selector: 'ui-board',
  template: `
    <div id="board">
      <ui-board-row *rxFor="let row of board$" [state]="row"></ui-board-row>
    </div>
  `,
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardComponent {
  board$ = this.s.select('board');

  @Input()
  public nGuesses: number = 6;

  @Input()
  set boardState(_: RxInputType<GameStateModel>) {
    this.s.connect('board', coerceObservable(_).pipe(map(getBoard)));
  }

  constructor(private s: RxState<BoardModel>) {
    this.s.set({ board: getBoard({ guesses: [] }) });
  }
}

function getBoard({ guesses }: Pick<GameStateModel, 'guesses'>): BoardState {
  const board = [...guesses];
  while (board.length < 6) {
    board.push([
      { letter: '', state: 'empty' },
      { letter: '', state: 'empty' },
      { letter: '', state: 'empty' },
      { letter: '', state: 'empty' },
      { letter: '', state: 'empty' },
    ]);
  }
  return board;
}

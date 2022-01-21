import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxInputType } from '../../../shared/rxa-custom/input-type.typing';
import { Evaluation, GameStateModel } from '../../../shared/game/game.model';
import { RxState } from '@rx-angular/state';
import { coerceObservable } from '../../../shared/utils/coerceObservable';
import { map } from 'rxjs';


type Tile = {
  value: string,
  evaluation: Evaluation
};
type Board = Tile[];

interface BoardModel {
  board: Board
}

@Component({
  selector: 'ui-board',
  template: `
    <div id="board">
      <div class="tile" [attr.data-state]="tile.evaluation" *rxFor="let tile of board$">
        {{tile.value}}
      </div>

    </div>
  `,
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class BoardComponent {
  board$ = this.s.select('board');

  @Input()
  set boardState(_: RxInputType<GameStateModel>) {
    this.s.connect('board', coerceObservable(_).pipe(map(getBoard)));
  }

  constructor(private s: RxState<BoardModel>) {
    this.s.set({ board: getBoard({ boardState: [], evaluations: [] }) });
  }

}

function getBoard({ boardState, evaluations }: Pick<GameStateModel, 'boardState' | 'evaluations'>): Board {
  const tile = (value: string = '', evaluation: Evaluation): Tile => ({ value: value, evaluation });
  const boardStateViewModel: Tile[] = boardState
    .map(w => w.split(''))
    .flatMap((arr, rowIdx) => arr.map((value, colIdx) => tile(value, evaluations[rowIdx][colIdx])));
  const emptyRow = (): Tile[] => new Array(5).fill(tile('*', 'empty'));
  const emptyTiles: Tile[] = new Array(6 - boardState.length).fill(0).flatMap(emptyRow);
  return boardStateViewModel.concat(emptyTiles);
}

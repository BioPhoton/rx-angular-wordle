import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxInputType } from '../../../shared/rxa-custom/input-type.typing';
import { GameStateModel, BoardState } from '../../../shared/game/game.model';
import { RxState } from '@rx-angular/state';
import { map, Observable } from 'rxjs';
import { Evaluation } from '../../../shared/game-resource/server-game.model';
import { GameUiInputModel } from '../internal/game-ui-input.model';

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
  set boardState(_: Observable<GameUiInputModel>) {
    this.s.connect('board', _.pipe(map(getBoard)));
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

/*

const maxTry = 6;
const wordLength = 5;
function getBoard({ boardState, evaluations }: GameUiInputModel): Board {
  const tile = (value: string = '', evaluation: Evaluation): Tile => ({ value: value, evaluation });

  const boardStateViewModel: Tile[] = boardState
    // get an 5 slot string array out of the current word
    .map(w => w.split('').concat(Array(wordLength - w.length).fill('')))
    .flatMap((arr, rowIdx) => arr.map((value, colIdx) => {
      // if server state present take it otherwise create a tile with evaluation 'empty'
      const evaluatedTile = evaluations[rowIdx] ? tile(value, evaluations[rowIdx][colIdx]) : tile(value, 'empty');
      return evaluatedTile;
    }));
  const emptyRow = (): Tile[] => Array(wordLength).fill(tile('', 'empty'));
  const emptyTiles: Tile[] = Array(maxTry - boardState.length).fill(0).flatMap(emptyRow);
  console.log('boardState: ', boardStateViewModel.concat(emptyTiles));
  return boardStateViewModel.concat(emptyTiles);
}

 */

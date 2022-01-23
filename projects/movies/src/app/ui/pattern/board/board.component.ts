import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { map, Observable } from 'rxjs';
import { GameUiInputModel } from '../internal/game-ui-input.model';
import { LetterState, LetterTile } from '../internal/letter.model';

import { BoardState, RowState } from './board.model';

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
  providers: [RxState]
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
    this.s.set({ board: getBoard({ boardState: [], evaluations: [] }) });
  }

}

const maxTry = 6;
const wordLength = 5;

function getBoard({ boardState, evaluations }: GameUiInputModel): BoardState {
  const tile = (letter: string = '', state: LetterState): LetterTile => ({ letter, state });

  const boardStateViewModel: RowState[] = boardState
    // Get an 5 slot string array out of the current word
    .map(w => w.split('').concat(Array(wordLength - w.length).fill('')))
    .map((arr: string[], rowIdx: number) => arr.map((value: string, colIdx) => {
      // If server state present take it otherwise create a tile with evaluation 'empty'
      const evaluatedTile = evaluations[rowIdx] ? tile(value, evaluations[rowIdx][colIdx]) : tile(value, 'empty');
      return evaluatedTile;
    }));
  const emptyRow = (): RowState => Array(wordLength).fill(tile('', 'empty'));
  const emptyTiles: RowState[] = Array(maxTry - boardState.length).fill(0).map(emptyRow);
  console.log('boardState: ', boardStateViewModel.concat(emptyTiles));
  return boardStateViewModel.concat(emptyTiles);
}



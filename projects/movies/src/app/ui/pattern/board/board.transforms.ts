import { GameUiInputModel } from '../internal/game-ui-input.model';
import { LetterState, LetterTile } from '../internal/letter.model';
import { BoardState, RowState } from './board.model';

export const maxTry = 6;
const wordLength = 5;

export function getBoard({ boardState, evaluations }: GameUiInputModel): BoardState {
  const tile = (letter: string = '', state: LetterState): LetterTile => ({ letter, state });

  const boardStateViewModel: RowState[] = boardState
    // Get an 5 slot string array out of the current word
    .map(w => w.split('').concat(Array(wordLength - w.length).fill('')))
    .map((arr: string[], rowIdx: number) => arr.map((value: string, colIdx) => {
      // A complete evaluation is present
      if(Array.isArray(evaluations[rowIdx])) {
        // If server state present take it otherwise create a tile with evaluation 'empty'
        return evaluations[rowIdx][colIdx] ? tile(value, evaluations[rowIdx][colIdx]) : tile(value, 'empty');
      }
      // pending word without evaluation
      else {
        return tile(value, 'tbd');
      }
    }));
  const emptyRow = (): RowState => Array(wordLength).fill(tile('', 'empty'));
  const emptyTiles: RowState[] = Array(maxTry - boardState.length).fill(0).map(emptyRow);
  return boardStateViewModel.concat(emptyTiles);
}



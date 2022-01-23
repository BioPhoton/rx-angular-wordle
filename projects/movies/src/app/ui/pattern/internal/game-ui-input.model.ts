import { Word } from '../../../shared/game-resource/server-game.model';
import { BoardState } from '../../../app-shell/app-shell.model';

export type TileState = 'absent' | 'present' | 'correct' | 'empty' | 'tbd';
export type RowState = Array<{
  letter: Word;
  state: TileState;
}>;
export type GameUiInputModel = { guesses: BoardState; };

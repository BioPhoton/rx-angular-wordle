export type Word = string;
export type RowState = Array<{
  letter: Word;
  state: TileState;
}>;
export type BoardState = Array<RowState>;
export type TileState = 'absent' | 'present' | 'correct' | 'empty' | 'tbd';
export type GameStatus = 'PENDING' | 'WIN' | 'LOOSE';

export interface GameStateModel {
  guesses: BoardState;
  solution: Word;
  gameStatus: GameStatus;
  lastPlayedTs: number;
  lastCompletedTs: number;
  restoringFromLocalStorage: number;
  hardMode: number;
}

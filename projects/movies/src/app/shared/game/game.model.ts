export type Word = string;
export type TileState = 'absent' | 'present' | 'correct' | 'empty' | 'tbd';
export type Tile = {
  letter: Word;
  state: TileState;
};
export type TileRow = Array<Tile>;
export type BoardState = Array<TileRow>;
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

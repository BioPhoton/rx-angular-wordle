
export type Word = string;
export type Evaluation =  'absent' | 'present' | 'correct' | 'empty';
export type GameStatus =  'PENDING' | 'WIN' | 'LOOSE';
export interface GameStateModel {
  boardState: Word[];
  evaluations: Evaluation[][];
  rowIndex: number;
  solution: Word;
  gameStatus: GameStatus;
  lastPlayedTs: number;
  lastCompletedTs: number;
  restoringFromLocalStorage: number;
  hardMode: number;
}

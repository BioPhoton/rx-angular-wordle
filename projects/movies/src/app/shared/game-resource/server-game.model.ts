export type Word = string;

export type Evaluation = 'absent' | 'present' | 'correct';
export type GameStatus = 'PENDING' | 'WIN' | 'LOOSE';

export interface ServerGameModel {
  boardState: Word[];
  evaluations: Evaluation[][];
  rowIndex: number;
  solution: Word;
  gameStatus: GameStatus;
  lastPlayedTs: number;
  lastCompletedTs: number;
  restoringFromLocalStorage: number;
  hardMode: boolean;
}

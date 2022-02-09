
export interface GameGetDto {
  boardState: string[];
  evaluations: string[][];
  rowIndex: number;
  solution: string;
  gameStatus: string;
  lastPlayedTs: number;
  lastCompletedTs: number;
  restoringFromLocalStorage: number;
  hardMode: number;
}

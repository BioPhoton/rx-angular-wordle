import { LetterTile } from '../internal/letter.model';

export type RowState = LetterTile[];
export type BoardState = RowState[];

export interface BoardModel {
  board: BoardState;
}

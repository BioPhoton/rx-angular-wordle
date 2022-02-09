import { LetterTile } from '../internal/letter.model';

export type Keys = LetterTile[]

export interface KeyBoardModel {
  keyRows: Keys[];
}

export type Letter = string;
export type LetterState = 'absent' | 'present' | 'correct' | 'empty' | 'tbd';
export type LetterTile = {
  letter: Letter;
  state: LetterState;
};

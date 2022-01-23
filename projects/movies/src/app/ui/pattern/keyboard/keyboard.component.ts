import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { GameUiInputModel } from '../internal/game-ui-input.model';
import { LetterState, LetterTile } from '../internal/letter.model';

type Keys = LetterTile[];

interface KeyBoardState {
  keyRows: Keys[];
}

@Component({
  selector: 'ui-keyboard',
  template: `
    <div id="keyboard" *rxLet="keyRows$; let keyRows">
      <div class="keyboard-row">
        <button
          [attr.data-key]="k.state"
          [attr.data-state]="k.state"
          *ngFor="let k of keyRows[0]"
          (click)="key.next(k.letter)"
        >
          {{ k.letter }}
        </button>
      </div>
      <div class="keyboard-row">
        <div class="spacer half"></div>
        <button
          [attr.data-key]="k.letter"
          [attr.data-state]="k.state"
          *ngFor="let k of keyRows[1]"
          (click)="key.next(k.state)"
        >
          {{ k.letter }}
        </button>
        <div class="spacer half"></div>
      </div>
      <div class="keyboard-row">
        <button [attr.data-key]="'↵'" class="one-and-a-half">enter</button>
        <button
          [attr.data-key]="k.letter"
          [attr.data-state]="k.state"
          *ngFor="let k of keyRows[2]"
          (click)="key.next(k.letter)"
        >
          {{ k.letter }}
        </button>
        <button [attr.data-key]="'←'" class="one-and-a-half">
          <ui-icon icon="backspace"></ui-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardComponent extends RxState<KeyBoardState> {
  key = new Subject<string>();
  keyRows$ = this.select('keyRows');

  @Input()
  set boardState(_: Observable<GameUiInputModel>) {
    this.connect('keyRows', _.pipe(map(getKeyBoardState)));
  }

  @Output()
  press = this.key;

}

const keyboardRow1 = 'qwertyuiop'.split('');
const keyboardRow2 = 'asdfghhjkl'.split('');
const keyboardRow3 = 'zxcvbnm'.split('');
const keys = [...keyboardRow1, ...keyboardRow2, ...keyboardRow3];
// const ENTER: LetterTile = { letter: 'ENTER', state: 'empty' };
// const BACK: LetterTile = { letter: 'BACK', state: 'empty' };

function getKeyBoardState({ boardState, evaluations }: GameUiInputModel): Keys[] {
  const keysMap: Record<string, LetterState> = keys.reduce(
    (map, letter) => ({
      ...map,
      [letter]: 'empty'
    }),
    {}
  );

  evaluations.forEach((row, rowIdx) => {
      row.forEach((state, letterIdx) => {
        console.log(boardState[rowIdx][letterIdx], state);
        keysMap[boardState[rowIdx][letterIdx]] = state;
      });
    }
  );

  const allKeys = Object.entries(keysMap).map(([letter, state]) => ({
    letter,
    state
  }));

  return [
    allKeys.splice(0, keyboardRow1.length),
    allKeys.splice(0, keyboardRow2.length),
    allKeys.splice(0, keyboardRow3.length)
  ];
}

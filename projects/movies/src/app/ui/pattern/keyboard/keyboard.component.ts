import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { RxInputType } from '../../../shared/rxa-custom/input-type.typing';
import { map, Subject } from 'rxjs';
import { TileState, GameStateModel } from '../../../shared/game/game.model';
import { coerceObservable } from '../../../shared/utils/coerceObservable';
import { RxState } from '@rx-angular/state';

type Key = {
  value: string;
  evaluation: TileState;
};

type Keys = Key[];

interface KeyBoardState {
  keyRows: Keys[];
}

@Component({
  selector: 'ui-keyboard',
  template: `
    <div id="keyboard" *rxLet="keyRows$; let keyRows">
      <div class="keyboard-row">
        <button
          [attr.data-key]="k.value"
          [attr.data-state]="k.evaluation"
          *ngFor="let k of keyRows[0]"
          (click)="key.next(k.value)"
        >
          {{ k.value }}
        </button>
      </div>
      <div class="keyboard-row">
        <div class="spacer half"></div>
        <button
          [attr.data-key]="k.value"
          [attr.data-state]="k.evaluation"
          *ngFor="let k of keyRows[1]"
          (click)="key.next(k.value)"
        >
          {{ k.value }}
        </button>
        <div class="spacer half"></div>
      </div>
      <div class="keyboard-row">
        <button [attr.data-key]="'↵'" class="one-and-a-half">enter</button>
        <button
          [attr.data-key]="k.value"
          [attr.data-state]="k.evaluation"
          *ngFor="let k of keyRows[2]"
          (click)="key.next(k.value)"
        >
          {{ k.value }}
        </button>
        <button [attr.data-key]="'←'" class="one-and-a-half">
          <ui-icon icon="backspace"></ui-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent extends RxState<KeyBoardState> {
  key = new Subject<string>();
  keyRows$ = this.select('keyRows');

  @Input()
  set boardState(_: RxInputType<GameStateModel>) {
    this.connect('keyRows', coerceObservable(_).pipe(map(getKeyBoardState)));
  }

  @Output()
  keyPress = this.key;
}

const keyboardRow1 = 'qwertyuiop'.split('');
const keyboardRow2 = 'asdfghhjkl'.split('');
const keyboardRow3 = 'zxcvbnm'.split('');
const keys = [...keyboardRow1, ...keyboardRow2, ...keyboardRow3];

function getKeyBoardState({ guesses }: GameStateModel): Keys[] {
  const keysMap: Record<string, TileState> = keys.reduce(
    (map, value) => ({
      ...map,
      [value]: 'empty',
    }),
    {}
  );
  guesses.forEach((row) =>
    row.forEach((tile) => {
      keysMap[tile.letter] = tile.state;
    })
  );
  const allKeys = Object.entries(keysMap).map(([value, evaluation]) => ({
    value,
    evaluation,
  }));
  return [
    allKeys.splice(0, keyboardRow1.length),
    allKeys.splice(0, keyboardRow2.length - 1),
    allKeys.splice(0, keyboardRow3.length),
  ];
}

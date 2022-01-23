import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { GameStateModel, TileState } from '../../../shared/game/game.model';
import { RxState } from '@rx-angular/state';
import { GameUiInputModel } from '../internal/game-ui-input.model';
import { BoardTileModule } from '../board-tile/board-tile.module';

type Key = {
  letter: string;
  state: TileState;
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
const ENTER: Tile = { letter: 'ENTER', state: 'empty' };
const BACK = { letter: 'BACK', state: 'empty' as TileState };

function getKeyBoardState({ guesses }: GameStateModel): Keys[] {
  const keysMap: Record<string, TileState> = keys.reduce(
    (map, value) => ({
      ...map,
      [value]: 'empty'
    }),
    {}
  );
  guesses.forEach((row: string[]) =>
    row.forEach((tile: Key) => {
      keysMap[tile.letter] = tile.state;
    })
  );
  const allKeys = Object.entries(keysMap).map(([value, evaluation]) => ({
    value,
    evaluation
  }));
  return [
    allKeys.splice(0, keyboardRow1.length),
    [ENTER].concat(allKeys.splice(0, keyboardRow2.length)).concat(BACK),
    allKeys.splice(0, keyboardRow3.length)
  ];
}

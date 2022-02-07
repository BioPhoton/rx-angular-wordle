import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { GameUiInputModel } from '../internal/game-ui-input.model';
import { KeyBoardModel } from './keyboard.model';
import { getKeyBoardState } from './keyboard.transforms';

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
        <button [attr.data-key]="'↵'" class="one-and-a-half" (click)="key.next('ENTER')">enter</button>
        <button
          [attr.data-key]="k.letter"
          [attr.data-state]="k.state"
          *ngFor="let k of keyRows[2]"
          (click)="key.next(k.letter)"
        >
          {{ k.letter }}
        </button>
        <button [attr.data-key]="'←'" class="one-and-a-half" (click)="key.next('BACK')">
          <ui-icon icon="backspace"></ui-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./keyboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardComponent extends RxState<KeyBoardModel> {
  key = new Subject<string>();
  keyRows$ = this.select('keyRows');

  @Input()
  set boardState(_: Observable<GameUiInputModel>) {
    this.connect('keyRows', _.pipe(map(getKeyBoardState)));
  }

  @Output()
  press = this.key;

}

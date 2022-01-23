import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RowState } from '../../../shared/game/game.model';

@Component({
  selector: 'app-instructions',
  template: `
    <ui-page>
      <div class="instructions">
        <p>Guess the <strong>WORDLE</strong> in 6 tries.</p>
        <p>
          Each guess must be a valid 5 letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
        <div class="examples">
          <p><strong>Examples</strong></p>
          <div class="example">
            <ui-board-row [state]="correct"></ui-board-row>
            <p>
              The letter <strong>W</strong> is in the word and in the correct
              spot.
            </p>
          </div>
          <div class="example">
            <ui-board-row [state]="present"></ui-board-row>
            <p>
              The letter <strong>I</strong> is in the word but in the wrong
              spot.
            </p>
          </div>
          <div class="example">
            <ui-board-row [state]="absent"> </ui-board-row>
            <p>The letter <strong>U</strong> is not in the word in any spot.</p>
          </div>
        </div>
        <p>
          <strong
            >A new WORDLE will be available each day!<strong></strong
          ></strong>
        </p>
      </div>
    </ui-page>
  `,
  styleUrls: ['instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class InstructionsComponent {
  public correct: RowState = [
    { letter: 'w', state: 'correct' },
    { letter: 'e', state: 'tbd' },
    { letter: 'a', state: 'tbd' },
    { letter: 'r', state: 'tbd' },
    { letter: 'y', state: 'tbd' },
  ];

  public present: RowState = [
    { letter: 'p', state: 'tbd' },
    { letter: 'i', state: 'present' },
    { letter: 'l', state: 'tbd' },
    { letter: 'l', state: 'tbd' },
    { letter: 's', state: 'tbd' },
  ];

  public absent: RowState = [
    { letter: 'v', state: 'tbd' },
    { letter: 'a', state: 'tbd' },
    { letter: 'g', state: 'tbd' },
    { letter: 'u', state: 'absent' },
    { letter: 'e', state: 'tbd' },
  ];
}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'app-settings',
  template: `
    <ui-page>
      <div id="settings">
        <ui-toggle
          label="Hard Mode"
          description="Any revealed hints must be used in subsequent guesses"
        >
        </ui-toggle>
        <ui-toggle
          *rxLet="isDarkTheme$; let darkTheme"
          [checked]="darkTheme"
          label="Dark Theme"
          (toggle)="toggleDarkTheme()"
        >
        </ui-toggle>
        <ui-toggle
          *rxLet="isColorblindTheme$; let colorblindTheme"
          [checked]="colorblindTheme"
          label="Color Blind Mode"
          description="High contrast colors"
          (toggle)="toggleColorblindTheme()"
        >
        </ui-toggle>
      </div>
      <div id="footnote">
        <div>
          <div id="privacy-policy">
            <a
              href="https://www.powerlanguage.co.uk/privacy-policy.html"
              target="_blank"
              >Privacy Policy</a
            >
          </div>
          <div id="copyright">Copyright 2021-2022. All Rights Reserved.</div>
        </div>
        <div>
          <div id="puzzle-number">#217</div>
          <div id="hash">e65ce0a5</div>
        </div>
      </div>
    </ui-page>
  `,
  styleUrls: ['settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class SettingsComponent extends RxState<{
  isDarkTheme: boolean;
  isColorblindTheme: boolean;
}> {
  public isDarkTheme$ = this.select('isDarkTheme');
  public isColorblindTheme$ = this.select('isColorblindTheme');

  constructor() {
    super();
    this.set({ isDarkTheme: false, isColorblindTheme: false });
    this.hold(this.isDarkTheme$, this.toggleDarkThemeClass);
    this.hold(this.isColorblindTheme$, this.toggleColorblindThemeClass);
  }

  public toggleDarkThemeClass(isDarkTheme: boolean): void {
    window.document.body.classList.toggle('darkTheme', isDarkTheme);
  }

  public toggleColorblindThemeClass(isColorblindTheme: boolean): void {
    window.document.body.classList.toggle('colorblindTheme', isColorblindTheme);
  }

  public toggleDarkTheme(): void {
    this.set((oldState) => ({ isDarkTheme: !oldState.isDarkTheme }));
  }
  public toggleColorblindTheme(): void {
    this.set((oldState) => ({
      isColorblindTheme: !oldState.isColorblindTheme,
    }));
  }
}

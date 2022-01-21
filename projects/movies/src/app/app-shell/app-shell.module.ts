import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { DarkModeToggleModule } from '../ui/component/dark-mode-toggle/dark-mode-toggle.module';
import { AppShellComponent } from './app-shell.component';
import { LazyModule } from '../shared/cdk/lazy/lazy.module';
import { KeyboardModule } from '../ui/pattern/keyboard/keyboard.module';
import { BoardModule } from '../ui/pattern/board/board.module';

@NgModule({
  declarations: [AppShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    DarkModeToggleModule,
    LazyModule,
    KeyboardModule, BoardModule
  ],
  exports: [AppShellComponent]
})
export class AppShellModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LetModule } from '@rx-angular/template/let';
import { AppShellComponent } from './app-shell.component';
import { InstructionsModule } from './pages/instructions/instructions.module';
import { SettingsModule } from './pages/settings/settings.module';
import { LazyModule } from '../shared/cdk/lazy/lazy.module';
import { KeyboardModule } from '../ui/pattern/keyboard/keyboard.module';
import { BoardModule } from '../ui/pattern/board/board.module';
import { HeaderModule } from '../ui/component/header/header.module';
import { IconModule } from '../ui/component/icon/icon.module';
import { ModalModule } from '../ui/component/modal/modal.module';

@NgModule({
  declarations: [AppShellComponent],
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    InstructionsModule,
    SettingsModule,
    HeaderModule,
    IconModule,
    ModalModule,
    LazyModule,
    KeyboardModule,
    BoardModule,
  ],
  exports: [AppShellComponent],
})
export class AppShellModule {}

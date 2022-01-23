import { NgModule } from '@angular/core';
import { KeyboardComponent } from './keyboard.component';
import { LetModule } from '@rx-angular/template';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../component/icon/icon.module';

@NgModule({
  declarations: [KeyboardComponent],
  imports: [CommonModule, LetModule, IconModule],
  exports: [KeyboardComponent],
})
export class KeyboardModule {}

import { NgModule } from '@angular/core';
import { KeyboardComponent } from './keyboard.component';
import { LetModule } from '@rx-angular/template';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [KeyboardComponent],
  imports: [
    CommonModule,
    LetModule
  ],
  exports: [KeyboardComponent]
})
export class KeyboardModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle.component';
import { LetModule } from '@rx-angular/template/let';

@NgModule({
  declarations: [ToggleComponent],
  exports: [ToggleComponent],
  imports: [CommonModule, LetModule],
})
export class ToggleModule {}

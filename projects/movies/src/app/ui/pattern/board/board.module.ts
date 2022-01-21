import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BoardComponent } from './board.component';
import { RxForModule } from '../../../shared/rxa-custom/rx-for/rx-for.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, RxForModule],
  exports: [BoardComponent],
})
export class BoardModule {
}

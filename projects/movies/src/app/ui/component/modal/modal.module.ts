import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { HeaderModule } from '../header/header.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [CommonModule, HeaderModule, IconModule],
})
export class ModalModule {}

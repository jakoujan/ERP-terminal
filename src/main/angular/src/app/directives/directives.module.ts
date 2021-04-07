import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardDirective } from './keyboard.directive';



@NgModule({
  declarations: [
    KeyboardDirective
  ],
  exports: [
    KeyboardDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }

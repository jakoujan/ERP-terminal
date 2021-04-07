import { Directive, HostListener, Input } from '@angular/core';
import Keyboard from "simple-keyboard";
import { AbstractControl } from '@angular/forms';
import { KeyboardService } from '../services/keyboard.service';
import layout from "simple-keyboard-layouts/build/layouts/spanish";
@Directive({
  selector: '[keyboard]'
})
export class KeyboardDirective {

  @Input('keyboard') control: AbstractControl

  keyboard: Keyboard;

  constructor(private keyboardService: KeyboardService) { }

  @HostListener('focus') onFocus = () => {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: layout
    });

    this.keyboard.setInput(this.control ? this.control.value : '');

    this.keyboardService.change(true);
  }

  @HostListener('input') onInputChange = () => {
    this.keyboard.setInput(this.control ? this.control.value : '');
  };

  /*@HostListener('blur') onMouseLeave() {
    this.keyboard.setInput('');
    this.keyboardService.change(false);
  }*/

  onChange = (input: string) => {
    this.control.setValue(input);
  };

  onKeyPress = (button: string) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

}

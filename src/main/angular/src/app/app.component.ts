import { Component } from '@angular/core';
import { KeyboardService } from './services/keyboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  shk: boolean = false;
  numeric: boolean = false;

  constructor(public keyboardService: KeyboardService) {
    this.keyboardService.$controller.subscribe(parameter => {
      this.shk = parameter.show;
      this.numeric = parameter.numeric;
    });
  }

  public activateKeyboard() {
    this.keyboardService.setVisible(!this.keyboardService.isVisible());
  }

  public get keyboard() {
    return this.keyboardService.isVisible() ? 'keyboard_hide' : 'keyboard';
  }

  public closeKeyboard() {
    this.keyboardService.change(false);
  }
}

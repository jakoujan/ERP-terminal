import { Component, OnInit } from '@angular/core';
import { KeyboardService } from './services/keyboard.service';
import { ConfigurationService } from './services/configuration.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';

  shk: boolean = false;
  numeric: boolean = false;

  constructor(public keyboardService: KeyboardService, private configurationService: ConfigurationService) {
    this.keyboardService.$controller.subscribe(parameter => {
      this.shk = parameter.show;
      this.numeric = parameter.numeric;
    });
  }

  ngOnInit(): void {
    this.configurationService.get().subscribe(configuration => {
      environment.API_URL = configuration.host;
      environment.APP_NAME = configuration.name;
      environment.PAID_SALE = configuration.paid;
      console.log(environment);
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

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ConfigurationComponent } from 'src/app/components/modules/configuration/configuration.component';
import { Session } from 'src/app/interfaces/session';
import { KeyboardService } from 'src/app/services/keyboard.service';
import { constants, environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  @SessionStorage(constants.SESSION)
  session: Session;


  @ViewChild('drawer')
  drawer: MatSidenav;

  shk: boolean = false;
  appName: string = environment.APP_NAME;
  screen = 'fullscreen';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    private keyboardService: KeyboardService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.appName = environment.APP_NAME;
  }

  public toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.screen = 'fullscreen_exit';
    } else if (document.exitFullscreen) {
      this.screen = 'fullscreen';
      document.exitFullscreen();
    }
  }

  public goto(action: string) {
    this.router.navigate([action]);
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

  public configuration() {
    this.dialog.open(ConfigurationComponent, {
      width: '980px',
      disableClose: true,
      data: {

      }
    });
  }

}

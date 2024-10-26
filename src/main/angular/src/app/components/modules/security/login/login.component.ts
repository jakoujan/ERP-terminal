import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ConfirmationDialogService } from 'src/app/components/common/ui/confirmation-dialog/confirmation-dialog.service';
import { Session } from 'src/app/interfaces/session';
import { IUser } from 'src/app/interfaces/user';
import { KeyboardService } from 'src/app/services/keyboard.service';
import { SecurityService } from 'src/app/services/security.service';
import { constants, environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  appName = '';
  constructor(private formBuilder: FormBuilder, private sessionStorage: SessionStorageService,
    private keyboardService: KeyboardService, private securityService: SecurityService,
    private router: Router, private dialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.appName = environment.APP_NAME;
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    if (this.keyboardService.isVisible()) {
      this.keyboardService.change(false);
    }
    var user: IUser = {
      username: this.loginForm.get('user').value,
      password: this.loginForm.get('password').value,
      id: undefined,
      uuid: undefined,
      name: '',
      email: undefined,
      active: undefined,
      canEditPrice: undefined
    }
    this.securityService.login(user).subscribe(response => {
      if (response.code === 0) {
        const session: Session = {
          csrf: undefined,
          token: response.fields.token,
          user: response.fields.user
        }
        this.sessionStorage.store(constants.SESSION, session);
        this.router.navigate(['modules/pos']);
      } else {
        this.dialogService.showConfirmationDialog(response.message, "300px", "Aceptar");
      }
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

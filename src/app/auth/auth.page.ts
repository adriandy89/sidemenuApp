import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AuthService, FakeUserData,  } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit, OnDestroy {
  authObs!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authObs.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  authenticate(email: string, password: string) {
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();

        this.authObs = this.authService.login(email, password).subscribe({
          next: (res: FakeUserData) => {
            console.log(res);
            loadingEl.dismiss();
            this.router.navigateByUrl('/home');
          },
          error: (error) => {
            loadingEl.dismiss();
            let message = error.statusText;
            this.showAlert(message);
          }
        });
      });
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}

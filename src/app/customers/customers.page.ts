import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/home'])
  }

}

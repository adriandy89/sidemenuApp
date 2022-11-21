import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { Customer, CustomerService } from './customer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  customers$: Observable<Customer[]>
  custSubsc!: Subscription;
  long = 0;

  constructor(
    private readonly _customerService: CustomerService,
    private modalCtrl: ModalController
    ) {
    this._customerService.getCustomers();
    this.customers$ = this._customerService.customers;
  }

  ngOnInit() {
    this.custSubsc = this.customers$.subscribe(data => {
      if (data)
        this.long = data.length;
    })
  }

  ngOnDestroy(): void {
    this.custSubsc.unsubscribe();
  }

  async addCustomer(customer: Customer) {
    await this._customerService.addCustomer(customer);
  }

  async deleteCustomer(id: string) {
    await this._customerService.deleteCustomer(id);
  }

  async modifyCustomer(customer: Customer) {
    await this._customerService.modifyCustomer(customer);
  }

  async openModal(customer?: Customer) {
    if (customer)
      this._customerService.selectedCustomer = customer;
    else this._customerService.selectedCustomer = null;
    const modal = await this.modalCtrl.create({
      component: CustomerModalComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      if (data.id === '')
        this.addCustomer(data)
      else this.modifyCustomer(data)
    } else {
      this._customerService.selectedCustomer = null;
    }
  }

}

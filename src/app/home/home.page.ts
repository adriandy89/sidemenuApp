import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { Customer, CustomerService } from './customer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  customers: Customer[] = []
  message = 'This modal example uses the modalController to present and dismiss modals.';


  constructor(private readonly _customerService: CustomerService, private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.getCustomers()
  }

  getCustomers() {
    this.customers = this._customerService.customers
  }

  addCustomer(customer: Customer) {
    this._customerService.addCustomer(customer);
  }

  deleteCustomer(id: string) {
    this._customerService.deleteCustomer(id);
    this.getCustomers();
  }

  modifyCustomer(customer: Customer) {
    this._customerService.modifyCustomer(customer);
    this.getCustomers();
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
      console.log(data);
      if (data.id === '')
        this.addCustomer(data)
      else this.modifyCustomer(data)
    } else {
      this._customerService.selectedCustomer = null;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Customer, CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomerModalComponent implements OnInit {

  name!: string;
  selectedCustomer: Customer | null = null;


  constructor(private modalCtrl: ModalController, private _customerService: CustomerService ) {}

  ngOnInit(): void {
    this.name = this._customerService.selectedCustomer === null ? 'Create' : 'Modify'
    this.selectedCustomer = this._customerService.selectedCustomer
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(customer: Customer) {
    return this.modalCtrl.dismiss(customer, 'confirm');
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.name;
    const ocupation = form.value.ocupation;

    this.confirm({
      id: this.selectedCustomer === null ? '' : this.selectedCustomer.id,
      name,
      ocupation });
  }

}

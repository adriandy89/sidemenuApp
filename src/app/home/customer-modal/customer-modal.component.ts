import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  customerForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private _customerService: CustomerService
    ) {}

  ngOnInit(): void {
    this.name = this._customerService.selectedCustomer === null ? 'Create' : 'Modify';
    this.selectedCustomer = this._customerService.selectedCustomer;
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      ocupation: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (!this.customerForm.valid)
      return;
    this.confirm({
      id: this.selectedCustomer === null ? '' : this.selectedCustomer.id,
      ...this.customerForm.value
    });
  }

  get f() { return this.customerForm.controls; }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm(customer: Customer) {
    return this.modalCtrl.dismiss(customer, 'confirm');
  }

}

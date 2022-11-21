import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, tap } from 'rxjs';
import { StorageService } from '../core/services/storage.service';

export interface Customer {
  id?: string;
  name: string;
  ocupation: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers$: BehaviorSubject<Customer[]> = new BehaviorSubject(<Customer[]>[]);
  private _selectedCustomer: Customer | null;

  constructor(private _storageService: StorageService) {
    this._selectedCustomer = null;
  }

  getCustomers() {
    this._storageService.getStore('CUSTOMERS_DATA').subscribe({
      next: (data) => { this.customers$.next(data) },
      error: (err) => { console.log(err) }
    });
  }

  get customers(): Observable<Customer[]> {
    return from(this.customers$);
  }

  get selectedCustomer(): Customer | null {
    return this._selectedCustomer;
  }

  set selectedCustomer(value: Customer | null) {
    this._selectedCustomer = value;
  }

  async addCustomer(customer: Customer) {
    customer.id = this.fakeUniqueId();
    const cust = this.customers$.getValue();
    cust.push(customer);
    await this.saveCustomerData(cust);
  }

  async deleteCustomer(id: string) {
    const cust = this.customers$.getValue().filter((c: Customer) => c.id !== id);
    await this.saveCustomerData(cust)
  }

  async modifyCustomer(customer: Customer) {
    const cust = this.customers$.getValue().map((c: Customer) => {
      if (c.id === customer.id) {
        c.name = customer.name;
        c.ocupation = customer.ocupation;
      }
      return c;
    });
    await this.saveCustomerData(cust)
  }

  async saveCustomerData(customers: Customer[]) {
    this.customers$.next(customers);
    const resp = await this._storageService.setStore('CUSTOMERS_DATA', customers)
  }

  fakeUniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };
}

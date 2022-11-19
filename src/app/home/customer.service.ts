import { Injectable } from '@angular/core';

export interface Customer {
  id?: string;
  name: string;
  ocupation: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _customers: Customer[] = [];
  private _selectedCustomer: Customer | null;

  constructor() {
    this.fakeRefresh();
    this._selectedCustomer = null;
  }

  get customers(): Customer[] {
    return this._customers;
  }

  get selectedCustomer(): Customer | null {
    return this._selectedCustomer;
  }

  set selectedCustomer(value: Customer | null) {
    this._selectedCustomer = value;
  }

  addCustomer(customer: Customer) {
    customer.id= this.fakeUniqueId(),
    this.customers.push(customer)
    this.saveCustomerData()
  }

  deleteCustomer(id: string) {
    this._customers = this._customers.filter( (c: Customer) => c.id !== id )
    this.saveCustomerData()
  }

  modifyCustomer(customer: Customer) {
    this._customers = this._customers.map( (c: Customer) => {
      if (c.id === customer.id) {
        c.name = customer.name;
        c.ocupation = customer.ocupation;
      }
      return c;
    })
    this.saveCustomerData()
  }

  fakeUniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

  fakeRefresh(){
    const customersData = localStorage.getItem('CUSTOMERS_DATA')!==null ? JSON.parse(localStorage.getItem('CUSTOMERS_DATA')!) : [];
    this._customers = customersData
    console.log(this._customers);
  }

  saveCustomerData() {
    localStorage.setItem('CUSTOMERS_DATA', JSON.stringify(this.customers));
    console.log(this.customers);
  }
}

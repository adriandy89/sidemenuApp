import { Injectable } from '@angular/core';
import { Drivers } from '@ionic/storage';

import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, filter, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storeReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.create();
    this.storeReady.next(true);
  }

  getStore(key: string): Observable<any> {
    return this.storeReady.pipe(
      filter(ready => ready),
      switchMap(_ => {
        return from(this.storage.get(key)) || of([]);
      })
    )
  }

  async setStore(key: string, value: any): Promise<any> {
    return await this.storage.set(key, value);
  }

  async removeStore(key: string): Promise<any> {
    return await this.storage.remove(key);
  }

  async getAllKeys(): Promise<string[] | undefined> {
    return await this.storage.keys()
  }

  async storeLength(): Promise<number | undefined> {
    return await this.storage.length()
  }

  async clearStore(): Promise<void> {
    return await this.storage.clear();
  }
}

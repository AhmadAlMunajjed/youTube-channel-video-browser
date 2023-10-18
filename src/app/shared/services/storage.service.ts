import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Set a value in storage
  set(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  // Get a value from storage
  get(key: string): any {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  }
}

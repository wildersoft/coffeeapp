import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';
import { Coffee } from './logic/Coffee'
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class DataService {
  constructor(private http : HttpClient) { }
  public endpoint = environment.urlRestDB;

  getList(callback) {
    this.http.get(`${this.endpoint}/coffees`)
      .subscribe(response => {
        console.log(response);
        callback(response);
      });
  }

  get(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe(response => {
        callback(response);
      });
  }

  save(coffee, callback) {
    if (coffee._id) {
      //update
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee)
        .subscribe(response => {
          console.log(response);
          callback(true);
        });
    }
    else {
      //insert
      this.http.post(`${this.endpoint}/coffees`, coffee)
      .subscribe(response => {
        console.log(response);
        callback(true);
      });
    }
    callback(true);
  }
}
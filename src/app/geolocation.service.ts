import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  requestLocation(callback) {
    //w3c geolcation API
    navigator.geolocation.getCurrentPosition(
      position => {
        callback(position.coords);
      },
      error  => {
        callback(null);
      }
    )
  }

  getMapLink(location : PlaceLocation) {
    //Universal Link
    //<a href ="https://maps.google.com/?q=Eiffel+ Tower">
    //<a href ="https://maps.apple.com/?q=34.44,56.44">
    let query ="";
    if (location.latitude) {
      query = location.latitude + "," + location.longitude;
    }
    else {
      query = `${location.address}, ${location.city}`;
    }

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    }
    else{
      return `https://maps.google.com/?q=${query}`;
    } 
  }
}
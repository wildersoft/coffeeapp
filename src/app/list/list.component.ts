import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/Coffee';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  coffees : [Coffee];

  constructor(private data: DataService,
    private router : Router,
    private geolocation: GeolocationService) { }

  goDetails(coffee : Coffee) {
    this.router.navigate(["/coffee", coffee._id]);
  }

  share(coffee : Coffee) {
    const sharedText = ` I had this coffee at ${coffee.place} and for me it's a ${coffee.rating}`;
    let newNavigator : any;
    newNavigator = window.navigator;

    if (newNavigator && newNavigator.share) {
      newNavigator.share({
        title : coffee.name,
        text : this.share,
        url : window.location.href
      })
      .then(() =>{
        console.log("shared");
      })
      .catch(() => {
        console.log("error sharing");
      })
    }
    else {
      console.log("couldn't share");
      const shareURL = `whatsapp://send?text=${encodeURIComponent(sharedText)}`;
      location.href = shareURL;
      console.log(shareURL);
    }
  }

  goMap(coffee : Coffee) {
    const mapURL = this.geolocation.getMapLink(coffee.location);
    location.href = mapURL;
  }

  ngOnInit() : void {
    this.data.getList(list => {
      this.coffees = list;
      console.log(list);
    });
  }
}
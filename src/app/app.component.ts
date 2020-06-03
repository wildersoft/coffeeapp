import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SwUpdate, SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coffeeapp';
  readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";

  constructor(private snackBar : MatSnackBar, private updates: SwUpdate, private pushes: SwPush) {

  }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      (document.querySelector("body") as any).style = "";
    }
    else {
      (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
  }
  subscribeToPush() {
    Notification.requestPermission(permision => {
      if (permision == "granted") {
        // this.updates.
        this.pushes.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
          .then(() => {
            console.log("notification accepted");
            //TODO
          });
      }
    })
  }

  ngOnInit() {
    //checking sw updates
    this.updates.available.subscribe(event => {
      if (event.type == "UPDATE_AVAILABLE") {
        const sb = this.snackBar.open("There is an update available", "Install Now", { duration: 4000});
        sb.onAction().subscribe(() => {
          this.updates.activateUpdate().then(() => {
            console.log("The App was updated");
            location.reload();
          });          
        });
      }
      else {
 
      }
    })
    //checking network status
    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);
    if ((navigator as any).standalone == false) {
      this.snackBar.open("You can add this PWA to the Home Screen", "", { duration : 3000 });
    }
    
    //checking instalation status
    if ((navigator as any).standalone == undefined) {
      //It's not IOS
      if (window.matchMedia("(display-mode:broser").matches) {
        //we are in a browser
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackBar.open("Do you want to install this App?", "Install", { duration : 5000 });
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome == "dismissed") {
                //todo
              }
              else {
                //todo
              }
            });
          });
        });
      }
    }

    // let res = "";
    // for(var x in navigator) {
    //   res += x + ":" + navigator[x] + "\r\n";
    // }
    // (navigator as any).vibrate();
    // alert(`nav ${res}`);

    // this.snackBar.open(res, "", { duration: 30000});
  }
}
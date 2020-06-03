import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coffeeapp';

  constructor(private snackBar : MatSnackBar) {

  }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      (document.querySelector("body") as any).style = "";
    }
    else {
      (document.querySelector("body") as any).style = "filter: grayscale(1)";
    }
  }

  ngOnInit() {

    this.updateNetworkStatusUI();
    window.addEventListener("online", this.updateNetworkStatusUI);
    window.addEventListener("offline", this.updateNetworkStatusUI);
    if ((navigator as any).standalone == false) {
      this.snackBar.open("You can add this PWA to the Home Screen", "", { duration : 3000 });
    }
    
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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  restauData: any;
  chargement_en_cours: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.chargementApi();
  }

  chargementApi() {
    this.chargement_en_cours = true;
    let options: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url: string = "http://seen-test.gcauris.com/restau/list";

    this.http.get(url, options).subscribe(
      (response: any) => {
        this.chargement_en_cours = false;
        console.log("API DATA", response);
        this.restauData = response;
      },
      (error: any) => {
        this.chargement_en_cours = false;
        console.error("API EEROR",error)
      });
  }


  navigation(url: string,data?: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        selected: data
      }
    }
    this.router.navigate([url], navigationExtras);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  item: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.item = this.router.getCurrentNavigation().extras.state.selected;
        }
      });
    }

  ngOnInit() {
  }

  navigation(data: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        selected: data
      }
    }
    this.router.navigate(['/commande'], navigationExtras);
  }
}

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  list_commandes: any;

  constructor(
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();
  }

  ionViewWillEnter() {
    this.getCommandesList();
  }

 
  async getCommandesList(){
    this.list_commandes = await this.storage.get("list_commandes");
  }
}

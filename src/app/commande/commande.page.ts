import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {
  item: any;
  chargement_en_cours: boolean;
  telephone: string;
  nom: string;
  erreur_nom: boolean;
  erreur_telephone: boolean;
  list_commandes: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController,
    private storage: Storage
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        if(this.router.getCurrentNavigation().extras.state){
          this.item = this.router.getCurrentNavigation().extras.state.selected;
        }
      });
    }
  async ngOnInit() {
    await this.storage.create();
  }

  ionViewWillEnter() {
    this.getCommandesList();
  }

  terminer(){
    if(!this.nom){
      this.erreur_nom = true;
      return;
    }
    if(!this.telephone){
      this.erreur_telephone = true;
      return;
    }
    this.apiPost();
  }

  apiPost(){
    this.chargement_en_cours = true;
    let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });
    let payload: any ={"nom": this.nom, "telephone": this.telephone, "id_plat": this.item.id};
    let url: string = "http://seen-test.gcauris.com/restau/add";
    this.http.post(url,payload,headers).subscribe(
      (response: any) => {
        this.chargement_en_cours = false;
        if(response.status == 201){
          let donnees_commande = {
            "nom": this.nom,
            "telephone": this.telephone,
            "plat": this.item
          };
          this.list_commandes.push(donnees_commande);
          this.saveCommandesList();
          this.alert(response.message);
          this.navigation(this.item);
        } else {
          this.alert(response.message);
        }
      },
      (error: any) => {
        this.chargement_en_cours = false;
      });
  }


  /**
   * Permet d'afficher une alerte
   * @param msg 
   */
   async alert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: msg,
      buttons: ['Compris']
    });

    await alert.present();
  }



  async getCommandesList(){
    await this.storage.get("list_commandes").then((data)=>{
      this.list_commandes = data;
      console.log("GET",data);
      
    });
  }


  async saveCommandesList(){
    await this.storage.set("list_commandes",this.list_commandes);
   }


  navigation(data: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        selected: data
      }
    }
    this.router.navigate(['/home'], navigationExtras);
  }
}

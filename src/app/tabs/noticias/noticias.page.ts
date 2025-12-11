import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
  standalone: false,
})
export class NoticiasPage implements OnInit {

  noticias: any[] = [];
  

  constructor(private navCtrl: NavController
  ) {}

  ngOnInit() {
  }

  goHome() {
  this.navCtrl.navigateBack('/home');
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cafes',
  templateUrl: './cafes.page.html',
  styleUrls: ['./cafes.page.scss'],
  standalone: false,
})
export class CafesPage implements OnInit {
  constructor(
    private navCtrl: NavController       
  ) {}

  goHome() {
    this.navCtrl.navigateBack('/home');
  }

  ngOnInit() {}
}
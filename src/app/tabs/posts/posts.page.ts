import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.css'],
  standalone: false,
})
export class PostsPage implements OnInit {

  posts: any[] = [];
  loading = true;

  constructor(private navCtrl: NavController
  ) {}

  ngOnInit() {}

  goHome() {
  this.navCtrl.navigateBack('/home');
  }

}
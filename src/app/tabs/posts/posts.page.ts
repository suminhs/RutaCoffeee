import { Component, OnInit } from '@angular/core';
import { ApiClientesService } from '../../services/api-clientes.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  standalone: false,
})
export class PostsPage implements OnInit {

  posts: any[] = [];

  constructor(private api: ApiClientesService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.api.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

}
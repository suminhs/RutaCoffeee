import { Component, OnInit } from '@angular/core';
import { ApiClientesService } from '../../services/api-clientes.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.css'],
  standalone: false,
})
export class PostsPage implements OnInit {

  posts: any[] = [];
  loading = true;

  constructor(private api: ApiClientesService) {}

  ngOnInit() {
    this.cargarPosts();
  }

  cargarPosts() {
    this.api.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error cargando posts', err);
        this.loading = false;
      }
    });
  }

}
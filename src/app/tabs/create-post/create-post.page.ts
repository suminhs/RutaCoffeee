import { Component } from '@angular/core';
import { ApiClientesService } from 'src/app/services/api-clientes.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.css'],
  standalone: false,
})
export class CreatePostPage {

  title: string = '';
  body: string = '';

  constructor(private api: ApiClientesService) {}

  enviarPost() {
    const data = {
      title: this.title,
      body: this.body,
      userId: 1
    };

    this.api.createPost(data).subscribe({
      next: (res) => {
        console.log('POST creado:', res);
        alert('Post creado exitosamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear el post');
      }
    });
  }
}

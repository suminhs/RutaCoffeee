import { Component } from '@angular/core';
import { ApiClientesService } from '../../services/api-clientes.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  standalone:false,
})
export class CreatePostPage {

  title = '';
  body = '';

  constructor(private api: ApiClientesService) {}

  crearPost() {
    const data = {
      title: this.title,
      body: this.body,
      userId: 1
    };

    this.api.createPost(data).subscribe(res => {
      console.log('Post creado:', res);
      alert('Post creado correctamente');
    });
  }
}

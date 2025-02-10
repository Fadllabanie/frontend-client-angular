import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/new', component: NewPostComponent },
  { path: 'posts/update/:id', component: UpdatePostComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },

 
  // other routes can be added here
];


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FooterComponent } from './footer/footer.component';
import { PostListComponent } from './post-list/post-list.component';
import { ProfilComponent } from './profil/profil.component';
import { PostFormComponent } from './post-list/post-form/post-form.component';
import { SinglePostComponent } from './post-list/single-post/single-post.component';
import { ImgListComponent } from './img-list/img-list.component';
import { ImgFormComponent } from './img-list//img-form/img-form.component';
import { SingleImgComponent } from './img-list/single-img/single-img.component';
import { ProfilService } from './services/profil.service';
import { PostsService } from './services/posts.service';
import { ImagesService } from './services/images.service';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},

  {path: 'dashboard/messages', canActivate: [AuthGuardService], component: PostListComponent},
  {path: 'dashboard/messages/add', canActivate:[AuthGuardService], component: PostFormComponent},
  {path: 'dashboard/messages/:id', canActivate:[AuthGuardService], component: SinglePostComponent},

  {path: 'dashboard/images', canActivate: [AuthGuardService], component: ImgListComponent},
  {path: 'dashboard/images/add', canActivate:[AuthGuardService], component: ImgFormComponent},
  {path: 'dashboard/images/:id', canActivate:[AuthGuardService], component:SingleImgComponent},

  {path: 'user/:id', canActivate:[AuthGuardService], component: ProfilComponent},

  {path: '', redirectTo: 'dashboard/messages', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard/messages'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    FooterComponent,
    PostListComponent,
    ProfilComponent,
    PostFormComponent,
    SinglePostComponent,
    ImgListComponent,
    ImgFormComponent,
    SingleImgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService, AuthGuardService, ProfilService, PostsService, ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule,  HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { ProfilFormComponent } from './profil/profil-form/profil-form.component';
import { PasswordFormComponent } from './profil/profil-form/password-form.component';
import { AuthInterceptor } from './interceptors/auth-interceptors';
import { CommentComponent } from './comment/comment.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},

  {path: 'dashboard/messages', canActivate: [AuthGuardService], component: PostListComponent},
  {path: 'dashboard/messages/add', canActivate:[AuthGuardService], component: PostFormComponent},
  {path: 'dashboard/message/:id', canActivate:[AuthGuardService], component: SinglePostComponent},
  {path: 'dashboard/edit-message/:id', canActivate: [AuthGuardService], component: PostFormComponent},

  {path: 'dashboard/images', canActivate: [AuthGuardService], component: ImgListComponent},
  {path: 'dashboard/images/add', canActivate:[AuthGuardService], component: ImgFormComponent},
  {path: 'dashboard/image/:id', canActivate:[AuthGuardService], component:SingleImgComponent},

  {path: 'dashboard/message/:id/comments/add', canActivate: [AuthGuardService], component: CommentComponent},

  {path: 'user/:id', canActivate:[AuthGuardService], component: ProfilComponent},
  {path: 'modify/user/:id', canActivate: [AuthGuardService], component: ProfilFormComponent},
  {path: 'modify/password/:id', canActivate: [AuthGuardService], component: PasswordFormComponent},

  {path: '', redirectTo: 'auth/signin', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth/signin'},
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
    SingleImgComponent,
    ProfilFormComponent,
    CommentComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [AuthService, AuthGuardService, ProfilService, PostsService, ImagesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

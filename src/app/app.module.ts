import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { ArticleComponent } from './components/article/article.component';
import { EditingArticleComponent } from './components/editing-article/editing-article.component';

import { QuillModule } from 'ngx-quill';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { GroupOptionsComponent } from './components/group-options/group-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { GroupComponent } from './components/group/group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { LinkOptionsComponent } from './components/link-options/link-options.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArticleComponent,
    EditingArticleComponent,
    GroupOptionsComponent,
    UserComponent,
    GroupComponent,
    LoginModalComponent,
    LinkOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

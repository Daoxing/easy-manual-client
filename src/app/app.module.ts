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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArticleComponent,
    EditingArticleComponent,
    GroupOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

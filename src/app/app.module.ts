import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { ArticleComponent } from './components/article/article.component';
import { EditingArticleComponent } from './components/editing-article/editing-article.component';

import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ArticleComponent,
    EditingArticleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, QuillModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

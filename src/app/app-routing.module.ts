import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { EditingArticleComponent } from './components/editing-article/editing-article.component';
const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/home',
  },

  { path: 'home', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'article/edit', component: EditingArticleComponent },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule {}

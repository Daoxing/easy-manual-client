import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { EditingArticleComponent } from './components/editing-article/editing-article.component';
import { UserComponent } from './components/user/user.component';
import { GroupComponent } from './components/group/group.component';
const routes: Routes = [
  {
    path: 'home',
    redirectTo: '/home',
  },

  { path: 'home', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'article/edit', component: EditingArticleComponent },
  { path: 'user', component: UserComponent },
  { path: 'group', component: GroupComponent },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { EditingArticleComponent } from './components/editing-article/editing-article.component';
import { UserComponent } from './components/user/user.component';
import { GroupComponent } from './components/group/group.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ROUTER } from './constant';
import { UpdateUserComponent } from './components/update-user/update-user.component';
const routes: Routes = [
  { path: ROUTER.HOME_URL, component: HomeComponent },
  { path: ROUTER.ARTICLE, component: ArticleComponent },
  { path: ROUTER.EDIT_CREATE_URL, component: EditingArticleComponent },
  { path: ROUTER.CREATE_ARTICLE_URL, component: EditingArticleComponent },
  { path: ROUTER.USER_URL, component: UserComponent },
  { path: ROUTER.USER_EDIT_URL, component: UpdateUserComponent },
  { path: ROUTER.GROUP_URL, component: GroupComponent },
  { path: ROUTER.PAGE_NOT_FOUND_URL, component: PageNotFoundComponent },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
})
export class AppRoutingModule {}

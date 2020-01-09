import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookCreateComponent } from './components/book-create/book-create.component';


const routes: Routes = [
  {path: 'books', component: BookComponent, data: {title: 'Book List'}},
  {path: 'book-details/:id', component: BookDetailComponent, data: {title: 'Book Details'}},
  {path: 'book-create', component: BookCreateComponent, data: {title: 'Create Book'}},
  {path: 'book-edit/:id', component: BookEditComponent, data: {title: 'EditBook'}},
  { path: '', redirectTo: '/books', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

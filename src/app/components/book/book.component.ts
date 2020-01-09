import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { BookDataSource } from 'src/app/service/BookDataSource';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[];
  displayedColumns = ['title', 'author', 'isbn'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.api.getBooks().subscribe(res => {
      console.log(res);
      this.books = res;
    }, err => {
      console.log(err);
    })
  }
}

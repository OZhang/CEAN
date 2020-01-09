import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.getBooks(id);
  }

  getBooks(id: string) {
    this.api.getBook(id).subscribe((res: Book) => {
      console.log(JSON.stringify(res));
      this.book = res;
      console.log("BookDetailComponent.book", this.book);
    }, err => {
      console.log(err);
    })
  }

  deleteBook(id: string, rev: string) {
    this.api.deleteBook(id, rev).subscribe(res => {
      this.router.navigate(['/books']);
    }, (err) => {
      console.log(err);
    })
  }
}

import { ApiService } from './api.service';
import { DataSource } from '@angular/cdk/collections';
import { Book } from '../../../models/Book.js';

export class BookDataSource extends DataSource<Book> {
    constructor(private api: ApiService){
        super();
    }

    connect() {
        return this.api.getBooks();
    }

    disconnect(){
        
    }
}
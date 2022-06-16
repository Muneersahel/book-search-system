import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookshopsService } from '../services/bookshops.service';

@Pipe({
    name: 'bookshopLocation',
})
export class BookshopLocationPipe implements PipeTransform {
    constructor(private bookshopS: BookshopsService) {}

    transform(value: number, ...args: unknown[]): Observable<string> {
        return this.bookshopS.getBookshop(value).pipe(
            map((bookshop) => {
                return bookshop.location;
            })
        );
    }
}

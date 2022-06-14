import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Pipe({
    name: 'category',
})
export class CategoryPipe implements PipeTransform {
    constructor(private categoriesS: CategoriesService) {}

    transform(value: number, ...args: unknown[]): Observable<string> {
        return this.categoriesS.getCategory(value).pipe(
            map((category) => {
                return category.name;
            })
        );
    }
}

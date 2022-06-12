import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    categories: Category[] = [];
    private categoriesSubject = new Subject<Category[]>();
    categoriesObservable = this.categoriesSubject.asObservable();

    constructor(private http: HttpClient, private authS: AuthService) {}

    getCategories() {
        return this.http
            .get<{ message: string; data: Category[] }>(
                `${environment.apiUrl}/categories`
            )
            .pipe(
                tap((res) => {
                    this.categories = res.data;
                    this.categoriesSubject.next([...this.categories]);
                })
            );
    }

    createCategory(categoryName: string) {
        return this.http
            .post<{ message: string; data: Category }>(
                `${environment.apiUrl}/categories`,
                { name: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${this.authS.getToken()}`,
                    },
                }
            )
            .pipe(
                tap((res) => {
                    this.categories.push(res.data);
                    this.categoriesSubject.next([...this.categories]);
                })
            );
    }

    getCategory(categoryId: number) {
        return this.http
            .get<{ message: string; data: Category[] }>(
                `${environment.apiUrl}/categories/${categoryId}`
            )
            .pipe(
                map((res) => {
                    return res.data[0];
                })
            );
    }

    updateCategory(categoryId: number, categoryName: string) {
        return this.http
            .put<{ message: string; data: Category }>(
                `${environment.apiUrl}/categories/${categoryId}`,
                { name: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${this.authS.getToken()}`,
                    },
                }
            )
            .pipe(
                tap((res) => {
                    const updatedCategory = res.data;
                    const updatedCategories = [...this.categories];
                    const oldCategoryIndex = updatedCategories.findIndex(
                        (c) => c.id === updatedCategory.id
                    );
                    updatedCategories[oldCategoryIndex] = updatedCategory;
                    this.categories = updatedCategories;
                    this.categoriesSubject.next([...this.categories]);
                })
            );
    }

    deleteCategory(categoryId: number) {
        return this.http
            .delete<{ message: string; data: Category }>(
                `${environment.apiUrl}/categories/${categoryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.authS.getToken()}`,
                    },
                }
            )
            .pipe(
                tap((res) => {
                    if (res.message === 'Book category deleted') {
                        const updatedCategories = this.categories.filter(
                            (c) => c.id !== categoryId
                        );
                        this.categories = updatedCategories;
                        this.categoriesSubject.next([...this.categories]);
                    }
                })
            );
    }
}

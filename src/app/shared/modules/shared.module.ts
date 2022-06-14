import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookshopPipe } from '../pipes/bookshop.pipe';
import { CategoryPipe } from '../pipes/category.pipe';

@NgModule({
    declarations: [BookshopPipe, CategoryPipe],
    exports: [BookshopPipe, CategoryPipe],
})
export class SharedModule {}

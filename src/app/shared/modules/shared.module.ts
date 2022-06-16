import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookshopPipe } from '../pipes/bookshop.pipe';
import { CategoryPipe } from '../pipes/category.pipe';
import { BookshopLocationPipe } from '../pipes/bookshop-location.pipe';
import { BookshopPhonePipe } from '../pipes/bookshop-phone.pipe';

@NgModule({
    declarations: [
        BookshopPipe,
        CategoryPipe,
        BookshopLocationPipe,
        BookshopPhonePipe,
    ],
    exports: [
        BookshopPipe,
        CategoryPipe,
        BookshopLocationPipe,
        BookshopPhonePipe,
    ],
})
export class SharedModule {}

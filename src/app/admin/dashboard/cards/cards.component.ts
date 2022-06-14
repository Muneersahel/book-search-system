import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
    @Input() bookLength: number = 0;
    @Input() bookshopLength: number = 0;
    @Input() categoriesLength: number = 0;
    @Input() usersLength: number = 0;

    constructor() {}

    ngOnInit(): void {}
}

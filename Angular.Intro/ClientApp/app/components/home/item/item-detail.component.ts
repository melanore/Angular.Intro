import { Component, Input } from '@angular/core';
import { IItem } from './item.contract';

@Component({
    selector: 'item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})

export class ItemDetailComponent {
    @Input('item') item: IItem;
}
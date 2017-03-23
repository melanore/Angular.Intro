import { Component, Input, OnInit } from '@angular/core';
import { IItem } from './item.contract';
import { ItemService } from './item.service';

@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
    @Input() class: string;
    title: string;
    selectedItem: IItem;
    items: IItem[];

    constructor(private itemService: ItemService) { }

    ngOnInit() {
        console.log(`ItemListComponent instansiated with the following type: ${this.class}.`);
        var s = null;
        switch (this.class) {
            case 'latest':
            default:
                this.title = 'Latest Items';
                s = this.itemService.getLatest();
                break;
            case 'most-viewed':
                this.title = 'Most Viewed Items';
                s = this.itemService.getMostViewed();
                break;
            case 'random':
                this.title = 'Random Items';
                s = this.itemService.getRandom();
                break;
        }

        s.subscribe(
            items => this.items = items,
            error => console.log(error));
    }

    onSelect(item: IItem) {
        this.selectedItem = item;
        console.log(`item with id ${this.selectedItem.id} has been selected.`);
    }
}

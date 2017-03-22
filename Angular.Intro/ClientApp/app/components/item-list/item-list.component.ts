import { Component, OnInit } from '@angular/core';
import { IItem } from './item/item.contract';
import { ItemService } from './item/item.service';

@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
    selectedItem: IItem;
    items: IItem[];

    constructor(private itemService: ItemService) { }

    ngOnInit() { this.getLatest(); }

    getLatest() {
        this.itemService.getLatest()
            .subscribe(
                latestItems => this.items = latestItems,
                error => console.error(error));
    }

    onSelect(item: IItem) {
        this.selectedItem = item;
        console.log(`item with id ${this.selectedItem.id} has been selected.`);
    }
}

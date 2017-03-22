import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IItem } from './item.contract';

@Injectable()
export class ItemService {
    constructor(private http: Http) { }

    private baseUrl = "api/items/";

    get(id: number) {
        if (id == null) { throw new Error("id is required."); }
        return this.getItemsImpl(id.toString());
    }

    getLatest(num?: number) {
        return this.getItemsImpl("getLatest", num);
    }

    getMostViewed(num?: number) {
        return this.getItemsImpl("getMostViewed", num);
    }

    getRandom(num?: number) {
        return this.getItemsImpl("getRandom", num);
    }

    private getItemsImpl(endpoint: string, num?: number) {
        let url = `${this.baseUrl}${endpoint}`;
        if (num != null) { url += `?take=${num}` }

        return this.http.get(url).map(response => response.json());
    }
}
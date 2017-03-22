import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Item } from "./item";

@Injectable()
export class ItemService {
    constructor(private http: Http) { }

    private baseUrl = "api/items/";

    get(id: number) {
        if (id == null) { throw new Error("id is required."); }
        const url = `${this.baseUrl}${id}`;
        return this.http.get(url)
            .map(res => res.json() as Item)
            .catch(this.handleError);
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

        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
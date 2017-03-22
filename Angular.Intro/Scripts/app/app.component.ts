import { Component } from "@angular/core";

@Component({
    selector: "ngintro",
    template: `
        <h1>{{title}}</h1>
        <item-list></item-list>
    `
})
export class AppComponent {
    title = "Angular intro."
}
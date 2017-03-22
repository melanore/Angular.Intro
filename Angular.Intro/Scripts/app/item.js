System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Item;
    return {
        setters: [],
        execute: function () {
            Item = (function () {
                function Item(id, title, description) {
                    this.id = id;
                    this.title = title;
                    this.description = description;
                }
                return Item;
            }());
            exports_1("Item", Item);
        }
    };
});

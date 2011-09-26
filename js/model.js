var TYPES = [ "cover", "list", "grid", "hover" ];

var Fields = {
    "get": function() {
        return localStorage.fields.split(",");
    },
    "set": function(fields) {
        localStorage.fields = fields;
    },
    "load_defaults": function() {
        localStorage.removeItem("fields");
        localStorage.fields = [
            "IMDb Rating",
            "Director",
            "Actors",
            "Plot",
            "Title",
            "Writer",
            "Poster",
            "Runtime",
            "Rating",
            "Votes",
            "Genre",
            "Released",
            "Year",
            "Rated",
            "ID"
        ];
    }
}

var Views = {
    "set": function(view, fields) {
        views = JSON.parse(localStorage.views);

        if (typeof(views[view]) == "undefined") {
            views[view] = new Object();
        }

        views[view] = fields;

        localStorage.views = JSON.stringify(views);
        return fields;
    },
    "get": function(view) {
        views = JSON.parse(localStorage.views);
        if (views === null) {
            return null;
        }
        return views[view];
    },
    "is_checked": function(view, field) {
        fields = Views.get(view);
        return $.inArray(field, fields) >= 0;
    },
    "load_defaults": function() {
        localStorage.removeItem("views");
        views = new Object();
        views.cover = [ "IMDb Rating", "Director", "Actors", "Plot" ];
        views.list  = [ "IMDb Rating", "Director", "Actors", "Plot" ];
        views.grid  = [ "IMDb Rating", "Director", "Actors", "Plot" ];
        views.hover = [ "IMDb Rating", "Director", "Actors" ];
        localStorage.views = JSON.stringify(views);
    }
}

function load_defaults() {
    Views.load_defaults();
    Fields.load_defaults();
}

function bootstrap() {
    if (typeof(localStorage.views) == "undefined"
            || typeof(localStorage.fields) == "undefined") {
        load_defaults();
    }
}

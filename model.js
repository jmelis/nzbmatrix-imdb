var TYPES = [ "cover", "list", "grid", "hover" ];
var OPTIONS = [
    "Title",
    "Director",
    "Writer",
    "Actors",
    "Plot",
    "Poster",
    "Runtime",
    "Rating",
    "Votes",
    "IMDb Rating",
    "Genre",
    "Released",
    "Year",
    "Rated",
    "ID"
];

function set_options(view, options) {
    views = JSON.parse(localStorage.views);

    if (typeof(views[view]) == "undefined") {
        views[view] = new Object();
    }

    views[view] = options;

    localStorage.views = JSON.stringify(views);
    return options;
}

function get_options(view) {
    views = JSON.parse(localStorage.views);
    if (views === null) {
        return null;
    }
    return views[view];
}

function is_checked(view, option) {
    options = get_options(view);
    return $.inArray(option, options) >= 0;
}

function load_defaults() {
    localStorage.removeItem("views");
    views = new Object();
    views.cover = [ "IMDb Rating", "Director", "Actors", "Plot" ];
    views.list  = [ "IMDb Rating", "Director", "Actors", "Plot" ];
    views.grid  = [ "IMDb Rating", "Director", "Actors", "Plot" ];
    views.hover = [ "IMDb Rating", "Director", "Actors", "Plot" ];
    localStorage.views = JSON.stringify(views);
}

function options_bootstrap() {
    if (typeof(localStorage.views) == "undefined") {
        load_defaults();
    }
}

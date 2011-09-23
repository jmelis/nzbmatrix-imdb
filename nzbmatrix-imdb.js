function rating(json) {
    var full_rating;
    var rating = json["Rating"];

    if (rating.match("N/A")) {
        full_rating = "Not available.";
    } else {
        voters = json["Votes"];
        full_rating = rating + "/10" + ' (' + voters + ' votes)';
    }
    return full_rating;
}

function infoline(title, info, start_str, end_str) {
    var info;

    if (start_str == null) {
        start_str = "<br>";
    }
    if (end_str == null) {
        end_str = "";
    }
    info = start_str + '<b>' + title + ':</b>&nbsp;' + info + end_str;
    return info;
}

/* Cover View */
function update_coverview(element, json) {
    var text = element.html();

    var sep = "<br><br>";
    var first_part;
    var second_part;

    // css & html style
    element.removeAttr("nowrap");
    element.css("padding-left", "8px");

    // IMDb info
    imdb_info  = infoline("IMDb Rating", rating(json));
    imdb_info += infoline("Director", json["Director"]);
    imdb_info += infoline("Actors", json["Actors"]);
    imdb_info += infoline("Plot", json["Plot"]);
    imdb_info += sep;

    first_part  = text.substring(0, text.indexOf(sep));
    second_part = text.substring(text.indexOf(sep) + sep.length, text.length);

    first_part = first_part.replace(/&nbsp;/g, "");

    text = first_part + imdb_info + second_part;

    element.html(text);
}

/* Grid view */
function update_gridview(element, json) {
    var rating_line;
    var movie_img;
    var desc;
    var imdb_info;

    imdb_info  = infoline("IMDb Rating", rating(json));
    imdb_info += infoline("Director", json["Director"]);
    imdb_info += infoline("Actors", json["Actors"]);

    movie_img = $("a:first img", element); // this is the child 'img'
    desc = movie_img.attr("onmouseover");
    desc = desc.replace(/'(.*?)'/, "'$1 " + imdb_info + "'");
    movie_img.attr("onmouseover", desc);
}

/* List view */
function update_listview(element, json) {
    var imdb_info;
    var div = $("div[id^='descr']",element.parent());

    div.parent().removeAttr("nowrap");

    // IMDb info
    imdb_info  = infoline("IMDb Rating", rating(json), "&nbsp;", "<br>");
    imdb_info += infoline("Director", json["Director"], "&nbsp;", "<br>");
    imdb_info += infoline("Actors", json["Actors"], "&nbsp;", "<br>");
    imdb_info += infoline("Plot", json["Plot"], "&nbsp;", "<br>");

    div.html(div.html() + imdb_info);
}

function update_link(link, json) {
    var link_rating = 'IMBd Rating: ' + rating(json);

    $("img", link).attr('title', link_rating);
    $("img", link).attr('alt', link_rating);
    link.attr('title', link_rating);
    link.attr('alt', link_rating);
}

function process_link(url, link)
{
    var movie_id = url.match("tt[0-9]+");
    var imdbapi_url = "http://www.imdbapi.com/?i=" + movie_id;

    $.getJSON(imdbapi_url, function(json) {
        // Update link
        update_link(link, json);

        // Update parent element depending on the current view
        parent = link.parent();

        if (parent.is("td") && parent.attr('class') == 'nzbtable_data') {
            update_coverview(parent, json);
        } else if (parent.is("td") && parent.attr('class') == 'info nzbtable_data') {
            update_listview(parent, json);
        } else if (parent.is("td") && parent.attr('class') == 'newoff') {
            update_gridview(parent, json);
        }
    });
}

links = $("a[href^='redirect.php']");

$.each(links, function(i, link) {
    link = $(link);
    url = link.attr('href');
    url = url.match('http://(www\.)?imdb\.com/.*$');
    if (url && url[0]) {
        imdb_url = url[0];
        process_link(imdb_url, link);
    }
});

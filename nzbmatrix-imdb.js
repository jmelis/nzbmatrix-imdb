var views; //localStorage -- Global

function get_options(view) {
    return views[view];
}

function integer_comma(num) {
    //http://www.mredkj.com/javascript/nfbasic.html
    num_str = num + '';
    comma_regex = /(\d+)(\d{3})/;
    while (comma_regex.test(num_str)) {
        num_str = num_str.replace(comma_regex, '$1' + ',' + '$2');

    }
    return num_str;
}

function rating(json) {
    var full_rating;
    var rating = json["Rating"];

    if (rating.match("N/A")) {
        full_rating = "Not available.";
    } else {
        voters = integer_comma(json["Votes"]);
        full_rating = rating + "/10" + ' (' + voters + ' votes)';
    }
    return full_rating;
}

function decorate(view, option, info) {
    var str;

    switch(view)
    {
    case "cover":
    case "grid":
      str = '<br><b>' + option + ':</b>&nbsp;' + info;
      break;
    case "list":
      str = '&nbsp;<b>' + option + ':</b>&nbsp;' + info + '<br>';
      break;
    case "hover":
      str =  option + ': ' + info + "\n";
    }
    return str;
}

function info_view(view, json, start_str, end_str) {
    var info = '';
    var opt_info;
    var options;

    if (start_str == null) {
        start_str = "<br>";
    }
    if (end_str == null) {
        end_str = "";
    }
    options = get_options(view);

    for (option in  options) {
        option = options[option];
        if (option == "IMDb Rating") {
            opt_info = rating(json);
        } else {
            opt_info = json[option];
        }

        info += decorate(view, option, opt_info);
    }

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
    imdb_info = info_view("cover", json) + sep;

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

    imdb_info = info_view("grid", json);
    imdb_info = imdb_info.replace(/'/g,"&#39;")


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
    imdb_info = info_view("list", json, "&nbsp;", "<br>");

    div.html(div.html() + imdb_info);
}

function update_link(link, json) {
    var imdb_info = info_view("hover", json, "", "\n");

    $("img", link).attr('title', imdb_info);
    $("img", link).attr('alt', imdb_info);
    link.attr('title', imdb_info);
    link.attr('alt', imdb_info);
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

chrome.extension.sendRequest({localstorage: "views"}, function(response) {
    views = JSON.parse(response.value); //get it from localStorage
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
});

function update_link(url, link)
{
    movie_id = url.match("tt[0-9]+");
    imdbapi_url = "http://www.imdbapi.com/?i=" + movie_id;

    $.getJSON(imdbapi_url, function(json){
        rating = json["Rating"];

        if (rating.match("N/A")){
            full_rating = "Not available.";
        } else {
            voters = json["Votes"];
            full_rating = rating + "/10" + ' (' + voters + ' votes)';
        }

        // Update link
        link_rating = 'IMBd Rating: ' + full_rating;
        $("img",link).attr('title', link_rating);
        $("img",link).attr('alt', link_rating);
        link.attr('title', link_rating);
        link.attr('alt', link_rating);

        parent_link = link.parent();
        if (parent_link.is("td") && parent_link.attr('class') == 'nzbtable_data')
        {
        // cover view
            rating_line =   '<br><b>&nbsp;IMDb Rating:</b> '
                            + full_rating + '<br><br>';
            parent_link.html(parent_link.html().replace('<br><br>',rating_line));
        }
        else if(parent_link.is("td") && parent_link.attr('class') == 'newoff')
        {
            // grid view
            rating_line = '<br><b>IMDb Rating:</b> '
                            + full_rating;
            movie_img = $("a:first img",parent_link);
            desc = movie_img.attr("onmouseover");
            desc = desc.replace(/'(.*?)'/,"'$1 " + rating_line + "'");
            movie_img.attr("onmouseover", desc);
            
        }
    });
}

links = $("a[href^='redirect.php']");

$.each(links,function(i,link){
    link = $(link);
    url = link.attr('href');
    url = url.match('http://(www\.)?imdb\.com/.*$');
    if (url && url[0]) {
        imdb_url = url[0];
        update_link(imdb_url, link);
    }
});

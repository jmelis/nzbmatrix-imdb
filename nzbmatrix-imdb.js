function update_link(url, link)
{
    $.get(url, function(data){
        starbar = $("div[class='starbar-meta']",data);

        if ($("b",starbar).size() > 0) {
            rating = $("b",starbar).text();
            voters = $("a",starbar).text();
            full_rating = rating + ' (' + voters + ')';
        } else {
            // awaiting votes
            full_rating = $("small",starbar).text();
        }

        // Update link
        link_rating = 'IMBd Rating: ' + full_rating;
        $("img",link).attr('title', link_rating);
        $("img",link).attr('alt', link_rating);
        link.attr('title', link_rating);
        link.attr('alt', link_rating);

        // Update cover view
        parent_link = link.parent();
        if (parent_link.is("td") && parent_link.attr('class') == 'nzbtable_data') {
            rating_line =   '<br><b>&nbsp;IMDb Rating:</b> '
                            + full_rating + '<br><br>';
            parent_link.html(parent_link.html().replace('<br><br>',rating_line));
        }
    });
}

links = $("a[href^='redirect.php']");

$.each(links,function(i,link){
    link = $(link);
    url = link.attr('href');
    url = url.match('http://www.imdb.com/.*$');
    if (url && url[0]) {
        imdb_url = url[0];
        update_link(imdb_url, link);
    }
});

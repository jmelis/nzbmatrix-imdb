function update_element(url, elem)
{
    $.get(url, function(data){
        starbar = $("div[class='starbar-meta']",data);
        rating =    '<br><b>&nbsp;IMDb Rating:</b> ' + 
                    $("b",starbar).text() + 
                    ' (' + $("a",starbar).text() + ')<br><br>';

        elem.html(elem.html().replace('<br><br>',rating));

    });

}

elements = $("tr.NewOff td.nzbtable_data a[href^='redirect.php']")

$.each(elements,function(i,element){
    elem = $(element).parent();
    url = $(element).attr('href');
    url = url.match(/http.*$/)
    if (url && url[0]) {
        url = url[0];    
        if (url.match(/imdb/)) {
            update_element(url, elem);
        }
    }
});

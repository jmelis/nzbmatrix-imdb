NZBMatrixIMDb
=============
Small Chrome extension that adds IMDb information to
[NZBMatrix](http://nzbmatrix.com/) interface.

Resources
---------
Report issues here:
[https://github.com/jmelis/nzbmatrix-imdb/issues](https://github.com/jmelis/nzbmatrix-imdb/issues)

Details
-------
It will add to the 'alt' element of all IMDb links the IMDBb rating. If the
cover view is selected, it will the following information to every element
that has an IMDb link:

* Rating
* Director
* Actors
* Plot

If the grid view is selected, it will add to the mouseover banner:

* Rating
* Director
* Actors

To retrieve IMDb information, this extension uses [The IMDb API v2.0 by
Brian Fritz](http://www.imdbapi.com/).

Installation
------------
* Clone the repository and then install as an 'unpacked extension' inside Chrome.

Changelog
---------
### 0.1.0 ###
* First release.

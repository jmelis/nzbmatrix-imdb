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
This extension modifies the NZBMatrix interface to include IMDb information.
It modifies all the IMDb links to include the IMDb reating. It also enhances
the Cover View by adding the following information to every element that has
an IMDb link:

* Rating
* Director
* Actors
* Plot

If the Grid View is selected, the mouseover banner will display:

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

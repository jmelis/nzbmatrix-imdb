NZBMatrixIMDb
=============
Small Chrome extension that adds IMDb information to
[NZBMatrix](http://nzbmatrix.com/) interface.

Resources
---------
This extension is being discussed in this
[thread](http://nzbmatrix.com/forums.php?action=viewtopic&topicid=40368)
(registration required).

Alternatively, you can report issues here:
[https://github.com/jmelis/nzbmatrix-imdb/issues](https://github.com/jmelis/nzbmatrix-imdb/issues).

Details
-------

This extension modifies the NZBMatrix interface to include IMDb information. It
features an options page to enable and disable IMDb fields depending on the
selected view. It's also possible to reorder the fields by dragging and
dropping the rows.

This extension acts on:

- Every link with an IMDb url
- Cover View 
- List View
- Grid View

To retrieve IMDb information, this extension uses [The IMDb API v2.0 by
Brian Fritz](http://www.imdbapi.com/).

Tags: nzb, nzbmatrix, imdb

Installation
------------
- Install from chrome web store: [NZBMatrixIMDb](https://chrome.google.com/webstore/detail/glmnoifppodlklanapmeinffccljodbp).
- Or clone the repository and then install as an 'unpacked extension' inside Chrome.

Changelog
---------
### 0.3.0 ###
- Add an options page for enabling & disabling IMDb fields and sorting them.
- Thousands separator for rating.

### 0.2.0 ###
- Allow https://nzbmatrix.com
- Enhance List View

### 0.1.0 ###
- First release.

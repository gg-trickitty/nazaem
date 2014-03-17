nazaem
======

This is a repo for the new website of nazaem.bg

---

##Installation

In order to run this you need Node installed on your machine.
Once installed, you need the following packages:

    npm install -g grunt
    npm install -g bower

Once you clone the repo, please run:

	npm install
	bower install

This will install all project dependecies like angular & jquery.
To run the project:

	grunt serve


To build the project for distribution, please:

	grunt build

To view the distribution:

	grunt serve:build

To edit the SCSS files, you need to install Ruby. Then from terminal:

	gem install compass


####Notes on SEO
To avoid code repetition, I've put the main navigation into a partial view (found at app/partials/header.html).
This partial is dynamically loaded with angularJS. If you consider this being an issue with SEO, you can just copy the contents of header.html in all root html files. You'll need to paste it, replacing the <navhead></navhead> element.
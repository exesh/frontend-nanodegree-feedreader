/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeTruthy();
        });


        /* This test checks if all the feed urls present
         */
        it('urls are defined', function() {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeTruthy();
            });
        });


        /* This test checks if all the feed names present
         */
        it('names are defined', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeTruthy();
            });
        });
    });

    describe('The menu', function() {

        /* This test checks if the menu initially hidden
         */
        it('element is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This test checks ensures the menu changes
          * visibility when the menu icon is clicked
          */
        it('menu changes visibility', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass("menu-hidden")).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('loadFeed completes', function() {
            expect($('.feed .entry').html()).toBeTruthy();
        });

    });

    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes. I compare two HTMLs. 
         * For this reason I call loadFeed(0) and then
         * I run second function for another rss. 
         * And when the second one has been loaded only then I begin the test.
         */
        var loadedFeed0, loadedFeed1;
        beforeEach(function(done) {
            loadFeed(0, function () {
                loadedFeed0 = $('.feed').html();
                loadFeed(1, function () {
                    loadedFeed1 = $('.feed').html();
                    done();
                });
            });
        });
        it('content changes', function() {
            expect(loadedFeed0).not.toBe(loadedFeed1);
        });
    });
}());

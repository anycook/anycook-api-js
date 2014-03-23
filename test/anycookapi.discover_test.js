(function($) {
    /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
        module(name, {[setup][ ,teardown]})
        test(name, callback)
        asyncTest(name, callback)
        expect(numberOfAssertions)
        stop(increment)
        start(decrement)
    Test assertions:
        ok(value, [message])
        equal(actual, expected, [message])
        notEqual(actual, expected, [message])
        deepEqual(actual, expected, [message])
        notDeepEqual(actual, expected, [message])
        strictEqual(actual, expected, [message])
        notStrictEqual(actual, expected, [message])
        throws(block, [expected], [message])
    */

    module('AnycookAPI.discover', {
        // This will run before each test in this module.
        setup: function() {
            stop();
            $.when(AnycookAPI.init({
                baseUrl: 'http://anycook.apiary-mock.com',
                sendSessionId : false,
                withCredentials: false
            })).then(function(){
               start();
            });
        }
    });

    asyncTest('test discover', function() {
        expect(40);
        AnycookAPI.discover(function(json){
            ok(json);
            ok(json.newest);
            ok(json.tasty);
            ok(json.recommended);

            var recommended = json.recommended;
            ok($.isArray(recommended));
            ok(recommended.length > 0);
            ok(recommended[0]);
            ok(typeof recommended[0].name === 'string');
            ok(typeof recommended[0].description === 'string');
            ok(recommended[0].image);
            ok(typeof recommended[0].image.big === 'string');
            ok(typeof recommended[0].image.original === 'string');
            ok(typeof recommended[0].image.small === 'string');
            ok(recommended[0].time);
            ok(typeof recommended[0].time.min === 'number');
            ok(typeof recommended[0].time.std === 'number');

            var newest = json.newest;
            ok($.isArray(newest));
            ok(newest.length > 0);
            ok(newest[0]);
            ok(typeof newest[0].name === 'string');
            ok(typeof newest[0].description === 'string');
            ok(newest[0].image);
            ok(typeof newest[0].image.big === 'string');
            ok(typeof newest[0].image.original === 'string');
            ok(typeof newest[0].image.small === 'string');
            ok(newest[0].time);
            ok(typeof newest[0].time.min === 'number');
            ok(typeof newest[0].time.std === 'number');

            var tasty = json.tasty;
            ok($.isArray(tasty));
            ok(tasty.length > 0);
            ok(tasty[0]);
            ok(typeof tasty[0].name === 'string');
            ok(typeof tasty[0].description === 'string');
            ok(tasty[0].image);
            ok(typeof tasty[0].image.big === 'string');
            ok(typeof tasty[0].image.original === 'string');
            ok(typeof tasty[0].image.small === 'string');
            ok(tasty[0].time);
            ok(typeof tasty[0].time.min === 'number');
            ok(typeof tasty[0].time.std === 'number');
            start();
        });
    });

    asyncTest('test discover/new', function() {
        expect(13);
        AnycookAPI.discover.new(function(json){
            ok(json);
            ok($.isArray(json));
            ok(json.length > 0);
            ok(json[0]);
            ok(typeof json[0].name === 'string');
            ok(typeof json[0].description === 'string');
            ok(json[0].image);
            ok(typeof json[0].image.big === 'string');
            ok(typeof json[0].image.original === 'string');
            ok(typeof json[0].image.small === 'string');
            ok(json[0].time);
            ok(typeof json[0].time.min === 'number');
            ok(typeof json[0].time.std === 'number');
            start();
        });
    });

    asyncTest('test discover/tasty', function() {
        expect(13);
        AnycookAPI.discover.tasty(function(json){
            ok(json);
            ok($.isArray(json));
            ok(json.length > 0);
            ok(json[0]);
            ok(typeof json[0].name === 'string');
            ok(typeof json[0].description === 'string');
            ok(json[0].image);
            ok(typeof json[0].image.big === 'string');
            ok(typeof json[0].image.original === 'string');
            ok(typeof json[0].image.small === 'string');
            ok(json[0].time);
            ok(typeof json[0].time.min === 'number');
            ok(typeof json[0].time.std === 'number');
            start();
        });
    });

    asyncTest('test discover/recommended', function() {
        expect(13);
        AnycookAPI.discover.recommended(function(json){
            ok(json);
            ok($.isArray(json));
            ok(json.length > 0);
            ok(json[0]);
            ok(typeof json[0].name === 'string');
            ok(typeof json[0].description === 'string');
            ok(json[0].image);
            ok(typeof json[0].image.big === 'string');
            ok(typeof json[0].image.original === 'string');
            ok(typeof json[0].image.small === 'string');
            ok(json[0].time);
            ok(typeof json[0].time.min === 'number');
            ok(typeof json[0].time.std === 'number');
            start();
        });
    });

}(jQuery));

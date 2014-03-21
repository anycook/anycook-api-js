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

    module('AnycookAPI.autocomplete', {
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

    asyncTest('test autocomplete', function() {
        expect(6);
        AnycookAPI.autocomplete('test', function(json){
            ok(json, 'should be defined');
            ok(json.tags);
            ok(json.ingredients);
            ok(json.recipes);
            ok(json.categories);
            ok(json.user);
            start();
        });
    });

    asyncTest("test autocomplete ingredients", function(){
        expect(5);
        AnycookAPI.autocomplete.ingredient('l', function(json){
            ok(json);
            ok(Array.isArray(json));
            ok(json.length > 0);
            ok(json[0]);
            ok(typeof json[0].name === 'string');
            start();
        });
    });

    asyncTest("test autocomplete tags", function(){
        expect(5);
        AnycookAPI.autocomplete.tag('m', function(json){
            ok(json);
            ok(Array.isArray(json));
            ok(json.length > 0);
            ok(json[0]);
            ok(typeof json[0].name === 'string');
            start();
        });
    });

    asyncTest("test autocomplete users", function(){
        expect(6);
        AnycookAPI.autocomplete.user('j', function(json){
            ok(json);
            ok(Array.isArray(json));
            ok(json.length > 0);
            ok(json[0]);
            ok(typeof json[0].id === 'number');
            ok(typeof json[0].name === 'string');
            start();
        });
    });
}(jQuery));

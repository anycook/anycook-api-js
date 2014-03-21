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

    module('AnycookAPI.category', {
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

    asyncTest('test categories', function() {
        expect(7);
        AnycookAPI.category(function(json){
            ok(json);
            ok($.isArray(json));
            ok(json.length > 0);
            ok(json[0]);
            ok(typeof json[0].name === 'string');
            ok(typeof json[0].recipeNumber === 'number');
            ok(typeof json[0].sortId === 'number');
            start();
        });
    });

    asyncTest('test category', function() {
        expect(4);
        AnycookAPI.category('Fleisch', function(json){
            ok(json);
            ok(typeof json.name === 'string');
            ok(typeof json.recipeNumber === 'number');
            ok(typeof json.sortId === 'number');
            start();
        });
    });
}(jQuery));

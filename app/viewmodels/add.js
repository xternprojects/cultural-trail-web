define(['plugins/http', 'plugins/router', 'durandal/app', 'knockout'], function (http, router, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: 'Add Issue',
        name: ko.observable(''),
        activate: function(id) {
        },
        save: function() {
            // send to server
            // http.post

            var returnId = "55a17658a1e9c9110024c0ef";
            router.navigate('issue/'+returnId);
        },
        back: function() {
            router.navigate('');
        }
    };
});

define(['plugins/http', 'plugins/router', 'durandal/app', 'knockout'], function (http, router, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: 'Edit Issue',
        id: '',
        name: ko.observable(''),
        activate: function(id) {
            var that = this;

            return http.get('http://culturaltrail.herokuapp.com/issues', {'_id': id}).then(function(response) {
                if(response.length === 1) {
                    var issue = response[0];
                    that.id = issue._id;
                    that.name(issue.name);
                }
            });
        },
        save: function() {
            // send to server
            // http.post
            router.navigate('issue/'+this.id);
        },
        cancel: function() {
            router.navigate('issue/'+this.id);
        },
        back: function() {
            router.navigate('');
        }
    };
});

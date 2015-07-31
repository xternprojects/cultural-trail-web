define(['plugins/http', 'plugins/router', 'durandal/app', 'knockout'], function (http, router, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: 'Details',
        id: '',
        name: ko.observable(''),
        activate: function(id) {
            var that = this;

            return http.get('http://culturaltrail.herokuapp.com/issues', {'_id': id}).then(function(response) {
                console.log(response);
                if(response.length === 1) {
                    that.id = response[0]._id;
                    that.name(response[0].name);
                }
            });
        },
        edit: function() {
            router.navigate('issue/' + this.id + '/edit');
        },
        back: function() {
            router.navigate('');
        }
    };
});

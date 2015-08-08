define(['plugins/http', 'plugins/router', 'durandal/app', 'knockout'], function (http, router, app, ko) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    return {
        displayName: 'Issues',
        issues: ko.observableArray([]),
        issueView: ko.observable('card.html'),
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceeding
            if (this.issues().length > 0) {
                return;
            }

            var that = this;
            return http.get('http://culturaltrail.herokuapp.com/issues').then(function(response) {
                that.issues(response);
            });
        },
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            //item.viewUrl = 'views/detail';
            router.navigate('issue/' + item._id);
            //app.showView(item);
        },
        add: function() {
            router.navigate('issue/add');
        },
        switchToTableView: function() {
            this.issueView('tableRow.html');
        },
        switchToCardView: function() {
            this.issueView('card.html');
        }
    };
});

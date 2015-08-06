define(['plugins/http', 'plugins/router', 'durandal/app', 'knockout', 'bootstrap', 'moment'], function (http, router, app, ko, bootstrap, moment) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    var DATE_FORMAT = "MMMM Do YYYY, h:mm a"

    var model = {
        displayName: 'Details',
        id: '',
        name: ko.observable(''),
        description: ko.observable(''),
        open: ko.observable(true),
        pictureUrl: ko.observable(''),
        priority: ko.observable(0),
        reportedDate: ko.observable(null),
        resolvedDate: ko.observable(null),
        activate: function(id) {
            var that = this;

            return http.get('http://culturaltrail.herokuapp.com/issues', {'_id': id}).then(function(response) {
                console.log(response);
                if(response.length === 1) {
                    that.id = response[0]._id;
                    that.name(response[0].name);
                    that.description(response[0].description);
                    that.open(response[0].open);
                    that.pictureUrl(response[0].picture);
                    that.priority(response[0].priority);

                    console.log("resolved = " + response[0].resolvedDate);
                    if (response[0].resolvedDate === null) {
                        that.resolvedDate(null);
                        console.log("resolved null: resolved = " + response[0].resolvedDate);
                    }
                    else {
                        that.resolvedDate(moment(response[0].resolvedDate));
                    }

                    console.log("reported = " + response[0].reportedDate);
                    if (response[0].reportedDate === null) {
                        that.reportedDate(null);
                        console.log("reported null: reported = " + response[0].reportedDate);
                    }
                    else {
                        that.reportedDate(moment(response[0].reportedDate));
                    }


                    //TODO: add location
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

    model.openText = ko.computed(function() {
        return this.open() ? 'Open': 'Resolved';
    }, model);
    model.openHightlightClass = ko.computed(function() {
        return this.open() ? 'label-danger': 'label-success';
    }, model);

    model.priorityText = ko.computed(function() {
        return this.priority() === 0 ? 'Normal' : 'Urgent';
    }, model);

    model.priorityHightlightClass = ko.computed(function() {
        return this.priority() === 0 ? 'label-primary' : 'label-danger';
    }, model);

    model.reportedText = ko.computed(function() {
        if (this.reportedDate() !== null) {
            return this.reportedDate().format(DATE_FORMAT);
        }
        else {
            return "No reported date";
        }
    }, model);

    model.resolvedText = ko.computed(function() {
        if (this.resolvedDate() !== null) {
            return this.resolvedDate().format(DATE_FORMAT);
        }
        else {
            return "Issue not yet resolved";
        }
    }, model);

    return model;
});
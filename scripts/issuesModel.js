function IssuesModel() {
    var self = this;
    self.issues = ko.observableArray([]);
    self.fetch = function() {
        $.getJSON("http://culturaltrail.herokuapp.com/issues", function(data) {
            // Now use this data to update your view models,
            // and Knockout will update your UI automatically
            console.log(data);
            data.forEach(function(item) {
                self.issues.push(item);
            });
        });
    };
    self.loggedIn = ko.observable(false);
    self.uselessStuff = ko.computed(function() {
        if(self.loggedIn()) {
            self.fetch();
        }
        return 1;
    }, self);
}

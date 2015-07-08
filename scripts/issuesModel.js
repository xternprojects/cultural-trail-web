function IssuesModel() {
    var self = this;
    this.issues = ko.observableArray([]);
    this.fetch = function() {
        $.getJSON("http://culturaltrail.herokuapp.com/issues", function(data) {
            // Now use this data to update your view models,
            // and Knockout will update your UI automatically
            console.log(data);
            data.forEach(function(item) {
                self.issues.push(item);
            });
        });
        // $.ajax({
        //     url: "http://culturaltrail.herokuapp.com/issues",
        //     cache: false
        // })
        // .done(function( html ) {
        //     console.log(html);
        // })
        // .error(function(fsdf) {
        //     console.log(fsdf);
        // });
    }
}

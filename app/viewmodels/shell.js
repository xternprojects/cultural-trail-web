define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Issues', moduleId: 'viewmodels/issues', nav: true },
                { route: 'issue/add', title:'Add Issue', moduleId: 'viewmodels/add', nav: false },
                { route: 'issue/:id', title:'View Issue', moduleId: 'viewmodels/detail', nav: false },
                { route: 'issue/:id/edit', title:'Edit Issue', moduleId: 'viewmodels/edit', nav: false }
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});

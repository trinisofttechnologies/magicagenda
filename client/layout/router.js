Router.configure({
    "loadingTemplate": "loader",
    "notFoundTemplate": 'error',
});



Router.map(function() {
    this.route("dashboard", {
        path: "/",
        template: "home_default",
        yieldTemplates: {
            'dashboard': { to: 'bodyTemplate' },
        },
    });
});
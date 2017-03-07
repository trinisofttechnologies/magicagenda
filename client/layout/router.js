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
        // "onBeforeAction": function() {
        //     if (Meteor.userId()){

        //     }else{
        //         Router.go("/login");
        //     }
        // }
    });

    // this.route("login", {
    //     path: "/login",
    //     template: "staticLayout",
    //     yieldTemplates: {
    //         'login': { to: 'bodyTemplate' },
    //     },
    // });
});
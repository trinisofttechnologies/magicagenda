if (Meteor.isServer) {
    Meteor.methods({
        "updateUser": function(id, data) {
            console.log(data);
            if (id) {
                Meteor.users.update({ "_id": id }, { $set: { "profile.firstName": data.fName, "profile.lastName": data.lName, "profile.mobile": data.mobile } });
            }
        },
    })
}
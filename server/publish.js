Meteor.publish(null, function() {
    return Agenda.find({"createdBy": this.userId});
});

Meteor.publish(null, function() {
    return Items.find({"createdBy": this.userId});
});



Agenda = new Mongo.Collection('agenda');

Agenda.Model = function() {
    var options = {};
    options.createdBy = Meteor.userId();
    options.createdAt = new Date().getTime();
    return options;
}

Agenda.onInsert = function(options) {
    var insert = options;
    Agenda.insert(insert);
}

if (Meteor.isServer) {
    Meteor.methods({
        "createAgenda": function(agendaName) {
            var agendaName = agendaName;
            var options = new Agenda.Model();
            options.agendaName = agendaName;
            Agenda.onInsert(options);
        },
        "getSubAgenda": function(id,agenda) {

        },
        "removeAllEvents" : function(){
            Agenda.remove({});
        },
    })
}
Items = new Mongo.Collection('items');

Items.Model = function() {
    var options = {};
    options.docList = [];
    options.createdBy = Meteor.userId();
    options.createdAt = new Date().getTime();
    return options;
}

Items.onInsert = function(options) {
    var insert = options;
    Items.insert(insert);
}

if (Meteor.isServer) {
    Meteor.methods({
        "addItemToAgenda": function(agendaId, name) {
            var name = name;
            var agendaId = agendaId;
            var options = new Items.Model();
            options.name = name;
            options.agendaId = agendaId;
            Items.onInsert(options);
        },
        "removeAllItems": function() {
            Items.remove({});
        },
        "addDocToItem": function(id, data) {
            for (var i = 0; i < data.length; i++) {
                Items.update({ "_id": id }, { $push: { "docList": data[i] } });
            };
        },
    })
}
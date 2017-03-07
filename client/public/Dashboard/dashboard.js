Template.dashboard.helpers({
    "AgendaList": function() {
        return Agenda.find({"createdBy": Meteor.userId()}).fetch();
    },
    "imageUploadList" : function(){
    	return Session.get("imageUpload");
    },
    "imageCollectionList" : function(){
    	return Session.get("imagecollection");
    },
    "itemList" : function(){
    	console.log(this._id)
    	return Items.find({"agendaId": this._id}).fetch();
    },
    "subListCount" : function(value){
    	var list = 0;
    	return list + 1;
    },
    "itemDropdown" : function(){
    	var item = Items.findOne({"_id":Session.get("currentId")});
    	if(item){
    		return Items.find({"agendaId":item.agendaId}).fetch();
    	}else{
    		return [];
    	}
    },
});


Template.dashboard.events({
    "click .saveAgenda": function() {
    	var name = $(".crAgendaName").val();
    	if (!name) {
            $(".crAgendaName").addClass('form-control-error');
            toastr.info('Please Enter Event Title');
            return;
        } else {
            $(".crAgendaName").removeClass('form-control-error');
        }
        Meteor.call("createAgenda", name);
        $("#AgendaForm").modal("hide")
    },
    "click .closeAgendaForm": function() {
    	$("#AgendaForm").modal("hide")
    },
    "click .openAgendaForm" : function(){
    	$("#AgendaForm").modal("show")
    },
    "click .openDocumentForm" : function(){
    	Session.set("currentId",this._id);
    	$("#DocumentForm").modal("show");
    	Session.set("imageUpload",[])
    	var item = Items.findOne({"_id":this._id});
    	Session.set("imagecollection",item.docList)
    },
    "click .openItemForm" : function(){
    	Session.set("currentId",this._id);
    	$("#ItemForm").modal("show");
    },
    "click .closeItemForm" : function(){
    	$("#ItemForm").modal("hide");

    },
    "click .saveItem": function() {
    	var id = Session.get("currentId");
    	var name = $(".ItemName").val();
    	if (!name) {
            $(".ItemName").addClass('form-control-error');
            toastr.info('Please Enter Event Title');
            return;
        } else {
            $(".ItemName").removeClass('form-control-error');
        }
        Meteor.call("addItemToAgenda",id, name);
        $("#ItemForm").modal("hide")
    },
    "click .addDocToItem" : function(){
    	var list = Session.get("imageUpload");
    	Meteor.call("addDocToItem",Session.get("currentId"),list);
    	Session.set("imageUpload",[]);
    },
    "change #itemDropdown" : function(){
    	var id = $("#itemDropdown").val();
    	if(id){
    	Session.set("currentId",id);
    	var item = Items.findOne({"_id":id});
    		if(item){
	    		Session.set("imagecollection",item.docList)
    		}
    	}
    }
});




Template.dashboard.onRendered(function() {
	app.cloudinary.imageUpload();
	$(".cloudinary_fileupload").addClass("drop-zone")
});
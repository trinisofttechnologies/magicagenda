app.cloudinary = {};
app.cloudinary.cloud_name = "kidztopros2016"; //"hastenf";
app.cloudinary.api_key = "944684848982137"; //"327139278191112";
app.cloudinary.unsigned = "bgloxxhv"; //"pytzaemo";
app.cloudinary.flag = false;
app.uploadedImg = "";
$.cloudinary.config({ cloud_name: app.cloudinary.cloud_name, api_key: app.cloudinary.api_key });

app.cloudinary.imageUpload = function() {

    $('#file-img').unsigned_cloudinary_upload(app.cloudinary.unsigned, { cloud_name: 'kidztopros2016', tags: 'my_gallary_picture' }, { multiple: false }).bind('cloudinarydone', function(e, data) {
        console.log(e);
        console.log(data);
        var image = data.result.secure_url;
        console.log(image);
        var middle = "w_100,h_100,c_fill";
        var new_img_url = null;
        var img_url = image
        new_img_url = img_url.replace("image/fetch/", "image/fetch/" + middle + "/");
        img_url = img_url.split("upload/")
        var first = img_url[0] + "upload/";
        var second = "/" + img_url[1].split("/")[1];
        new_img_url = first + middle + second;
        $("#file-img").attr("link",new_img_url);
        var array = Session.get("imageUpload");
        var list = {};
        list._id = Math.random().toString(36).substring(7);
        list.name = data.files[0].name;
        list.url = new_img_url;
        array.push(list);
        Session.set("imageUpload",array);
        $(".currentItem").addClass("hide")
    }).bind('cloudinaryprogress', function(e, data) {
        $(".currentItem").removeClass("hide")
        var progress = Math.round((data.loaded * 100.0) / data.total);
        $(".currentProgressChart").attr("value", progress)
        $(".currentProgressText2").text(progress +"%")
        console.log(progress)
            // $("#uploadProgress").css("opacity",1.0).html(progress);
    }).bind("fileuploadfail", function(e, data) {
        console.log("fileuploadfail");
        console.log(e);
        console.log(data);
        $(".currentItem").addClass("hide")
        // $("#uploadProgress").css("opacity",1.0).html("!");
        // app.cloudinary.hideProgress();
    });
}

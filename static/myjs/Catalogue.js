function addcataloge() {
    if ($('#formCata').valid()) {
        var catalog = new FormData();
        catalog.append("title", document.getElementById("title").value);
        catalog.append('cateogry', document.getElementById('cateogry').value);
        catalog.append('artist', document.getElementById('artist').value);
        catalog.append('publisher', document.getElementById('publisher').value);
        catalog.append("price", document.getElementById('price').value);
        catalog.append('quantity', document.getElementById('quantity').value);
        catalog.append('image', document.getElementById('image').files[0]);
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                var output = this.response.trim();
                alert(output);
                viewcatalog();
                document.getElementById("formCata").reset();
            }
        };
        xml.open('POST', 'catalogAction', true);
        xml.send(catalog);

    }
}

function viewcatalog() {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            var output = JSON.parse(this.response);
            // console.log(output);
            var s = "<table class='table table-hover table-warning'>";
            s += "<tr>";
            s += "<th>Title</th>";
            s += "<th>Cateogory</th>";
            s += "<th>Artist</th>";
            s += "<th>Publisher</th>";
            s += "<th>Price</th>";
            s += "<th>Quantity</th>";
            s += "<th>Image</th>";
            s += "<th colspan=2 class='text-center'>Action</th>";
            s += "</tr>";
            for (var i = 0; i < output.length; i++) {
                // console.log(output[i]['title']);
                s += "<tr>";
                s += "<td>" + output[i]['title'] + "</td>";
                s += "<td>" + output[i]['cateogry'] + "</td>";
                s += "<td>" + output[i]['artist'] + "</td>";
                s += "<td>" + output[i]['publisher'] + "</td>";
                s += "<td>" + output[i]['price'] + "</td>";
                s += "<td>" + output[i]['quantity'] + "</td>";
                s += "<td><img src='static/media/" + output[i]['img'] + "' width='100'></td>";
                s += "<td ><button type='button' class='btn btn-danger' onclick='deletecatalog(" + output[i]["id"] + ")'><strong class='fas fa-trash-alt'></strong></button></td> ";
                s += "<td><button type='button' class='btn btn-warning' onclick='showmodelpopup(" + JSON.stringify(output[i]) + ")'><strong class='fas fa-edit'></strong></button></td> ";
                s += "</tr>";
            }
            s += "</table>";
            document.getElementById('tablecontent').innerHTML = s;
        }
    };
    xml.open('GET', 'viewCatalogAction', true);
    xml.send();
}

function deletecatalog(id) {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var output = this.response;
            alert(output);
            viewcatalog();
        }
    };
    xml.open("GET", "deletecate?id=" + id, true);
    xml.send();
}

function showmodelpopup(obj) {
    // alert();
    $("#ISBN").val(obj.id);
    $("#titleedit").val(obj.title);
    $("#cateogryedit").val(obj.cateogry);
    $("#artistedit").val(obj.artist);
    $("#publisheredit").val(obj.publisher);
    $("#priceedit").val(obj.price);
    $("#quantityedit").val(obj.quantity);
    // alert(obj.img)
    $("#img_edit").attr('src', 'static/media/' + obj.img);
    $("#updateModal").modal("show");

}

function udatecatalog() {
    if ($("#formupCata").valid()) {
        var updatedata = new FormData;
        updatedata.append("ISBN", document.getElementById("ISBN").value);
        updatedata.append('title', document.getElementById('titleedit').value);
        updatedata.append("category", document.getElementById("cateogryedit").value);
        updatedata.append("artist", document.getElementById("artistedit").value);
        updatedata.append('publisher', document.getElementById("publisheredit").value);
        updatedata.append('price', document.getElementById("priceedit").value);
        updatedata.append("quantity", document.getElementById("quantityedit").value);
        updatedata.append("imgedit", document.getElementById("imgedit").files[0]);
        // console.log(document.getElementById("imageedit").value);
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if (this.status == 200 && this.readyState == 4) {
                var output = this.response;
                alert(output);
                viewcatalog();
                document.getElementById("formupCata").reset();

            }
        };
        xml.open('POST', 'updatedataaction', true);
        xml.send(updatedata);
    }
}
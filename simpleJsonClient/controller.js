//Starting point for JQuery init
$(document).ready(function () {

    loaddata();

});

function loaddata() {


    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "getAppointments", param: "all"},
        dataType: "json",
        success: function (response) {

            

            $.each (response, function (i, item) {

                $('#list').append('<li>' + item.title + '</li>');
            });
        }

    });


}


//Starting point for JQuery init
$(document).ready(function () {
    $("ol").hide();
    $("#error").hide();
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
            //ToDo: Center container
            $("#container").css({
                "display" : "flex",
                "justify-content" : "center",
                "height" : "100%",
            });
            $("#ul").css({
                "align-self" : "center"
            });

            $.each (response, function (i, item) {
                $('#list').append('<li>' + item["title"] + '</li>');
                $('#list').append('<li>' + item["location"] + '</li>');
                $('#ul').show();    
            });

         },

        error: function(e) {
            $("#error").html("Error!").css({
                "display": "grid",
                "justify-content": "center",
                "align-text": "center",
                "color" : "red",
                "font-size" : "x-large"
            });
            $("#error").show();
        }

    });

}


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

                // Create the new <li> element
                var newAppointment = $("<li>").html(`
                  <a href="#" class="appointment-link">
                    <h3 class="appointment-title">${item.title}</h3>
                    <p class="appointment-description">Description of Appointment 2</p>
                    <span class="appointment-date">April 25, 2023</span>
                  </a>
`);

                $("#list").append(newAppointment);

            });
        }

    });


}


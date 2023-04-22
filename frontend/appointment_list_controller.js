//Starting point for JQuery init


$("#header").on("click", function () {+
    $("#appointments").show();
    $("#appointment_details").hide();
    $("#list").empty();
    $("#possibleDT").empty();

    loaddata("getAppointments", "all");
});

$("#appointment_details").toggle();
loaddata("getAppointments", "all");

function loaddata(method, param) {

    console.log("loaddata");
    console.log(method);
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: method, param: param },
        dataType: "json",
        success: function (response) {
            if (method === "getAppointments") {
                loadAppointments(response);
            }
            if (method === "getAppointmentById") {
                console.log("getAppointmentById");
                loadAppointmentDetails(response);
            }
            if (method === "getPossibleDT") {
                console.log("getPossibleDT");
                loadPossibleDT(response);
            }
        },
        error: function (response) {
            console.log(response);
        }

    });


}

function loadAppointments(appointments) {

    $.each (appointments, function (i, item) {

        console.log(item.deadline);
        const transformedDate = formatDate(item.deadline);
        var appointmentClass = "appointment-link";
        if(new Date(item.deadline) < new Date()) {
            appointmentClass += " past-appointment";
        }

        // Create the new <li> element
        var newAppointment = $("<li>",{onclick: "loaddata('getAppointmentById', " + item.id + ")",
            class: "list-group-item"}).html(`
                  <a href="#" class="${appointmentClass}">
                    <h3 class="appointment-title">${item.title}</h3>
                    <p class="appointment-location">${item.location}</p>
                    <span class="appointment-date"> Deadline: ${transformedDate}</span>
                  </a>
                `);
        $("#list").append(newAppointment);

    });
}

function loadAppointmentDetails(appointment) {

    $("#appointment_details").show();
    $("#appointments").hide();
    $("#title").html(appointment.title);
    $("#location").html(appointment.location);
    $("#deadline").html(formatDate(appointment.deadline));
    if (new Date(appointment.deadline) < new Date()) {
        $("#input").hide();
        $("#past-appointment").show();
    }
    else {
        $("#input").show();
        $("#past-appointment").hide();
    }
    loaddata("getPossibleDT", appointment.id);
}


function loadPossibleDT(possibleDT) {


    $.each (possibleDT, function (i, item) {

        const transformedDate = formatDate(item.date);

        let listItem = $('<li>', {
            class: 'list-group-item clickable d-flex justify-content-between',
        }).html(`
                <span>${transformedDate}</span>
                <span>${item.starting_time} - ${item.closing_time}</span>  
               
            `);
        if ($("#past-appointment").is(":visible")) {
            listItem.addClass("pastDT");
        }
        $("#possibleDT").append(listItem);

        if ($("#past-appointment").is(":hidden")) {
            $('.clickable').on('click', function() {
                // Toggle the "bg-success" and "text-white" Bootstrap classes on the clicked list item
                $(this).toggleClass('bg-success text-white');
            });

        }

    });
}


function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Extract the year, month, and day from the Date object
    const year = date.getFullYear();
    const month = date.getMonth(); // Months are zero-based in JavaScript
    const day = date.getDate();

    // Define an array of month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get the month name from the array using the month index
    const monthName = monthNames[month];

    // Concatenate the transformed date components
    return `${monthName} ${day}, ${year}`;
}




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


                const transformedDate = formatDate(item.deadline);
                // Create the new <li> element
                var newAppointment = $("<li>").html(`
                  <a href="#" class="appointment-link">
                    <h3 class="appointment-title">${item.title}</h3>
                    <p class="appointment-description">Description of Appointment 2</p>
                    <span class="appointment-date"> Deadline: ${transformedDate}</span>
                  </a>
`);

                $("#list").append(newAppointment);

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




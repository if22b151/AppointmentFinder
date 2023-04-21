//Starting point for JQuery init


loaddata();

function loaddata() {


    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "getAppointments"},
        dataType: "json",
        success: function (response) {


            $.each (response, function (i, item) {

                var pastAppointment = false;
                const transformedDate = formatDate(item.deadline);
                var appointmentClass = "appointment-link";
                if(new Date(item.deadline) < new Date()) {
                    appointmentClass += " past-appointment";
                    pastAppointment = true;
                }

                // Create the new <li> element
                var newAppointment = $("<li>").html(`
                  <a href="appointment_details.html?id=${item.id}&pastAppointment=${pastAppointment}" class="${appointmentClass}">
                    <h3 class="appointment-title">${item.title}</h3>
                    <p class="appointment-location">${item.location}</p>
                    <span class="appointment-date"> Deadline: ${transformedDate}</span>
                  </a>
                `);
                $("#list").append(newAppointment);

            });
        },
        error: function (response) {
            console.log(response);
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




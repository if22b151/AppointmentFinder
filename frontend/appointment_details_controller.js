var appointments;

loaddata();

function loaddata() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const pastAppointment = urlParams.get('pastAppointment');

    if (pastAppointment == "true") {
        $("#input").hide();
        $("#form").append('<span class="text-danger">This appointment is in the past. You can not make any changes.</span>');
    }
    
    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "getPossibleDT", param: id},
        dataType: "json",
        success: function (response) {

            var formattedDate = formatDate(response[0].date);

            const listItem = $('<li>', {
                class: 'list-group-item clickable d-flex justify-content-between',
            }).html(`
                <span>${formattedDate}</span>
                <span>${response[0].starting_time} - ${response[0].closing_time}</span>
            `);
            $("#possibleDT").append(listItem);

            $('.clickable').on('click', function() {
                // Toggle the "bg-success" and "text-white" Bootstrap classes on the clicked list item
                $(this).toggleClass('bg-success text-white');
            });
        },
        error: function () {
            console.log("error");
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
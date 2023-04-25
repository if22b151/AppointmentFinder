hideComponents("appointments");
loaddata("GET", "getAppointments");

$("#overview").on("click", function () {
  hideComponents("appointments");
  $("#list").empty();
  $("#possibleDT").empty();
  $("#date-list").empty();

  loaddata("GET", "getAppointments", "all");
});

$("#create").on("click", function () {
    hideComponents("create_appointment");
});

$("#add-date").on("click", function () {
  const date = $("#newPossibleDate").val();
  const time = $("#newPossibleTime").val();
  const listItem = $("<li>", {
    onclick: "$(this).remove()",
    class: "list-group-item d-flex justify-content-between",
  }).html(`
                  <span>${date}</span>
                  <span>${time}</span>
           `);
  if (date != "" && time != "") {
    $("#date-list").append(listItem);
  }
});

function hideComponents(except) {
  (except === "appointments") ? $("#appointments").show() : $("#appointments").hide();
  (except === "appointment_details") ? $("#appointment_details").show() : $("#appointment_details").hide();
  (except === "create_appointment") ? $("#create_appointment").show() : $("#create_appointment").hide();
  $("#add_success").hide();
}


function loaddata(typemethod, method, param) {
  console.log("loaddata");
  console.log(method);
  console.log(param);
  $.ajax({
    type: typemethod,
    url: "../serviceHandler.php",
    cache: false,
    data: { method: method, param: param },
    dataType: "json",
    success: function (response) {
      if (method === "getAppointments") {
        console.log("test");
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
      if (method === "addToCalendar") {
        $("#add_success").show();
        console.log(response);
      }
    },
    error: function (response, status, error) {
      console.log("error");
      console.log(response, status, error);
    },
  });
}

function loadAppointments(appointments) {
  $.each(appointments, function (i, item) {
    console.log(item.deadline);
    const transformedDate = formatDate(item.deadline);

    var appointmentClass = "appointment-link";
    if (new Date(item.deadline) < new Date()) {
      appointmentClass += " past-appointment";
    }

    // Create the new <li> element
    var newAppointment = $("<li>", {
      onclick: "loaddata('GET', 'getAppointmentById', " + item.id + ")",
    }).html(`
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

  hideComponents("appointment_details");
  $("#title").html(appointment.title);
  $("#location").html(appointment.location);
  $("#deadline").html(formatDate(appointment.deadline));
  if (new Date(appointment.deadline) < new Date()) {
    $("#input").hide();
    $("#past-appointment").show();
  } else {
    $("#input").show();
    $("#past-appointment").hide();
  }
  loaddata("GET", "getPossibleDT", appointment.id);
}

function loadPossibleDT(possibleDT) {
  let appointment_id = null;
  if (possibleDT.length != 0) {
      appointment_id = possibleDT[0].fk_appointment_id;
  }
  $.each(possibleDT, function (i, item) {
    const transformedDate = formatDate(item.date);

    let listItem = $("<li>", {
      class: "list-group-item clickable d-flex justify-content-between",
    }).html(`
                <span>${transformedDate}</span>
                <span>${item.starting_time} - ${item.closing_time}</span>  
               
            `);
    listItem.attr("pdt-id", item.pdt_id);


    if ($("#past-appointment").is(":visible")) {
      listItem.addClass("pastDT");
    }
    $("#possibleDT").append(listItem);
  });

  if ($("#past-appointment").is(":hidden")) {
    $(".clickable").on("click", function () {
      // Toggle the "bg-success" and "text-white" Bootstrap classes on the clicked list item
      $(this).toggleClass("bg-success text-white");
    });
  }
  $("#add-to-cal").on("click", function () {
    const inputobj = {};
    inputobj.name = $("#name").val();
    inputobj.comment = $("#comment").val();
    inputobj.appointment_id = appointment_id;
    inputobj.possibleDT = [];
    $(".bg-success").each(function () {
        inputobj.possibleDT.push($(this).attr("pdt-id"));
    });
    loaddata("POST", "addToCalendar", inputobj);
  });

}

//Example: 2020-12-31 --> December 31, 2020
function formatDate(dateString) {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Extract the year, month, and day from the Date object
  const year = date.getFullYear();
  const month = date.getMonth(); // Months are zero-based in JavaScript
  const day = date.getDate();

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name from the array using the month index
  const monthName = monthNames[month];

  // Concatenate the transformed date components
  return `${monthName} ${day}, ${year}`;
}

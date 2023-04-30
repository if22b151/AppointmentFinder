// Authors: Christoph Leopold, Paul Felgitsch

//hides all components and loads the appointments
hideComponents("appointments");
loaddata("GET", "getAppointments");


//loads the appointments by clicking on "appointments" in the header
$("#overview").on("click", function () {
  hideComponents("appointments");
  $("#list").empty();
  $("#possibleDT").empty();
  $("#date-list").empty();
  $("#create_success").hide();

  loaddata("GET", "getAppointments", "all");
});



//loads the create appointment form by clicking on "create appointment" in the header
$("#create").on("click", function () {
    hideComponents("create_appointment");
});




//adds a date and time to the list of possible dates and times
$("#add-date").on("click", function () {
  const date = $("#newPossibleDate").val();
  const starting_time = $("#newStarting_Time").val();
  const closing_time = $("#newClosing_Time").val();
  const listItem = $("<li>", {
    onclick: "$(this).remove()",
    class: "list-group-item d-flex justify-content-between",
  }).html(`
                  <span name="date">${date}</span>
                  <span><span>${starting_time}</span> - <span>${closing_time}</span></span>
           `);
  if (date !== "" && starting_time !== "" && closing_time !== "") {
    $("#date-list").append(listItem);
  }
});



//hides all components except the one passed as parameter
function hideComponents(except) {
  (except === "appointments") ? $("#appointments").show() : $("#appointments").hide();
  (except === "appointment_details") ? $("#appointment_details").show() : $("#appointment_details").hide();
  (except === "create_appointment") ? $("#create_appointment").show() : $("#create_appointment").hide();
  $("#add_success").hide();
  $("#create_success").hide();
}

//ajax call to the service handler, with typemethod = GET or POST,
// method = the method to be called in the service handler, param = the parameter to be passed to the method
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
      if (method === "addAppointment") {
        $("#create_success").show();
        console.log(response);
      }
      if (method === "deleteAppointment") {
        $("#appointments").show();
        $("#list").empty();
        $("#possibleDT").empty();
        $("#date-list").empty();
        $("#create_success").hide();
        loaddata("GET", "getAppointments", "all");
      }
    },
    error: function (response, status, error) {
      console.log("error");
      console.log(response, status, error);
    },
  });
}


//creates new list elements for the appointments with the data from the database and appends them to the list
function loadAppointments(appointments) {
  $.each(appointments, function (i, item) {
    console.log(item.deadline);
    const transformedDate = formatDate(item.deadline);

    var appointmentClass = "appointment-link";
    if (new Date(item.deadline) < new Date()) {
      appointmentClass += " past-appointment";
    }

    // Create the new <li> element
    var newAppointment = $("<li>",
    ).html(`
                <div class="row mb-3">
                  <div class="col">
                    <a href="#" class="${appointmentClass}" onclick="loaddata('GET', 'getAppointmentById', ${item.id})">
                      <h3 class="appointment-title">${item.title}</h3>
                      <p class="appointment-location">${item.location}</p>
                      <span class="appointment-date"> Deadline: ${transformedDate}</span>
                    </a>
                  </div>
                  <div id="delete" class="col">
                    <button type="button" class="delete-button" onclick="loaddata('POST', 'deleteAppointment', ${item.id})">Delete</button>
                  </div>
                </div>   
           `);
    $("#list").append(newAppointment);
  });
}



//shows title, location and deadline of the appointment and calls the method to load the possible dates and times
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



//creates new list elements for the possible dates and times with the data from the database and appends them to the list
function loadPossibleDT(possibleDT) {
  let appointment_id = null;
  if (possibleDT.length != 0) {
      appointment_id = possibleDT[0].fk_appointment_id;
  }

  // Create the new <li> element
  $.each(possibleDT, function (i, item) {
    const transformedDate = formatDate(item.date);

    let listItem = $("<li>", {
      class: "list-group-item clickable d-flex justify-content-between",
    }).html(`
                <span>${transformedDate}</span>
                <span>${item.starting_time} - ${item.closing_time}</span>  
               
            `);
    listItem.attr("pdt-id", item.pdt_id);


    //if the appointment is in the past, add the class pastDT to the list item
    if ($("#past-appointment").is(":visible")) {
      listItem.addClass("pastDT");
    }

    // Append the new <li> element to the list
    $("#possibleDT").append(listItem);
  });

  //if the appointment is not in the past, make the list items clickable
  // and toggle the "bg-success" and "text-white" Bootstrap classes on the clicked list item
  if ($("#past-appointment").is(":hidden")) {
    $(".clickable").on("click", function () {
      // Toggle the "bg-success" and "text-white" Bootstrap classes on the clicked list item
      $(this).toggleClass("bg-success text-white");
    });
  }

  //add onclick event to the button to add the appointment to the calendar
  $("#add-to-cal").on("click", function () {
    const inputobj = {};
    inputobj.name = $("#name").val();
    inputobj.comment = $("#comment").val();
    inputobj.appointment_id = appointment_id;
    inputobj.possibleDT = [];
    $(".bg-success").each(function () {
        inputobj.possibleDT.push($(this).attr("pdt-id"));
    });
    console.log("add to calendar clicked");
    loaddata("POST", "addToCalendar", inputobj);
  });

}

//DELETE FROM `chosen_dt` Where fk_pers_id <> 1;

//add onclick event to the button to create a new appointment and add it to the database
$("#submit_appointment").on("click", function () {
  const inputobj = {};
  inputobj.title = $("#newTitle").val();
  inputobj.location = $("#newLocation").val();
  inputobj.deadline = $("#newDeadLine").val();
  console.log(inputobj.deadline);
  inputobj.possibleDT = [];
  $(".list-group-item").each(function () {
    const newDate = $(this).find("span[name='date']").text();
    const newStarting_time = $(this).find("span:last-child").find("span:first-child").text();
    const newClosing_time = $(this).find("span:last-child").find("span:last-child").text();
    console.log("newDate: " + newDate);
    console.log(newStarting_time);
    console.log(newClosing_time);
    inputobj.possibleDT.push({ date: newDate, starting_time: newStarting_time, closing_time: newClosing_time });
  });
  loaddata("POST", "addAppointment", inputobj);

});


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

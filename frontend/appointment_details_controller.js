
$(document).ready(function() {
    $('.clickable').on('click', function() {
        // Toggle the "bg-success" and "text-white" Bootstrap classes on the clicked list item
        $(this).toggleClass('bg-success text-white');
    });
});
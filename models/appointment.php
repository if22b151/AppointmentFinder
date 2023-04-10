<?php
class Appointment {
    public $id;
    public $possible_Date_Time;

    public $title;

    public $location;

    public $deadline;

    function __construct($id, $possible_Date_Time, $title, $location, $deadline) {
        $this->id = $id;
        $this->possible_Date_Time = $possible_Date_Time;
        $this->title = $title;
        $this->location = $location;
        $this->deadline = $deadline;
    }
}

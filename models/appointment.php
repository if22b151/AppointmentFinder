<?php
class Appointment {
    public $id;
    public $possible_DT;
    public $title;
    public $location;
    public $deadline;

    function __construct($id, $possible_DT, $title, $location, $deadline) {
        $this->id = $id;
        $this->possible_DT = $possible_DT;
        $this->title = $title;
        $this->location = $location;
        $this->deadline = $deadline;
    }
}

<?php
class Appointment {
    public $id;
    public $possibleDT;
    public $title;
    public $location;
    public $deadline;

    function __construct($id, $possibleDT, $title, $location, $deadline) {
        $this->id = $id;
        $this->possibleDT = $possibleDT;
        $this->title = $title;
        $this->location = $location;
        $this->deadline = $deadline;
    }
}

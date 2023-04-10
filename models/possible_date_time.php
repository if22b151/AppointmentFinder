<?php

class possible_date_time
{

    public $date;
    public $starting_time;
    public $closing_time;

    function __construct($date, $starting_time, $closing_time)
    {
        $this->date = $date;
        $this->starting_time = $starting_time;
        $this->closing_time = $closing_time;
    }
}
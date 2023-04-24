<?php
include("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {

            case "getAppointments":
                $res = $this->dh->getAppointments();
                break;
            case "getPossibleDT":
                $res = $this->dh->getPossibleDT($param);
                break;
            case "getAppointmentById":
                $res = $this->dh->getAppointmentById($param);
                break;
            case "addToCalendar":
                $res = $this->dh->addtoCalendar($param);
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}

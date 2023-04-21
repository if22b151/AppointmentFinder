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
            default:
                $res = null;
                break;
        }
        return $res;
    }
}

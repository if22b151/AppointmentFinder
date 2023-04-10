<?php
include("./models/appointment.php");
include("./models/possible_date_time.php");
class DataHandler
{


//    public function queryPersonById($id)
//    {
//        $result = array();
//        foreach ($this->queryPersons() as $val) {
//            if ($val[0]->id == $id) {
//                array_push($result, $val);
//            }
//        }
//        return $result;
//    }

    public function getAppointments()
    {
        $result = array();
        foreach ($this->getDemoData() as $val) {
            array_push($result, $val);
        }
        return $result;
    }


    private static function getDemoData()
    {
        $demodata = [
               [new Appointment(1,"test", "Orgy", "PaulsPlace", "2023-6-12")],

        ];
        return $demodata;
    }
}

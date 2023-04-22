<?php
include("./models/appointment.php");
include("./models/Possible_DT.php");
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

    public function getPossibleDT($id){

        $appointments = self::getDemoData();
        foreach ($appointments as $appointment) {
            if ($appointment->id == $id) {
                return $appointment->possible_DT;
            }
        }

        return null;
    }

    public function getAppointmentById($id){

        $appointments = self::getDemoData();
        foreach ($appointments as $appointment) {
            if ($appointment->id == $id) {
                return $appointment;
            }
        }
        return null;
    }


    private static function getDemoData()
    {



        $demodata = [
            new Appointment(1,[new possible_DT("2023-02-01", "19:00", "20:00"),new possible_DT("2023-02-01", "19:00", "20:00")], "Party", "PaulsPlace", "2023-01-12"),
            new Appointment(2,[new possible_DT("2023-06-01", "11:00", "13:00")], "Funeral", "Cemetery", "2023-05-12"),

        ];
        return $demodata;
    }

}

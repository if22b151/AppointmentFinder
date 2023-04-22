<?php


class DataHandler
{

    public function dbAccess()
    {
        $db_obj = new mysqli("localhost", "bif2webscriptinguser", "bif2021", "appointment_finder");
        if ($db_obj->connect_errno) {
            echo "Failed to connect to MySQL: " . $db_obj->connect_error;
            exit();
        }
        return $db_obj;
    }

    public function getAppointments()
    {

        $db_obj = self::dbAccess();
        $sql = "SELECT * FROM appointment";
        $stmt = $db_obj->prepare($sql);
        $stmt->execute();
        $stmt->bind_result($id, $title, $deadline, $location);

        $appointments = array();
        while ($stmt->fetch()) {
            $appointments[] = array(
                'id' => $id,
                'title' => $title,
                'deadline' => $deadline,
                'location' => $location
            );
        }
        if (empty($appointments)) {
            return null;
        }
        return $appointments;

    }

    public function getPossibleDT($id)
    {
        $db_obj = self::dbAccess();
        $sql = "SELECT * FROM possible_date_time WHERE fk_appointment_id = ?";
        $stmt = $db_obj->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($pdt_id, $date, $starting_time, $closing_time, $fk_appointment_id);

        $possible_dt = array();
        while ($stmt->fetch()) {
            $possible_dt[] = array(
                'pdt_id' => $pdt_id,
                'date' => $date,
                'starting_time' => $starting_time,
                'closing_time' => $closing_time,
                'fk_appointment_id' => $fk_appointment_id
            );
        }
        if (empty($possible_dt)) {
            return null;
        }
        return $possible_dt;
    }

    public function getAppointmentById($id){

        $db_obj = self::dbAccess();
        $sql = "SELECT * FROM appointment WHERE appointment_id = ?";
        $stmt = $db_obj->prepare($sql);
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $stmt->bind_result($id, $title, $deadline, $location);
        if ($stmt->fetch()) {
            $appointment = array(
                'id' => $id,
                'title' => $title,
                'deadline' => $deadline,
                'location' => $location
            );
            return $appointment;
        }
        return null;
    }


//    private static function getDemoData()
//    {
//
//        $demodata = [
//            new Appointment(1,[new possible_DT("2023-02-01", "19:00", "20:00"),new possible_DT("2023-02-01", "19:00", "20:00")], "Party", "PaulsPlace", "2023-01-12"),
//            new Appointment(2,[new possible_DT("2023-06-01", "11:00", "13:00")], "Funeral", "Cemetery", "2023-05-12"),
//
//        ];
//        return $demodata;
//    }

}

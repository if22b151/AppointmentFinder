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

    public function addAppointment($inputs)
    {
        $db_object = self::dbAccess();
        $sql = "INSERT INTO appointment(`title`, `deadline`, `location`) VALUES (?,?,?)";
        $stmt = $db_object->prepare($sql);
        $stmt->bind_param("sss", $inputs["title"], $inputs["deadline"], $inputs["location"]);
        $stmt->execute();
        $last_id = $stmt->insert_id;
        $stmt->close();

        if ($inputs["possibleDT"] != null && count($inputs["possibleDT"]) > 0) {
            $db_object = self::dbAccess();
            for ($i = 0; $i < count($inputs["possibleDT"]); $i++) {
                $sql = "INSERT INTO possible_date_time(`date`, `starting_time`, `closing_time`, `fk_appointment_id`) VALUES (?,?,?,?)";
                $stmt = $db_object->prepare($sql);
                $stmt->bind_param("sssi", $inputs["possibleDT"][$i]["date"], $inputs["possibleDT"][$i]["starting_time"], $inputs["possibleDT"][$i]["closing_time"], $last_id);
                $stmt->execute();
                $stmt->close();
            }
        }
        return "success";

    }

    public function addToCalendar($inputs)
    {
        $db_obj = self::dbAccess();
        $sql = "INSERT INTO person(`name`, `comment`, `fk_appointment_id`) VALUES (?,?,?)";
        $stmt = $db_obj->prepare($sql);
        $stmt->bind_param("ssi", $inputs["name"], $inputs["comment"], $inputs["appointment_id"]);
        $stmt->execute();
        $last_id = $stmt->insert_id;
        $stmt->close();

        if ($inputs["possibleDT"] != null && count($inputs["possibleDT"]) > 0) {

            $db_obj = self::dbAccess();
            for ($i = 0; $i < count($inputs["possibleDT"]); $i++) {
                $sql = "INSERT INTO chosen_dt(`fk_pers_id`, `fk_pdt_id`) VALUES (?,?)";
                $stmt = $db_obj->prepare($sql);
                $stmt->bind_param("ii", $last_id, $inputs["possibleDT"][$i]);
                $stmt->execute();
                $stmt->close();
            }
        }


        return "success";
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

        $stmt->close();

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

        $stmt->close();

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

        $stmt->close();
    }

}

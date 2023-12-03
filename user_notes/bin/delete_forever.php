<?php

    //will handle the request to permanently delete a note here

    require_once "./../../helpers/config.php";
    session_start();
    require_once "./../../helpers/helper.php";
    sessionExpCheck();

    if(isset($_POST["noteid"]))
    {
        //good request

        //link object
        global $link;

        //query string
        $sql = "delete from user_notes where note_id=? and user_id=?;";

        //prepare statement
        $stmt = mysqli_prepare($link, $sql);

        //bind parameters
        mysqli_stmt_bind_param($stmt, "ii", $param_note_id, $param_user_id);

        //set parameters
        $param_note_id = $_POST["noteid"];
        $param_user_id = $_SESSION["user_id"];

        //execute
        mysqli_execute($stmt);
    
    }
    else
    {
        echo "bad request";
    }

?>
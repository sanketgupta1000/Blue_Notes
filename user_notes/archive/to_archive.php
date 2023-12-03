<?php

    //will handle ajax request to archive a note here
    require_once "./../../helpers/config.php";
    session_start();
    require_once "./../../helpers/helper.php";
    sessionExpCheck();

    require_once "./../helpers/helper.php";

    if(isset($_POST["noteid"]))
    {
        //good request
        updateNote($_POST["noteid"], 0, 1, 0);
        // echo "archived";
    }
    else
    {
        echo "bad request";
    }

?>
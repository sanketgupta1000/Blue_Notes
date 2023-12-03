<?php

    //will handle ajax request to bin a note here
    require_once "./../../helpers/config.php";
    session_start();
    require_once "./../../helpers/helper.php";
    sessionExpCheck();

    require_once "./../helpers/helper.php";

    if(isset($_POST["noteid"]))
    {
        //good request
        updateNote($_POST["noteid"], 0, 0, 1);
    }
    else
    {
        echo "bad request";
    }

?>
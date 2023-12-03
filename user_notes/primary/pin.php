<?php

    //will handle ajax request to pin a note here
    require_once "./../../helpers/config.php";
    session_start();
    require_once "./../../helpers/helper.php";
    sessionExpCheck();

    require_once "./../helpers/helper.php";

    if(isset($_POST["noteid"]))
    {
        //good request
        updateNote($_POST["noteid"], 1, 0, 0);
    }
    else
    {
        echo "bad request";
    }

?>
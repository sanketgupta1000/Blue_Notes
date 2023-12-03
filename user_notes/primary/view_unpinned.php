<?php
    //will respond to ajax call to load notes here

    require_once "./../../helpers/config.php";
    session_start();
    require_once "./../../helpers/helper.php";
    sessionExpCheck();
    require_once "./../helpers/helper.php";

    if(isset($_POST["limit"])&&isset($_POST["offset"]))
    {
        //good request

        echo json_encode(fetchNotes($_POST["limit"], $_POST["offset"], 0, 0, 0));
    }
    else
    {
        //bad request
        echo "bad request";
    }
?>
<?php
    //will respond to ajax call to load notes here

    require_once "./../../helpers/config.php";
    session_start();
    require_once "./../../helpers/helper.php";
    sessionExpCheck();

    if(isset($_POST["limit"])&&isset($_POST["offset"]))
    {
        //good request

        //query string
        $sql = "select * from user_notes where user_id=? limit ? offset ?;";

        //prepare statement
        $stmt = mysqli_prepare($link, $sql);

        //bind parameters
        mysqli_stmt_bind_param($stmt, "iii", $param_user_id, $param_limit, $param_offset);

        //set parameters
        $param_user_id = $_SESSION["user_id"];
        $param_limit = $_POST["limit"];
        $param_offset = $_POST["offset"];

        //execute
        mysqli_execute($stmt);

        //getting result
        $result = mysqli_stmt_get_result($stmt);

        //getting result as array of notes
        $notesArr = mysqli_fetch_all($result, MYSQLI_ASSOC);

        //sending response back
        echo json_encode($notesArr);
    }
    else
    {
        //bad request
        echo "bad request";
    }
?>
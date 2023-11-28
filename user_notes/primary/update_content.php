<?php

    //will handle ajax requests for updating note content here

    require_once "./../../../helpers/config.php";
    session_start();
    require_once "./../../../helpers/helper.php";
    sessionExpCheck();

    if(isset($_POST["note_id"])&&isset($_POST["content"]))
    {
        //now will update note title if it belongs to current user

        //query string
        $sql = "update user_notes set note_content=? where note_id=? and user_id=?;";

        //prepare statement
        $stmt = mysqli_prepare($link, $sql);

        //bind parameters
        mysqli_stmt_bind_param($stmt, "sii", $param_note_content, $param_note_id, $param_user_id);

        //set parameters
        $param_note_content = $_POST["content"];
        $param_note_id = $_POST["note_id"];
        $param_user_id =  $_SESSION["user_id"];

        //execute
        mysqli_execute($stmt);
        echo "{}";
    }
    else
    {
        echo "bad request";
    }

?>
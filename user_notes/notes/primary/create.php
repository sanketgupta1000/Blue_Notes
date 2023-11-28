<?php

    //this page will create a new note for the current user and echo the note id as json

    require_once "./../../../helpers/config.php";
    session_start();
    require_once "./../../../helpers/helper.php";
    sessionExpCheck();

    //query string
    $sql = "insert into user_notes (user_id) values (?)";

    //prepare statement
    $stmt = mysqli_prepare($link, $sql);

    //bind parameters
    mysqli_stmt_bind_param($stmt, "i", $param_user_id);

    //set parameters
    $param_user_id = $_SESSION["user_id"];

    //execute
    mysqli_execute($stmt);

    //getting the auto generated note id
    $note_id = mysqli_insert_id($link);

    //echoing the result
    $response = [];
    $response["note_id"] = $note_id;
    echo json_encode($response);
?>
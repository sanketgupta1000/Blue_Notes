<?php

    //checking if session running at all
    session_start();
    require_once "./../../helpers/helper.php";
    sessionExpCheck();

    //destroying session and redirecting to user_account.php
    session_unset();
    session_destroy();
    header("Location: /blue_notes/user_account/user_account.php?login");

?>
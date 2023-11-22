<?php
// will contain utility functions for checking if user is logged in or not

    //function to check if user is already logged in
    function sessionRunningCheck()
    {
        if(isset($_SESSION["user_id"]))
        {
            //session already running
            header("Location: /blue_notes/user_notes/notes/primary/primary.php");
            exit;
        }
    }

    //function to check if session expired
    function sessionExpCheck()
    {
        if(!isset($_SESSION["user_id"]))
        {
            header("Location: /blue_notes/user_account/user_account.php?sessExp&login");
            exit;
            // echo $_SESSION["user_id"];
        }
    }

?>
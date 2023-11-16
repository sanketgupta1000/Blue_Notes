<?php

    require "./helpers/helper.php";
    require_once "./../helpers/config.php";

    session_start();

    // echo $_POST;
    // echo $_SESSION;
    if(isset($_POST["otp"]) && isset($_SESSION["otp"]))
    {
        if(otpVerify($_POST["otp"]))
        {
            //otp verified. now will insert into database

            //declaring query string
            $sql = "insert into user_details (user_email, user_password, user_salt) values (?, ?, ?);";

            //prepare statement
            $stmt = mysqli_prepare($link, $sql);

            if($stmt===false)
            {
                //cannot properly communicate with the database
                //sending response back
                echo '{"badDatabaseConn": true}';
                exit;
            }

            //bind parameters
            if(mysqli_stmt_bind_param($stmt,"sss", $param_email, $param_pass, $param_salt)===false)
            {
                //cannot properly communicate with the database
                //sending response back
                echo '{"badDatabaseConn": true}';
                exit;
            }

            //setting parameters
            $param_email = $_SESSION["email"];
            $param_pass = $_SESSION["password"];
            $param_salt = $_SESSION["salt"];

            //executing
            if(mysqli_stmt_execute($stmt)===false)
            {
                //cannot properly communicate with the database
                //sending response back
                echo '{"badDatabaseConn": true}';
                exit;
            }

            //sending response back
            echo '{"validity": true}';
        }
        else
        {
            //invalid otp
            echo '{"validity": false}';
        }
    }
    else
    {
        //bad request
        //sending response back
        echo '{"badRequest": true}';
    }

?>
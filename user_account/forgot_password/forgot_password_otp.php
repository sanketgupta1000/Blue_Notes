<?php

    require_once "./../../helpers/config.php";
    require_once "./../helpers/helper.php";

    session_start();

    if(isset($_POST["otp"])&&isset($_SESSION["otp"]))
    {
        //good request
        if(otpVerify($_POST["otp"]))
        {
            //verified
            $_SESSION["forgotPassOTPVerified"] = true;
            echo '{"validity": true}';
        }
        else
        {
            //false otp
            echo '{"validity": false}';
        }
    }
    else
    {
        //bad request
        echo '{"badRequest": true}';
        exit;
    }

?>
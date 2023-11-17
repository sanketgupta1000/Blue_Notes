<?php

    require_once "./../../helpers/config.php";
    require_once "./../helpers/helper.php";

    if(isset($_POST["email"]))
    {
        //good request
        //filtering and sanitizing email
        $email = filter_input(INPUT_POST,"email", FILTER_SANITIZE_EMAIL);
        
        //validating email
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);

        if($email===false)
        {
            //invalid email
            echo '{"validity": false}';
            exit;
        }

        //now will check if email present in database or not

        //query string
        $sql = "select * from user_details where user_email=?";

        //prepare statement
        $stmt = mysqli_prepare($link, $sql);

        if($stmt===false)
        {
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //bind parameter
        if(mysqli_stmt_bind_param($stmt, "s", $param_email)===false)
        {
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //set parameter
        $param_email = $email;

        //execute
        if(mysqli_stmt_execute($stmt)===false)
        {
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //getting result
        $result = mysqli_stmt_get_result($stmt);

        if(mysqli_num_rows($result)==0)
        {
            //email not found
            echo '{"validity": false}';
            exit;
        }

        //email found
        
        //sending otp on email
        try
        {
            $otp = sendOTP($email, "OTP for password reset: ", ".");
        }
        catch(Exception $e)
        {
            echo '{"mailServiceDown": true}';
            exit;
        }

        //storing in session
        session_start();
        $_SESSION["email"] = $email;
        $_SESSION["otp"] = $otp;

        echo '{"validity": true}';
    }
    else
    {
        //bad request
        echo '{"badRequest": true}';
        exit;
    }

?>
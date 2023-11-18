<?php

    require_once "./../../helpers/config.php";

    session_start();

    if(isset($_POST["newpassword"]) && isset($_POST["confirmpassword"]) && isset($_SESSION["email"]) && isset($_SESSION["forgotPassOTPVerified"]) && $_SESSION["forgotPassOTPVerified"]===true)
    {
        //good request

        if($_POST["newpassword"]!=$_POST["confirmpassword"])
        {
            //not match
            echo '{"validity": false}';
            exit;
        }

        //match

        //resetting
        $_SESSION["forgotPassOTPVerified"] = false;
        //now will update password

        //generating new salt
        $salt = bin2hex(random_bytes(16));

        //combining with password
        $password = $_POST["newpassword"].$salt;

        //hashing
        $password = password_hash($password, PASSWORD_BCRYPT);

        $email = $_SESSION["email"];

        //query string
        $sql = "update user_details set user_password=?, user_salt=? where user_email=?;";

        //prepare statement
        if(($stmt = mysqli_prepare($link, $sql))===false)
        {
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //bind parameters
        if((mysqli_stmt_bind_param($stmt, 'sss', $param_password, $param_salt, $param_email))===false)
        {
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //set parameters
        $param_password = $password;
        $param_salt = $salt;
        $param_email = $email;

        //executing
        if(mysqli_stmt_execute($stmt)===false)
        {
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //successfully reset password
        //sending response back
        echo '{"validity": true}';
    }
    else
    {
        //bad request
        echo '{"badRequest": true}';
    }

?>
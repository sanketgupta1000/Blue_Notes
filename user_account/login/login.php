<?php

    require_once "./../../helpers/config.php";

    if(isset($_POST["email"]) && isset($_POST["password"]))
    {
        //good request
        //filtering and sanitizing email
        $email = filter_input(INPUT_POST,"email", FILTER_SANITIZE_EMAIL);
        
        //validating email
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);

        //getting hashed password
        $password = $_POST["password"];

        //response object
        $response["validity"] = true;

        if($email===false)
        {
            //invalid email
            echo '{"validity": false}';
            exit;
        }

        //now matching credentials

        //declaring query string
        $sql = "select * from user_details where user_email=?;";

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
        if(mysqli_stmt_bind_param($stmt,"s", $param_email)===false)
        {
            //cannot properly communicate with the database
            //sending response back
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //setting parameters
        $param_email = $email;

        //executing
        if(mysqli_stmt_execute($stmt)===false)
        {
            //cannot properly communicate with the database
            //sending response back
            echo '{"badDatabaseConn": true}';
            exit;
        }

        //getting result
        $result = mysqli_stmt_get_result($stmt);

        if(mysqli_num_rows($result)== 0)
        {
            //account not found
            echo '{"validity": false}';
            exit;
        }

        //getting result as array
        $arr = mysqli_fetch_assoc($result);

        //now will match passwords
        if(password_verify($password.$arr['user_salt'], $arr['user_password']))
        {
            //valid
            //will set session variables here
            session_start();
            $_SESSION["user_id"] = $arr['user_id'];
            echo json_encode($response);
            exit;
        }
        else
        {
            //invalid
            echo '{"validity": false}';
            exit;
        }
    }
    else
    {
        //bad request
        echo '{"validity": false}';
        exit;
    }

?>
<?php

    require_once "./../../helpers/config.php";
    require_once "./../helpers/helper.php";

    if(isset($_POST["email"])&&isset($_POST["password"])&&isset($_POST["confirmpassword"]))
    {
        //filtering and sanitizing email
        $email = filter_input(INPUT_POST,"email", FILTER_SANITIZE_EMAIL);
        
        //validating email
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);

        //getting hashed passwords
        $password = $_POST["password"];
        $confirmpassword = $_POST["confirmpassword"];

        //making response object
        $response["validity"] = true;

        //now validating
        if($email===false)
        {
            $response["validity"] = false;
            $response["invalidSignupEmail"] = true;
        }

        if($password!=$confirmpassword)
        {
            $response["validity"] = false;
            $response["invalidSignupConfirmPass"] = true;
        }

        if($response["validity"])
        {
            //all good input, now must check if email is available or not

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

            if(mysqli_num_rows($result)>0)
            {
                //1 row selected, means email already registered
                $response["validity"] = false;
                $response["emailTaken"] = true;

                //sending response
                echo json_encode($response);
                exit;
            }
            else
            {
                //email available

                //now will salt the password and again hash it for increased security
                
                //sale generation
                $salt = bin2hex(random_bytes(16));

                //combining with password
                $password = $password.$salt;

                //hashing
                $password = password_hash($password, PASSWORD_BCRYPT);
                

                try
                {
                    //calling helper function to send otp
                    $otp = sendOTP($param_email, "OTP for signing up: ", ". Thank you for choosing Blue Notes.");
    
                }
                catch(Exception $e)
                {
                    //error while sending mail
                    //sending response back
                    echo '{"mailServiceDown": true}';
                    exit;
                }
                
                //now will store necessary details into session
                session_start();
                $_SESSION["email"] = $param_email;
                $_SESSION["password"] = $password;
                $_SESSION["salt"] = $salt;
                $_SESSION["otp"] = $otp;

                //now sending response back
                echo '{"validity": true}';
            }
        }
        else
        {
            //errorneous input
            //will send the response back
            echo json_encode($response);
        }
    }
    else
    {
        //bad request to backend
        //will send response back
        echo '{"badRequest": true}';
    }
?>
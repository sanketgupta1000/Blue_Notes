<?php
    // session_start();
    //will include utility functions here

    //function to send otp
    //including php mailer for sending otp
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\OAuth;
    use League\OAuth2\Client\Provider\Google;
    //these paths are w.r.t. the file(s) that will include this file (helper.php)
    //this is because this file won't be executed independently at all
    //helper.php will only be included, and hence, the current working directory is not this helpers folder
    require './../../vendor/autoload.php';

    //setting accurate time for phpmailer
    date_default_timezone_set("Etc/UTC");   

    function sendOTP($email, $textBeforeOTP, $textAfterOTP)
    {
        //generating an otp
        $otp = random_int(100000,999999);

        //making mail object
        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->SMTPDebug = SMTP::DEBUG_OFF;
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->SMTPAuth = true;
        $mail->AuthType = "XOAUTH2";

        $clientId = "918636159012-6k5tc5e17jpgr8imraqo2e8e4getn8eb.apps.googleusercontent.com";
        $clientSecret = "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";
        $refreshToken = "1//0gwkuD99zjut2CgYIARAAGBASNwF-L9Ir-lX_aapW9BCXPHsKEd9c7jb6ZtWnCn7-gAjyNqQAW2watIvU8PhrgrcO0Za6suZX19w";
        $senderEmail = "bluenotesteam@gmail.com";

        //oauth2 provider object
        $provider = new Google
        (
            [
                'clientId' => $clientId,
                'clientSecret'=> $clientSecret,
            ]
        );

        //pass the provider object to phpmailer object
        $mail->setOAuth
        (
            new OAuth
            (
                [
                    'provider' => $provider,
                    'clientId' => $clientId,
                    'clientSecret' => $clientSecret,
                    'refreshToken' => $refreshToken,
                    'userName' => $senderEmail,
                ]
            )
        );

        $mail->setFrom($senderEmail, 'Blue Notes');
        $mail->addAddress($email);
        $mail->Subject = 'Blue Notes OTP Verification';
        $mail->msgHTML($textBeforeOTP.$otp.$textAfterOTP);
        
        //sending
        $mail->send();

        //returning
        return $otp;
    }

    //function to validate otp, if set
    function otpVerify($otp)
    {
        return $_SESSION["otp"]==$otp;
    }

?>
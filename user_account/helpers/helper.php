<?php
    // session_start();
    //will include utility functions here

    //function to validate otp, if set
    function otpVerify($otp)
    {
        return $_SESSION["otp"]==$otp;
    }

?>
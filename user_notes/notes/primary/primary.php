<?php
    session_start();
    require_once "./../../../helpers/helper.php";
    sessionExpCheck();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blue Notes | Primary</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
    <!-- Google Fonts Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" />
    <!-- MDB -->
    <link rel="stylesheet" href="/blue_notes/mdb/css/mdb.min.css" />
    <!-- favicon -->
    <link rel="shortcut icon" href="/blue_notes/images/favicon.ico" type="image/x-icon">
</head>

<body>

    <header>
        <!-- navbar -->
        <?php
            include "./../helpers/navbar.php";
        ?>
    </header>


    <!-- MDB -->
    <script src="/blue_notes/mdb/js/mdb.min.js"></script>
    <!-- custom script -->
    <script src="/blue_notes/user_notes/notes/helpers/helper.js"></script>
    <script>
        // showing primary as active
        showActive("primaryLink");
    </script>
</body>

</html>
<?php
    session_start();
    require_once "./../../helpers/helper.php";
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
    <!-- navbar css -->
    <link rel="stylesheet" href="/blue_notes/user_notes/helpers/navbar.css">

    <!-- custom css -->
    <link rel="stylesheet" href="primary.css">
</head>

<body>

    <header>
        <!-- navbar -->
        <?php
            include "./../helpers/navbar.html";
        ?>
    </header>

    <!-- main container -->
    <main>

        <!-- now creating "Make a new note" call to action -->
        <!-- container for it -->
        <div class="d-flex justify-content-center my-3 my-md-4 my-lg-5">

            <div class="hover-shadow border rounded-pill ps-4 py-2 py-md-3" id="makeNoteDiv">Take a new note</div>

        </div>

        <!-- note container -->
        <div class="container" id="noteContainer">

            <div class="row gy-4" data-masonry='{"percentPosition": true }' id="noteContainerRow"></div>

        </div>

    </main>

    <!-- making a modal for allowing editing of note -->
    <div class="aside">

        <!-- including modal -->
        <?php include "./../helpers/modal.html"; ?>

    </div>


    <!-- MDB -->
    <script src="/blue_notes/mdb/js/mdb.min.js"></script>
    <!-- masonry -->
    <script src="/blue_notes/masonry/masonry.pkgd.min.js"></script>
    <!-- custom script -->
    <script src="/blue_notes/user_notes/helpers/helper.js"></script>
    <script>
        // showing primary as active
        showActive("primaryLink");
    </script>
    <script src="/blue_notes/user_notes/helpers/classes.js"></script>
    <script src="primary.js"></script>
</body>

</html>
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
    <!-- google icons -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

    <!-- custom css -->
    <link rel="stylesheet" href="./../helpers/helper.css">
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

        <!-- note container for pinned notes-->
        <div class="container notes-container mb-3 mb-md-4 mb-lg-5" id="pinnedNotesContainer">

            <div class="row">
                <div class="col-12">
                    <h6 class="text-secondary">Pinned</h6>
                </div>
            </div>

            <div class="row gy-4" id="pinnedNotesContainerRow"></div>

        </div>

        <!-- note container for unpinned notes-->
        <div class="container notes-container mb-3 mb-md-4 mb-lg-5" id="unpinnedNotesContainer">

            <div class="row">
                <div class="col-12">
                    <h6 class="text-secondary">Others</h6>
                </div>
            </div>

            <div class="row gy-4" id="unpinnedNotesContainerRow"></div>

        </div>

    </main>

    <!-- making a modal for allowing editing of note -->
    <aside>

        <!-- including modal -->
        <?php include "./../helpers/modal.html"; ?>

    </aside>


    <!-- MDB -->
    <script src="/blue_notes/mdb/js/mdb.min.js"></script>
    <!-- masonry -->
    <script src="/blue_notes/masonry/masonry.pkgd.min.js"></script>
    <!-- custom script -->
    <script src="/blue_notes/user_notes/helpers/classes.js"></script>
    <script src="/blue_notes/user_notes/helpers/helper.js"></script>
    <script>
        // showing primary as active
        showActive("primaryLink");
        </script>
    <script src="primary.js"></script>
    <script src="/blue_notes/user_notes/helpers/modal_edit.js"></script>
</body>

</html>
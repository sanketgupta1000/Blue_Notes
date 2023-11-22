<nav class="navbar navbar-light navbar-expand-md">

    <!-- container wrappeer -->
    <div class="container">
        <!-- toggle btn -->
        <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <i class="fas fa-bars"></i>
        </button>

        <!-- wrapper for collapsible content -->
        <div class="navbar-collapse collapse" id="navbarSupportedContent">

            <!-- brand logo -->
            <a href="/blue_notes/user_notes/notes/primary/primary.php" class="navbar-brand my-3 my-md-0">
                <i class="far fa-note-sticky fa-lg text-primary"></i>
            </a>

            <!-- links -->
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                
                <li class="nav-item">
                    <a id="primaryLink" href="/blue_notes/user_notes/notes/primary/primary.php" class="nav-link fw-bold">Primary</a>
                </li>
                <li class="nav-item">
                    <a id="archiveLink" href="/blue_notes/user_notes/notes/archive/archive.php" class="nav-link fw-bold">Archive</a>
                </li>

            </ul>

        </div>

        <!-- right links wrapper -->
        <div class="d-flex align-items-center">

            <!-- dropdown for bin -->
            <div class="dropdown me-4">
                <button class="btn btn-tertiary dropdown-toggle text-secondary" type="button" id="dropdownMenuButton" aria-expanded="false" style="" data-mdb-toggle="dropdown" data-mdb-target="dropdownList"></button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownList">
                    <li>
                        <a class="dropdown-item" href="/blue_notes/user_notes/notes/bin/bin.php">Bin</a>
                    </li>
                </ul>
            </div>

            <!-- logout icon -->
            <a href="/blue_notes/user_account/logout/logout.php" class="me-3">
                <i class="fas fa-right-from-bracket fa-lg text-secondary"></i>
            </a>

        </div>

    </div>

</nav>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blue Notes | Login, Sign Up</title>

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

    <!-- header for logo -->
    <header class="mt-4 mt-lg-5 mb-0 mb-sm-3 mb-md-5 mb-lg-7 mb-xl-9">

        <h1 class="text-center text-primary">
            <i class="far fa-note-sticky"></i>
            Blue Notes
        </h1>

    </header>
    
    <main>
        <!--Section for login and sign up container -->
        <section>
            <div class="container">
                <div class="row">
                    <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto shadow-4 rounded-4 p-4">
                        
                        <!-- tab list -->
                        <ul class="nav nav-tabs nav-justified mb-4" id="accountTabs" role="tablist">

                            <li class="nav-item" role="presentation">
                                <a
                                class="nav-link<?php if(isset($_GET["signup"])) echo " active"; ?>"
                                id="signupTab"
                                data-mdb-toggle="tab"
                                href="#signupPane"
                                aria-controls="signup"
                                aria-selected="<?php if(isset($_GET["signup"])) echo "true"; else echo "false"; ?>"
                                role="tab"
                                >
                                    Sign Up
                                </a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a
                                class="nav-link<?php if(isset($_GET["login"])) echo " active"; ?>"
                                id="loginTab"
                                data-mdb-toggle="tab"
                                href="#loginPane"
                                aria-controls="login"
                                aria-selected="<?php if(isset($_GET["login"])) echo "true"; else echo "false"; ?>"
                                role="tab"
                                >
                                    Login
                                </a>
                            </li>

                        </ul>

                        <!-- tab content -->
                        <div class="tab-content">

                            <!-- sign up panel -->
                            <form
                            class="tab-pane fade<?php if(isset($_GET["signup"])) echo " show active"; ?>"
                            id="signupPane"
                            role="tabpanel"
                            aria-labelledby="signupTab"
                            novalidate
                            >

                                <div class="row gy-3 gy-md-4">

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="email" id="signupEmail" name="email" class="form-control" required>
                                            <label for="signupEmail" class="form-label">Email</label>
                                            <div class="invalid-feedback" id="invalid-signupEmail">Please enter valid email</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="password" id="signupPass" name="password" class="form-control" required>
                                            <label for="signupPass" class="form-label">Password</label>
                                            <div class="invalid-feedback" id="empty-signupPass">Please enter password</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="password" id="signupConfirmPass" name="confirmpassword" class="form-control" required>
                                            <label for="signupConfirmPass" class="form-label">Confirm Password</label>
                                            <div class="invalid-feedback" id="empty-signupConfirmPass">Please enter valid confirm password</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary w-100" id="signupBtn">Sign Up</button>
                                    </div>

                                </div>

                            </form>

                            <!-- login panel -->
                            <form
                            class="tab-pane fade<?php if(isset($_GET["login"])) echo " show active"; ?>"
                            id="loginPane"
                            role="tabpanel"
                            aria-labelledby="loginTab"
                            novalidate
                            >

                                <div class="row gy-3 gy-md-4">

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="email" id="loginEmail" name="email" class="form-control" required>
                                            <label for="loginEmail" class="form-label">Email</label>
                                            <div class="invalid-feedback" id="invalid-loginEmail">Please enter valid email</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="password" id="loginPass" name="password" class="form-control" required>
                                            <label for="loginPass" class="form-label">Password</label>
                                            <div class="invalid-feedback" id="empty-loginPass">Please enter password</div>
                                        </div>
                                    </div>

                                    <div class="col mt-0">
                                        <button type="submit" class="btn btn-link p-0">Forgot Password?</button>
                                    </div>

                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary w-100" id="loginBtn">Login</button>
                                    </div>

                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <!-- MDB -->
    <script src="/blue_notes/mdb/js/mdb.min.js"></script>

    <!-- validation -->
    <script src="user_account.js"></script>
</body>
</html>
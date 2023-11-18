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

    <!-- custom css -->
    <style>
        #loading-spinner
        {
            z-index: 1056;
            background-color: rgb(0 0 0 / 20%);
        }
    </style>
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
                                class="nav-link
                                    <?php
                                        //if the page is accessed with 'signup' in get parameter, signup button will be active
                                        if(isset($_GET["signup"]))
                                        {
                                            echo " active";
                                        }
                                    ?>"
                                id="signupTab"
                                data-mdb-toggle="tab"
                                href="#signupPane"
                                aria-controls="signup"
                                aria-selected="
                                    <?php
                                        if(isset($_GET["signup"]))
                                        {
                                            //if the page is accessed with 'signup' in get parameter, signup button will be active
                                            echo "true";
                                        }
                                        else
                                        {
                                            echo "false";
                                        }
                                    ?>"
                                role="tab"
                                >
                                    Sign Up
                                </a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a
                                class="nav-link
                                    <?php
                                        //if the page is accessed with 'login' in get parameter, login button will be active
                                        if(isset($_GET["login"]))
                                        {
                                        echo " active";
                                        }
                                    ?>"
                                id="loginTab"
                                data-mdb-toggle="tab"
                                href="#loginPane"
                                aria-controls="login"
                                aria-selected="
                                    <?php
                                        if(isset($_GET["login"]))
                                        {
                                            //if the page is accessed with 'login' in get parameter, login button will be active
                                            echo "true";
                                        }
                                        else
                                        {
                                            echo "false";
                                        }
                                    ?>"
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
                            class="tab-pane fade
                                <?php
                                    //if the page is accessed with 'signup' in get parameter, signup pane will be active
                                    if(isset($_GET["signup"]))
                                    {
                                        echo " show active";
                                    }
                                ?>"
                            id="signupPane"
                            role="tabpanel"
                            aria-labelledby="signupTab"
                            novalidate
                            >

                                <div class="row gy-3 gy-md-4">

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="email" id="signupEmail" name="email" required class="form-control">
                                            <label for="signupEmail" class="form-label">Email</label>
                                            <div class="invalid-feedback" id="invalid-signupEmail">Please enter valid email</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="password" id="signupPass" name="password" required class="form-control">
                                            <label for="signupPass" class="form-label">Password</label>
                                            <div class="invalid-feedback" id="empty-signupPass">Please enter password</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="password" id="signupConfirmPass" name="confirmpassword" required class="form-control">
                                            <label for="signupConfirmPass" class="form-label">Confirm Password</label>
                                            <div class="invalid-feedback" id="invalid-signupConfirmPass">Please enter valid confirm password</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary w-100" id="signupBtn">Sign Up</button>
                                    </div>

                                </div>

                            </form>

                            <!-- login panel -->
                            <form
                            class="tab-pane fade
                                <?php
                                    //if the page is accessed with 'login' in get parameter, login pane will be active
                                    if(isset($_GET["login"]))
                                    {
                                        echo " show active";
                                    }
                                ?>"
                            id="loginPane"
                            role="tabpanel"
                            aria-labelledby="loginTab"
                            novalidate
                            >

                                <div class="row gy-3 gy-md-4">

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="email" id="loginEmail" name="email" required class="form-control">
                                            <label for="loginEmail" class="form-label">Email</label>
                                            <div class="invalid-feedback" id="invalid-loginEmail">Please enter valid email</div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-outline">
                                            <input type="password" id="loginPass" name="password" required class="form-control">
                                            <label for="loginPass" class="form-label">Password</label>
                                            <div class="invalid-feedback" id="empty-loginPass">Please enter password</div>
                                        </div>
                                    </div>

                                    <div class="col mt-0">
                                        <a class="btn btn-tertiary p-0" id="forgotPassBtn">Forgot Password?</a>
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

    <!-- aside for modals and spinners -->
    <aside>

        <!-- modal for email verification -->
        <div
            class="modal fade"
            id="verifyEmailModal"
            data-mdb-backdrop="static"
            data-mdb-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
            aria-labelledby="verifyEmailModalTitle"
        >

            <div class="modal-dialog modal-dialog-centered">

                <div class="modal-content">

                    <div class="modal-header">

                        <h5 class="modal-title" id="verifyEmailModalTitle">
                            Verify Email
                        </h5>

                        <!-- this button will toggle between this and another modal which will ask if the user really wants to cancel email verification -->
                        <button class="btn-close" data-mdb-dismiss="modal" aria-label="Close" data-mdb-toggle="modal" data-mdb-target="#confirmCancelModal"></button>

                    </div>

                    <div class="modal-body">

                        <form class="container" novalidate>

                            <div class="row gy-3 text-center">

                                <div class="col-12">
                                    Enter OTP sent to your mail:
                                </div>
                                <div class="col-4 col-md-12 mx-auto">

                                    <div class="form-outline">

                                        <input type="text" class="form-control" id="otp">
                                        <label for="otp" class="form-label">OTP</label>
                                        <div class="invalid-feedback" id="invalidOTP">Invalid OTP</div>
                                    </div>

                                </div>

                                <div class="col-12">

                                    <input type="submit" value="Submit" class="btn btn-primary" id="verifyBtn">

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

        <!-- modal for confirm cancel -->
        <div
            class="modal fade"
            id="confirmCancelModal"
            data-mdb-backdrop="static"
            data-mdb-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
            aria-labelledby="confirmCancelModalTitle"
        >

            <div class="modal-dialog modal-dialog-centered modal-sm">

                <div class="modal-content">

                    <div class="modal-header">

                        <div class="modal-title" id="confirmCancelModalTitle">
                            Do you really want to cancel?
                        </div>

                    </div>

                    <div class="modal-footer">


                        <!-- button which toggles between the two modal -->
                        <button
                            class="btn btn-outline-primary"
                            id="modalToggleBtn"
                            data-mdb-ripple-color="dark"
                            data-mdb-dismiss="modal"
                            data-mdb-toggle="modal"
                            data-mdb-target="#verifyEmailModal"
                        >
                            No
                        </button>

                        <button
                            class="btn btn-danger"
                            data-mdb-dismiss="modal"
                        >
                            Yes
                        </button>

                    </div>

                </div>

            </div>

        </div>

        <!-- modal for reset password -->
        <div
            class="modal fade"
            id="resetPassModal"
            data-mdb-backdrop="static"
            data-mdb-keyboard="false"
            tabindex="-1"
            aria-hidden="true"
            aria-labelledby="resetPassModalTitle"
        >

            <div class="modal-dialog modal-dialog-centered">

                <div class="modal-content">

                    <div class="modal-header">

                        <div class="modal-title" id="resetPassModalTitle">
                            Reset Password
                        </div>

                        <!-- button to toggle between this and confirm cancel modal -->
                        <button class="btn-close" data-mdb-dismiss="modal" data-mdb-toggle="modal" data-mdb-target="#confirmCancelModal" aria-label="Close"></button>

                    </div>

                    <div class="modal-body">

                        <form class="container" id="resetPassForm">

                            <div class="row gy-3 text-center">

                                <div class="col-12">
                                    <div class="form-outline">
                                        <input type="text" class="form-control" id="newPass">
                                        <label for="newPass" class="form-label">New Password</label>
                                        <div class="invalid-feedback" id="emptyNewPass">Please enter new password</div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="form-outline">
                                        <input type="text" class="form-control" id="newPassConfirm">
                                        <label for="newPassConfirm" class="form-label">Confirm New Password</label>
                                        <div class="invalid-feedback" id="emptyNewPass">Please enter valid confirm password</div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <input type="submit" value="Confirm" class="btn btn-primary" id="resetPassBtn">
                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

        <!-- spinner for showing loading -->
        <div class="
            vw-100
            vh-100
            position-fixed
            top-0
            d-flex
            justify-content-center
            align-items-center
            d-none"
            id="loading-spinner"
        >
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </aside>
    
    <!-- MDB -->
    <script src="/blue_notes/mdb/js/mdb.min.js"></script>

    <!-- validation -->
    <script src="helpers/helper.js"></script>
    <script src="user_account_validation.js"></script>
    <script src="user_account_ajax.js"></script>
</body>
</html>
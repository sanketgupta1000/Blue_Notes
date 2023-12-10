# Blue_Notes

A Notes App created with Material Design Bootstrap, Masonry JS, PHP

## Live Demo

[Blue Notes](https://bluenotes123.000webhostapp.com/)

## How to set it up locally?

1. Clone this repo in your local computer
2. Install the following dependencies:

- MDB: download MDB for bootstrap 5 and place all files in mdb/ directory in the repo
- Masonry: download masonry js by Desandro, and place the min.js/.js file in masonry/ directory
- PHPMailer: run 'composer require phpmailer/phpmailer'
- OAuth2 Libraries: run 'composer require league/oauth2-google'
- phpdotenv: run 'composer require vlucas/phpdotenv'

3. Next, you need to create a oauth2 client for your gmail account to get the credentials for otp service: [Reference](https://github.com/PHPMailer/PHPMailer/wiki/Using-Gmail-with-XOAUTH2)
4. After you have obtained clientid, clientsecret, and token, add those in a .env file in your repo
5. Also edit your email in the user_acccount/helpers/helper.php file
6. Done!

# Login

Login example using Firebase as backend and token handling.


## Firebase configuration
- Go to https://firebase.google.com/ and create a new project.
- Open the project and go to Authentication / Sign-in method and enable the Email and password option as the provider.
- Go to https://firebase.google.com/docs/reference/rest/auth#section-create-email-password where the Rest services for Firebase authentication are located.
- Open the Sign up with email/password and Sign in email/password services and copy both endpoints to the application's AuthService.
- Go to the Firebase project configuration, copy the web API key (token) and add it to the AuthService service in apiKey variable.
- At https://console.firebase.google.com/project/login-a76d2/authentication/users you can see the users who have logged into the app.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

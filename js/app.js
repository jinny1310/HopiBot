function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email.length < 4) {
        alert("Please use 8-10 characters ");
        return;
    }
    if (password.length < 4) {
        alert("Please use 8-10 characters");
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
}
window.onload = function () {
    initApp();
}
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        //รอบ 2
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
        });
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

function initApp() {
    //ตรวจสอบและรับข้อมูลผู้ใช้
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById('quickstart-verify-email').disabled = true;
        //LOGIN
        if (user) {
            //ลงชื่อเข้าใช้กรณีที่ sign up เรียบร้อยแล้ว
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, ' ');
            if (!emailVerified) {
                document.getElementById('quickstart-verify-email').disabled = false;
            }
        }
        else {
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });
}

function sendMail() {
    firebase.auth().currentUser.sendEmailVerification().then(function () {
        alert('Email Verification Sent!');
    });
}

function resetPass() {
    var email = document.getElementById('email').value;
    firebase.auth().sendPasswordResetEmail(email).then(function(){
        alert('Password Reset Email Sent!');
    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/invalid-email'){
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found'){
            alert(errorMessage);
        }
        console.log(error);
    })
}
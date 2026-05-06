/*
   Program name: patient-form2.js
   Author: Jacob Richard Estrada
   Date created: 02/26/2026
   Date last edited: 03/30/2026
   Version: 3.7
   Description: Homework 2 - Javascript to confirm and review popup 
*/
 
// set dob
window.onload = function() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    if (mm < 10) { mm = "0" + mm; }
    if (dd < 10) { dd = "0" + dd; }
    var maxDate = yyyy + "-" + mm + "-" + dd;
    var minDate = (yyyy - 120) + "-" + mm + "-" + dd;
    document.getElementById("dob").max = maxDate;
    document.getElementById("dob").min = minDate;
 
    // slider live value 
    var slider = document.getElementById("health");
    var output = document.getElementById("healthDisplay");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
    }
}
 
// check first name 
function checkFirstName() {
    var x = document.getElementById("firstName").value;
    var msg = document.getElementById("firstName_msg");
    if (x == "") {
        msg.innerHTML = "First name is required";
        msg.style.color = "red";
    } else {
        msg.innerHTML = "";
    }
}
 
// check last name
function checkLastName() {
    var x = document.getElementById("lastName").value;
    var msg = document.getElementById("lastName_msg");
    if (x == "") {
        msg.innerHTML = "Last name is required";
        msg.style.color = "red";
    } else {
        msg.innerHTML = "";
    }
}
 
// check dob
function checkDOB() {
    var x = document.getElementById("dob").value;
    var msg = document.getElementById("dob_msg");
    if (x == "") {
        msg.innerHTML = "Date of birth is required";
        msg.style.color = "red";
    } else {
        var dobDate = new Date(x);
        var now = new Date();
        var oldestOk = new Date();
        oldestOk.setFullYear(now.getFullYear() - 120);
        if (dobDate > now) {
            msg.innerHTML = "Cannot be in the future";
            msg.style.color = "red";
        } else if (dobDate < oldestOk) {
            msg.innerHTML = "Cannot be more than 120 years ago";
            msg.style.color = "red";
        } else {
            msg.innerHTML = "";
        }
    }
}
 
// check phone
function checkPhone() {
    var x = document.getElementById("phone").value;
    var msg = document.getElementById("phone_msg");
    if (x == "") {
        msg.innerHTML = "";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(x)) {
        msg.innerHTML = "Format must be ###-###-####";
        msg.style.color = "red";
    } else {
        msg.innerHTML = "";
    }
}
 
// check password
function checkPassword() {
    var x = document.getElementById("pwd").value;
    var msg = document.getElementById("pwd_msg");
    if (x == "") {
        msg.innerHTML = "Password is required";
        msg.style.color = "red";
    } else if (x.length < 8) {
        msg.innerHTML = "At least 8 characters required";
        msg.style.color = "red";
    } else {
        msg.innerHTML = "";
    }
}
 
// convert userid to lowercase
function lowerCaseId() {
    var x = document.getElementById("userId").value;
    document.getElementById("userId").value = x.toLowerCase();
}
 
// password match
function checkPasswords() {
    var p1 = document.getElementById("pwd").value;
    var p2 = document.getElementById("pwd2").value;
    var msg = document.getElementById("pwd2_msg");
    if (p2.length > 0) {
        if (p1 != p2) {
            msg.innerHTML = "Passwords do not match";
            msg.style.color = "red";
        } else {
            msg.innerHTML = "Passwords match";
            msg.style.color = "green";
        }
    } else {
        msg.innerHTML = "";
    }
}
 
// opens popup 
function reviewData() {
    var formcontents = document.getElementById("patientForm");
    var formoutput;
    var i;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var addr1 = document.getElementById("addr1").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var userId = document.getElementById("userId").value;
    var pwd = document.getElementById("pwd").value;
    var pwd2 = document.getElementById("pwd2").value;
   
    // truncate zip
    var zipShort = zip.substring(0, 5);
 
    // check dob 2
    var dobErr = "";
    if (dob == "") {
        dobErr = "ERROR: Required";
    } else {
        var dobDate = new Date(dob);
        var now = new Date();
        var oldestOk = new Date();
        oldestOk.setFullYear(now.getFullYear() - 120);
        if (dobDate > now) {
            dobErr = "ERROR: Cannot be in the future";
        } else if (dobDate < oldestOk) {
            dobErr = "ERROR: Cannot be more than 120 years ago";
        }
    }
 
    // check userid 2
    var idErr = "";
    if (userId == "") {
        idErr = "ERROR: Required";
    } else if (!/^[a-zA-Z][a-zA-Z0-9_\-]{4,29}$/.test(userId)) {
        idErr = "ERROR: 5-30 chars, start with a letter, no spaces";
    }
 
    // check password 2
    var pwdErr = "";
    if (pwd == "") {
        pwdErr = "ERROR: Required";
    } else if (pwd.length < 8) {
        pwdErr = "ERROR: At least 8 characters required";
    } else if (pwd != pwd2) {
        pwdErr = "ERROR: Passwords do not match";
    } else if (userId.length > 0 && pwd.toLowerCase().indexOf(userId.toLowerCase()) != -1) {
        pwdErr = "ERROR: Password cannot contain your User ID";
    } else if (firstName.length > 0 && pwd.toLowerCase().indexOf(firstName.toLowerCase()) != -1) {
        pwdErr = "ERROR: Password cannot contain your first name";
    }
 
    // get illnesses
    var illnessList = "";
    for (i = 0; i < formcontents.length; i++) {
        if (formcontents.elements[i].name == "illnesses" && formcontents.elements[i].checked) {
            if (illnessList != "") { illnessList = illnessList + ", "; }
            illnessList = illnessList + formcontents.elements[i].value;
        }
    }
    if (illnessList == "") { illnessList = "None"; }
   
    // get radio button
    var gender = "(not selected)";
    var vaccinated = "(not selected)";
    var insurance = "(not selected)";
    for (i = 0; i < formcontents.length; i++) {
        if (formcontents.elements[i].type == "radio" && formcontents.elements[i].checked) {
            if (formcontents.elements[i].name == "gender")     { gender = formcontents.elements[i].value; }
            if (formcontents.elements[i].name == "vaccinated") { vaccinated = formcontents.elements[i].value; }
            if (formcontents.elements[i].name == "insurance")  { insurance = formcontents.elements[i].value; }
        }
    }
 
   // popup review window
formoutput = "<html><head><title>Review Form</title></head><body>";
formoutput = formoutput + "<h2>PLEASE REVIEW THIS INFORMATION</h2>";

formoutput = formoutput + "<table border='1' cellpadding='6' cellspacing='0'>";
formoutput = formoutput + "<tr><th>Field</th><th>Value</th></tr>";

formoutput = formoutput + "<tr><td>Name</td><td>" + firstName + " " +
  document.getElementById("middleInitial").value + " " + lastName + "</td></tr>";

formoutput = formoutput + "<tr><td>Date of Birth</td><td>" + dob + "</td></tr>";
formoutput = formoutput + "<tr><td>Email</td><td>" + email + "</td></tr>";
formoutput = formoutput + "<tr><td>Phone</td><td>" + document.getElementById("phone").value + "</td></tr>";
formoutput = formoutput + "<tr><td>SSN</td><td>***-**-****</td></tr>";

formoutput = formoutput + "<tr><td>Address</td><td>" + addr1 + "<br>";
if (document.getElementById("addr2").value != "") {
  formoutput = formoutput + document.getElementById("addr2").value + "<br>";
}
formoutput = formoutput + city + ", " + state + " " + zipShort + "</td></tr>";

formoutput = formoutput + "<tr><td>User ID</td><td>" + userId + "</td></tr>";
formoutput = formoutput + "<tr><td>Password</td><td>********</td></tr>";

formoutput = formoutput + "<tr><td>Gender</td><td>" + gender + "</td></tr>";
formoutput = formoutput + "<tr><td>Vaccinated</td><td>" + vaccinated + "</td></tr>";
formoutput = formoutput + "<tr><td>Insurance</td><td>" + insurance + "</td></tr>";
formoutput = formoutput + "<tr><td>Wellness Level</td><td>" +
  document.getElementById("health").value + " / 10</td></tr>";

formoutput = formoutput + "<tr><td>Past Illnesses</td><td>" + illnessList + "</td></tr>";
formoutput = formoutput + "<tr><td>Symptoms</td><td>" +
  document.getElementById("symptoms").value + "</td></tr>";

formoutput = formoutput + "</table><br>";

formoutput = formoutput + "<button onclick='window.close()'>Go Back and Edit</button>";

formoutput = formoutput + "</body></html>";

var popup = window.open("", "ReviewWindow", "width=700,height=600,scrollbars=yes");
popup.document.write(formoutput);
popup.document.close();
}

*
   Program name: patient-form2.js
   Author: Jacob Richard Estrada
   Date created: 03/20/2026
   Date last edited: 03/29/2026
   Version: 6.0
   Description: Homework 2 - validation and review popup for patient form
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
 
// check first name when user leaves field
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
 
// check last name when user leaves field
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
 
// check dob when user leaves field
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
 
// check phone when user leaves field
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
 
// check password when user leaves field
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
 
// check if passwords match while typing
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
 
// opens popup window with all the form data reviewed
function reviewData() {
    var formcontents = document.getElementById("patientForm");
    var formoutput;
    var datatype;
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
   
    // truncate zip to 5
    var zipShort = zip.substring(0, 5);
 
    // check dob
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
 
    // check userid
    var idErr = "";
    if (userId == "") {
        idErr = "ERROR: Required";
    } else if (!/^[a-zA-Z][a-zA-Z0-9_\-]{4,29}$/.test(userId)) {
        idErr = "ERROR: 5-30 chars, start with a letter, no spaces";
    }
 
    // check password
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
 
    // get illnesses that were checked
    var illnessList = "";
    for (i = 0; i < formcontents.length; i++) {
        if (formcontents.elements[i].name == "illnesses" && formcontents.elements[i].checked) {
            if (illnessList != "") { illnessList = illnessList + ", "; }
            illnessList = illnessList + formcontents.elements[i].value;
        }
    }
    if (illnessList == "") { illnessList = "None"; }
   
    // get radio button values
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
 
    // popup html 
    formoutput = "<html><head><title>Please Review</title>";
    formoutput = formoutput + "<style>";
    formoutput = formoutput + "body { font-family: Arial, Helvetica, sans-serif; background: white; margin: 20px; }";
    formoutput = formoutput + "h2 { text-align: center; color: #004080; border-bottom: 2px solid #0b2a4a; padding-bottom: 8px; }";
    formoutput = formoutput + "table { width: 90%; margin: 0 auto; border-collapse: collapse; }";
    formoutput = formoutput + "th { background-color: #0b2a4a; color: white; padding: 8px; text-align: left; }";
    formoutput = formoutput + "td { padding: 6px 10px; border-bottom: 1px solid #ccc; vertical-align: top; }";
    formoutput = formoutput + "td.lbl { font-weight: bold; color: #004080; width: 30%; text-align: right; }";
    formoutput = formoutput + "td.sec { background-color: #e0e8f0; font-weight: bold; color: #004080; }";
    formoutput = formoutput + ".pass { color: green; }";
    formoutput = formoutput + ".err { color: red; }";
    formoutput = formoutput + ".btns { text-align: center; margin-top: 20px; }";
    formoutput = formoutput + "button { padding: 10px 20px; margin: 5px; font-weight: bold; border: none; border-radius: 4px; cursor: pointer; }";
    formoutput = formoutput + ".sbtn { background-color: #0066cc; color: white; }";
    formoutput = formoutput + ".cbtn { background-color: #ccc; color: black; }";
    formoutput = formoutput + "</style></head><body>";
    formoutput = formoutput + "<h2>PLEASE REVIEW THIS INFORMATION</h2>";
    formoutput = formoutput + "<table>";
    formoutput = formoutput + "<tr><th>Field</th><th>Value</th><th>Status</th></tr>";
 
    // personal
    formoutput = formoutput + "<tr><td colspan='3' class='sec'>Personal Information</td></tr>";
    var nameVal = firstName + " " + document.getElementById("middleInitial").value + " " + lastName;
    var nameErr = (firstName == "" || lastName == "") ? "ERROR: Required" : "pass";
    formoutput = formoutput + "<tr><td class='lbl'>Name</td><td>" + nameVal + "</td>";
    formoutput = formoutput + "<td class='" + (nameErr == "pass" ? "pass" : "err") + "'>" + nameErr + "</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Date of Birth</td><td>" + (dob != "" ? dob : "(not entered)") + "</td>";
    formoutput = formoutput + "<td class='" + (dobErr == "" ? "pass" : "err") + "'>" + (dobErr == "" ? "pass" : dobErr) + "</td></tr>";
 
    // contact
    formoutput = formoutput + "<tr><td colspan='3' class='sec'>Contact &amp; Verification</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Email</td><td>" + (email != "" ? email : "(not entered)") + "</td>";
    formoutput = formoutput + "<td class='" + (email != "" ? "pass" : "err") + "'>" + (email != "" ? "pass" : "ERROR: Required") + "</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Phone</td><td>" + document.getElementById("phone").value + "</td>";
    formoutput = formoutput + "<td class='pass'>pass</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>SSN</td><td>***-**-****</td>";
    formoutput = formoutput + "<td class='pass'>pass</td></tr>";
 
    // address
    formoutput = formoutput + "<tr><td colspan='3' class='sec'>Address</td></tr>";
    var addr2 = document.getElementById("addr2").value;
    var addrFull = addr1;
    if (addr2 != "") { addrFull = addrFull + "<br>" + addr2; }
    addrFull = addrFull + "<br>" + city + ", " + state + " " + zipShort;
    var addrErr = (addr1 == "" || city == "" || state == "" || zipShort == "") ? "ERROR: Missing info" : "pass";
    formoutput = formoutput + "<tr><td class='lbl'>Address</td><td>" + addrFull + "</td>";
    formoutput = formoutput + "<td class='" + (addrErr == "pass" ? "pass" : "err") + "'>" + addrErr + "</td></tr>";
 
    // account
    formoutput = formoutput + "<tr><td colspan='3' class='sec'>Account Creation</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>User ID</td><td>" + (userId != "" ? userId : "(not entered)") + "</td>";
    formoutput = formoutput + "<td class='" + (idErr == "" ? "pass" : "err") + "'>" + (idErr == "" ? "pass" : idErr) + "</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Password</td><td>" + (pwd != "" ? "********" : "(not entered)") + "</td>";
    formoutput = formoutput + "<td class='" + (pwdErr == "" ? "pass" : "err") + "'>" + (pwdErr == "" ? "pass" : pwdErr) + "</td></tr>";
 
    // health
    formoutput = formoutput + "<tr><td colspan='3' class='sec'>Health &amp; Insurance</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Gender</td><td>" + gender + "</td><td class='pass'>pass</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Vaccinated</td><td>" + vaccinated + "</td><td class='pass'>pass</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Insurance</td><td>" + insurance + "</td><td class='pass'>pass</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Wellness Level</td><td>" + document.getElementById("health").value + " / 10</td><td class='pass'>pass</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Past Illnesses</td><td>" + illnessList + "</td><td class='pass'>pass</td></tr>";
    formoutput = formoutput + "<tr><td class='lbl'>Symptoms</td><td>" + document.getElementById("symptoms").value + "</td><td class='pass'>pass</td></tr>";
 
    formoutput = formoutput + "</table>";
    formoutput = formoutput + "<div class='btns'>";
    formoutput = formoutput + "<button class='sbtn' onclick='window.opener.document.getElementById(\"patientForm\").submit(); window.close();'>SUBMIT</button>";
    formoutput = formoutput + "<button class='cbtn' onclick='window.close();'>Go Back and Edit</button>";
    formoutput = formoutput + "</div>";
    formoutput = formoutput + "</body></html>";
 
    var popup = window.open("", "ReviewWindow", "width=740,height=640,scrollbars=yes,resizable=yes");
    popup.document.write(formoutput);
    popup.document.close();
}

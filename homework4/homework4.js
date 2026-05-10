/*
   Program name: homework4.js
   Author: Jacob Richard Estrada
   Date created: 4/14/2026
   Date last edited: 4/21/2026
   Version: 4.2
   Description: Homework 4 - Javascript to confirm and review popup 
AI Credits:
- Used AI assistance: Claude/ChatGPT for some regex checking, window popup form contatenation and Fetch/cookie examples on 5/4/2026.
*/
// fields to save
var saveFields = [
    "firstName", "middleInitial", "lastName", "dob",
    "email", "phone",
    "addr1", "addr2", "city", "state", "zip",
    "userId",
    "health", "symptoms"
];
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
 
    // slider live value, 
    var slider = document.getElementById("health");
    var output = document.getElementById("healthDisplay");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
    }
   
   loadStates();
   startSessionTimer();
   checkCookie();
   var form = document.getElementById("patientForm");
    form.addEventListener("change", saveAllFields);
    form.addEventListener("blur", saveAllFields, true);
}
 
// check first name
function checkFirstName() {
    var x = document.getElementById("firstName").value;
    var msg = document.getElementById("firstName_msg");
    if (x == "") {
        msg.innerHTML = "First name is required";
        msg.style.color = "red";
        return false;
    }
     if (!/^[A-Za-z'\- ]{1,30}$/.test(x)) {
        msg.innerHTML = "Letters, apostrophes, dashes only";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
   //check mi 
 function checkMI() {
    var x = document.getElementById("middleInitial").value;
    var msg = document.getElementById("middleInitial_msg");
    if (x == "") {
        msg.innerHTML = "";
        return true;
    }
    if (!/^[A-Za-z]$/.test(x)) {
        msg.innerHTML = "One letter only";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
// check last name
function checkLastName() {
    var x = document.getElementById("lastName").value;
    var msg = document.getElementById("lastName_msg");
    if (x == "") {
        msg.innerHTML = "Last name is required";
        msg.style.color = "red";
        return false;
    }
    if (!/^[A-Za-z'\- ]{2,30}$/.test(x)) {
        msg.innerHTML = "2-30 letters, apostrophes, dashes only";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
 
// check dob
function checkDOB() {
    var x = document.getElementById("dob").value;
    var msg = document.getElementById("dob_msg");
    if (x == "") {
        msg.innerHTML = "Date of birth is required";
        msg.style.color = "red";
        return false;
    }
    var dobDate = new Date(x);
    var now = new Date();
    var oldestOk = new Date();
    oldestOk.setFullYear(now.getFullYear() - 120);
    if (dobDate > now) {
        msg.innerHTML = "Cannot be in the future";
        msg.style.color = "red";
        return false;
    }
    if (dobDate < oldestOk) {
        msg.innerHTML = "Cannot be more than 120 years ago";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
   //check email
 function checkEmail() {
    var box = document.getElementById("email");
    box.value = box.value.toLowerCase();
    var x = box.value;
    var msg = document.getElementById("email_msg");
    if (x == "") {
        msg.innerHTML = "Email is required";
        msg.style.color = "red";
        return false;
    }
    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(x)) {
        msg.innerHTML = "Format: name@domain.tld";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
// check phone 
function checkPhone() {
    var x = document.getElementById("phone").value;
    var msg = document.getElementById("phone_msg");
    if (x == "") {
        msg.innerHTML = "";
        return true;
    }
    if (!/^\d{3}-\d{3}-\d{4}$/.test(x)) {
        msg.innerHTML = "Format must be ###-###-####";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
 function formatSSN() {
    var box = document.getElementById("ssn");
    var x = box.value.replace(/\D/g, "");
    if (x.length > 9) { x = x.substring(0, 9); }
    var out = x;
    if (x.length > 5) {
        out = x.substring(0, 3) + "-" + x.substring(3, 5) + "-" + x.substring(5);
    } else if (x.length > 3) {
        out = x.substring(0, 3) + "-" + x.substring(3);
    }
    box.value = out;
}
//ssn format
function checkSSN() {
    var x = document.getElementById("ssn").value;
    var msg = document.getElementById("ssn_msg");
    if (x == "") {
        msg.innerHTML = "SSN is required";
        msg.style.color = "red";
        return false;
    }
    if (!/^\d{3}-\d{2}-\d{4}$/.test(x)) {
        msg.innerHTML = "Must be 9 digits";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
//adress check 
   function checkAddr1() {
    var x = document.getElementById("addr1").value;
    var msg = document.getElementById("addr1_msg");
    if (x == "") {
        msg.innerHTML = "Address is required";
        msg.style.color = "red";
        return false;
    }
    if (x.length < 2 || x.length > 30) {
        msg.innerHTML = "Must be 2 to 30 characters";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}

function checkAddr2() {
    var x = document.getElementById("addr2").value;
    var msg = document.getElementById("addr2_msg");
    if (x == "") {
        msg.innerHTML = "";
        return true;
    }
    if (x.length < 2 || x.length > 30) {
        msg.innerHTML = "Must be 2 to 30 characters";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}

function checkCity() {
    var x = document.getElementById("city").value;
    var msg = document.getElementById("city_msg");
    if (x == "") {
        msg.innerHTML = "City is required";
        msg.style.color = "red";
        return false;
    }
    if (!/^[A-Za-z .'\-]{2,30}$/.test(x)) {
        msg.innerHTML = "2-30 letters only";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}

function checkState() {
    var x = document.getElementById("state").value;
    var msg = document.getElementById("state_msg");
    if (x == "") {
        msg.innerHTML = "Please select a state";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}

function checkZip() {
    var x = document.getElementById("zip").value;
    var msg = document.getElementById("zip_msg");
    if (x == "") {
        msg.innerHTML = "ZIP is required";
        msg.style.color = "red";
        return false;
    }
    if (!/^\d{5}$/.test(x)) {
        msg.innerHTML = "Must be 5 digits";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}  
   //check user id 
   function checkUserId() {
    var x = document.getElementById("userId").value;
    var msg = document.getElementById("userId_msg");
    if (x == "") {
        msg.innerHTML = "User ID is required";
        msg.style.color = "red";
        return false;
    }
    if (/^[0-9]/.test(x)) {
        msg.innerHTML = "Cannot start with a number";
        msg.style.color = "red";
        return false;
    }
    if (x.length < 5 || x.length > 20) {
        msg.innerHTML = "Must be 5 to 20 characters";
        msg.style.color = "red";
        return false;
    }
    if (!/^[A-Za-z][A-Za-z0-9_\-]*$/.test(x)) {
        msg.innerHTML = "Letters, numbers, _ and - only";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "";
    return true;
}
   
// check password
function checkPassword() {
    var x = document.getElementById("pwd").value;
    var userId = document.getElementById("userId").value;
    var msg = document.getElementById("pwd_msg");
    if (x == "") {
        msg.innerHTML = "Password is required";
        msg.style.color = "red";
        return false;
    }
    if (x.length < 8) {
        msg.innerHTML = "At least 8 characters";
        msg.style.color = "red";
        return false;
    }
    if (!/[A-Z]/.test(x)) {
        msg.innerHTML = "Need at least 1 uppercase letter";
        msg.style.color = "red";
        return false;
    }
    if (!/[a-z]/.test(x)) {
        msg.innerHTML = "Need at least 1 lowercase letter";
        msg.style.color = "red";
        return false;
    }
    if (!/[0-9]/.test(x)) {
        msg.innerHTML = "Need at least 1 digit";
        msg.style.color = "red";
        return false;
    }
    if (userId != "" && x.toLowerCase() == userId.toLowerCase()) {
        msg.innerHTML = "Password cannot equal your User ID";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "Password OK";
    msg.style.color = "green";
    checkPasswords();
    return true;
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
    if (p2 == "") {
        msg.innerHTML = "Please re-enter your password";
        msg.style.color = "red";
        return false;
    }
    if (p1 != p2) {
        msg.innerHTML = "Passwords do not match";
        msg.style.color = "red";
        return false;
    }
    msg.innerHTML = "Passwords match";
    msg.style.color = "green";
    return true;
}
 //validate 
function validateAll() {
    var errors = 0;
    if (!checkFirstName()) { errors++; }
    if (!checkMI()) { errors++; }
    if (!checkLastName()) { errors++; }
    if (!checkDOB()) { errors++; }
    if (!checkEmail()) { errors++; }
    if (!checkPhone()) { errors++; }
    if (!checkSSN()) { errors++; }
    if (!checkAddr1()) { errors++; }
    if (!checkAddr2()) { errors++; }
    if (!checkCity()) { errors++; }
    if (!checkState()) { errors++; }
    if (!checkZip()) { errors++; }
    if (!checkUserId()) { errors++; }
    if (!checkPassword()) { errors++; }
    if (!checkPasswords()) { errors++; }
 
    var status = document.getElementById("validateStatus");
    var submitBtn = document.getElementById("submitBtn");
    if (errors == 0) {
        status.innerHTML = "All fields OK. You can submit now.";
        status.style.color = "green";
        submitBtn.style.display = "inline-block";
    } else {
        status.innerHTML = "Please fix " + errors + " error(s) above.";
        status.style.color = "red";
        submitBtn.style.display = "none";
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
    } else if (!/^[a-zA-Z][a-zA-Z0-9_\-]{4,19}$/.test(userId)) {
        idErr = "ERROR: 5-20 chars, start with a letter, no spaces";
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
 
    // popup html and css
    formoutput = "<html><head><title>Please Review</title>";
    formoutput = formoutput + "<style>";
    formoutput = formoutput + "body { font-family: Arial, Helvetica, sans-serif; background: white; margin: 20px; }";
    formoutput = formoutput + "h2 { text-align: center; }";
    formoutput = formoutput + "table { width: 90%; margin: 0 auto; border-collapse: collapse; }";
    formoutput = formoutput + "th { background-color: #0b2a4a; color: white; padding: 8px; }";
    formoutput = formoutput + "td { padding: 6px 10px; border-bottom: 1px solid #ccc; vertical-align: top; }";
    formoutput = formoutput + ".pass { color: green; }";
    formoutput = formoutput + ".err { color: red; }";
    formoutput = formoutput + ".btns { text-align: center; margin-top: 20px; }";
    formoutput = formoutput + "button { padding: 10px 20px; margin: 5px; font-weight: bold; border: none; cursor: pointer; }";
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

    // check phone 2
    var phoneVal = document.getElementById("phone").value;
    var phoneErr = "";
    if (phoneVal != "" && !/^\d{3}-\d{3}-\d{4}$/.test(phoneVal)) {
        phoneErr = "ERROR: Format must be ###-###-####";
    }
    formoutput = formoutput + "<tr><td class='lbl'>Phone</td><td>" + (phoneVal != "" ? phoneVal : "(not entered)") + "</td>";
    formoutput = formoutput + "<td class='" + (phoneErr == "" ? "pass" : "err") + "'>" + (phoneErr == "" ? "pass" : phoneErr) + "</td></tr>";

    // check ssn 2
    var ssnVal = document.getElementById("ssn").value;
    var ssnErr = "";
    if (ssnVal == "") {
        ssnErr = "ERROR: Required";
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(ssnVal)) {
        ssnErr = "ERROR: Must be 9 digits";}
    formoutput = formoutput + "<tr><td class='lbl'>SSN</td><td>" + (ssnVal != "" ? "***-**-****" : "(not entered)") + "</td>";
    formoutput = formoutput + "<td class='" + (ssnErr == "" ? "pass" : "err") + "'>" + (ssnErr == "" ? "pass" : ssnErr) + "</td></tr>";
 
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
    formoutput = formoutput + "<button class='cbtn' onclick='window.close();'>Go Back and Edit</button>";
    formoutput = formoutput + "</div>";
    formoutput = formoutput + "</body></html>";
 
    var popup = window.open("", "ReviewWindow", "width=740,height=640,scrollbars=yes,resizable=yes");
    popup.document.write(formoutput);
    popup.document.close();
}

//fetch api
async function loadStates() {
   try { var resp = await fetch("states.xml");
   if (!resp.ok) {
   throw new Error("Could not load states.xml");
   }

   var text = await resp.text();
   var parser = new DOMParser();
   var xml = parser.parseFromString(text, "text/xml");
   var nodes = xml.getElementsByTagName("state");
   var sel = document.getElementById("state");

   var html = "<option value=''></option>";

   for (var i = 0; i < nodes.length; i++) {
       var code = nodes[i].getAttribute("code");
      var name = nodes[i].textContent;
      html = html + "<option value='" + code + "'>" + name + "</option>";
      }

   sel.innerHTML = html;

// restore saved state after the options load
   var savedState = localStorage.getItem("state");
   if (savedState) {
   sel.value = savedState;
   }

} catch (err) {
   console.log("Fetch error: " + err.message);
   document.getElementById("state").innerHTML =
      "<option value=''>Could not load states</option>";
    }
}
// session timer
var sessionSeconds = 0;
function startSessionTimer() {
    setInterval(function() {
        sessionSeconds++;
        var mins = Math.floor(sessionSeconds / 60);
        var secs = sessionSeconds % 60;
        if (secs < 10) { secs = "0" + secs; }
        document.getElementById("sessionTimer").innerHTML =
            "Session: " + mins + ":" + secs;
    }, 1000);
}

// make user fill name first
function enforceOrder() {
    var fName = document.getElementById("firstName").value;
    var lName = document.getElementById("lastName").value;
    if (fName == "" || lName == "") {
        alert("Please enter your name before creating a User ID.");
        document.getElementById("firstName").focus();
        return false;
    }
    return true;
}

// set cookie
function setCookie(cname, cvalue, hours) {
    var d = new Date();
    d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// delete cookie
function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// check if returning user
function checkCookie() {
    var fname = getCookie("fname");
    var welcome = document.getElementById("welcomeMsg");
    if (fname != "") {
        var msg = "Welcome back " + fname + ".\nPress OK to confirm or Cancel if this isn't " + fname + ".";
        if (confirm(msg)) {
            welcome.innerHTML = "Welcome back, " + fname + "!";
            document.getElementById("firstName").value = fname;
            loadFromStorage();
        } else {
            // not them - wipe and start over
            deleteCookie("fname");
            clearStorage();
            document.getElementById("patientForm").reset();
            welcome.innerHTML = "Hello, new user! Welcome to Gulfstone Medical.";
        }
    } else {
        welcome.innerHTML = "Hello, new user! Welcome to Gulfstone Medical.";
    }
}
// remember me checkbox
function rememberToggle() {
    var rm = document.getElementById("rememberMe");
    if (rm.checked) {
        var fname = document.getElementById("firstName").value;
        if (fname != "") {
            setCookie("fname", fname, 48);
        }
        saveAllFields();
    } else {
        // user unchecked it - wipe everything
        deleteCookie("fname");
        clearStorage();
    }
}

// check remember me
function isRememberOn() {
    var rm = document.getElementById("rememberMe");
    if (rm == null) { return false; }
    return rm.checked;
}
// save form data
function saveAllFields() {
    if (!isRememberOn()) { return; }
    // text/select fields
    for (var i = 0; i < saveFields.length; i++) {
        var el = document.getElementById(saveFields[i]);
        if (el) {
            localStorage.setItem(saveFields[i], el.value);
        }
    }

    var fname = document.getElementById("firstName").value;

    if (fname != "") {
        setCookie("fname", fname, 48);
    }
}
function loadFromStorage() {
    for (var i = 0; i < saveFields.length; i++) {
        var val = localStorage.getItem(saveFields[i]);
        var el = document.getElementById(saveFields[i]);
        if (el && val != null && val != "") {
            el.value = val;
        }
    }
    // update slider display after restoring
    var slider = document.getElementById("health");
    document.getElementById("healthDisplay").innerHTML = slider.value;
}

// clear local storage
function clearStorage() {
    for (var i = 0; i < saveFields.length; i++) {
        localStorage.removeItem(saveFields[i]);
    }
}

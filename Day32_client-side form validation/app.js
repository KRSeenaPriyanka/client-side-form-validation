var form = document.querySelector('form')
var inputField = document.querySelectorAll('.input')
var nameFields = document.querySelectorAll('.nameField')
var userName = document.querySelector("#username")
var email = document.querySelector("#email")
var pass = document.querySelectorAll('.pass')
var password = document.querySelector('#password')
var confirmPass = document.querySelector('#confirmPass')
var showHideEye = document.querySelectorAll('.showHide i')
var showHide = document.querySelectorAll('.showHide')
var resetBtn = document.querySelector('.reset')
let userNameVal;


pass.forEach(passField => {
    passField.onkeyup = () => {
        let eyeBtn = passField.nextElementSibling
        let userData = passField.value 
        if(userData.trim() != 0){
            eyeBtn.style.display = "block"
        }
        else{
            eyeBtn.style.display = "none"
        }
    }
})

showHideEye.forEach(eyeBtn => {
    eyeBtn.addEventListener('click', () => {
        let pass = eyeBtn.parentElement.previousElementSibling
        if(pass.type == "password"){
            pass.setAttribute('type', 'text')
            eyeBtn.classList.remove('fa-eye')
            eyeBtn.classList.add('fa-eye-slash')
        }
        else{
            pass.setAttribute('type', 'password')
            eyeBtn.classList.add('fa-eye')
            eyeBtn.classList.remove('fa-eye-slash')
        }
    })
})


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    validForm()
})


function clearForm(){
    let form_control = document.querySelectorAll(".form_control")
    form_control.forEach(inputBox => {
        inputField.forEach(input => {
            input.value = ""
        })
        inputBox.classList.remove('success')
        inputBox.classList.remove('error')

        showHide.forEach(eyeBtn => {
            eyeBtn.style.display = "none"
        })
    })
}

function sendDate(sRate, count){
    if(sRate == count){
        swal("Welcome! " + userNameVal, "Registration Successfull", "success")
        clearForm()
    }
}

function completeMsg(){
    let formControl = document.getElementsByClassName("form_control")
    var count = formControl.length - 1
    for(let i = 0; i < formControl.length; i++){
        if(formControl[i].className == "form_control success"){
            let sRate = 0 + i
            sendDate(sRate, count)
            
        }else{
            return false
        }
    }
}


function isEmail(emailVal){
    var atSymbol = emailVal.indexOf("@")
    if(atSymbol < 4) return false
    var dot = emailVal.lastIndexOf('.' + "com")
    if(dot <= atSymbol + 5) return false
    if(dot == emailVal.length - 1) return false
    return true
}


var nameRegex = /^[a-zA-Z\s]+$/
var userNameRegex = /^[a-zA-Z\-0-9\s]+$/



function validForm(){

    userNameVal = userName.value.trim()
    let emailVal = email.value.trim()
    let passwordVal = password.value.trim()
    let confirmPassVal = confirmPass.value.trim()

    nameFields.forEach(namefield => {

        // validation of name field
        let val = namefield.value.trim()
        if(val === ""){
            setErrorMsg(namefield, "Name cannot be blank")
        }
        else if(nameRegex.test(val) === false){
            setErrorMsg(namefield, "Please Enter a Valid Name")
        }
        else if(val.length < 3){
            setErrorMsg(namefield, "Name must be contained at least 3 characters")
        }
        else{
            setSuccessMsg(namefield)
        }



        // validation of username field.
        if(userNameVal === ""){
            setErrorMsg(userName, "Username cannot be blank")
        }
        else if(userNameRegex.test(userNameVal) === false){
            setErrorMsg(userName, "Please Enter a Valid username")
        }
        else if(userNameVal.length < 3){
            setErrorMsg(userName, "username must be contained at least 3 characters")
        }
        else{
            setSuccessMsg(userName)
        }



        // Email Validation
        if(emailVal == ""){
            setErrorMsg(email, "Email cannot be blank")
        }
        else if(!isEmail(emailVal)){
            setErrorMsg(email, "Not a valid Email")
        }
        else{
            setSuccessMsg(email)
        }




        // password validation
        if(passwordVal == ""){
            setErrorMsg(password, "Password cannot be blank")
        }
        else if(passwordVal.length < 6){
            setErrorMsg(password, "Password must be at least 6 digit")
        }
        else{
            setSuccessMsg(password)
        }



        //confirmPass validation
        if(confirmPassVal == ""){
            setErrorMsg(confirmPass, "Confirm Password cannot be blank")
        }
        else if(passwordVal != confirmPassVal){
            setErrorMsg(confirmPass, 'Password is not matching')
        }
        else{
            setSuccessMsg(confirmPass)
        }

        completeMsg()

        function setErrorMsg(input, errorMsg){
            const formControl = input.parentElement
            const small = formControl.querySelector('small')
            formControl.className = "form_control error"
            small.innerText = errorMsg
        }

        function setSuccessMsg(input){
            const formControl = input.parentElement
            formControl.className = "form_control success"
        }
    })
}


resetBtn.addEventListener('click', ()=> {
    clearForm()
})
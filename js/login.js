const user_email = document.getElementById("loginEmail");
const user_password = document.getElementById("loginPassword");
const submit = document.getElementById("submit");
const loginMessage = document.getElementById("loginMessage");


loginMessage.style.display = "none"

const MyToken = JSON.parse(sessionStorage.getItem("token"))
if (MyToken){
    location = "index.html"
}

submit.addEventListener("click", (event)=>{
    event.preventDefault();
    loginMessage.style.display = "block";

    loginMessage.innerHTML = `<img src="../img/Spinner.gif" alt="Loading..." width="50px" height="50px">`

    login();
});

function login(){
    const data = {
        email: user_email.value,
        password: user_password.value
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("http://localhost:5000/login/loginUser", sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)
    
        if (fetchedData.invalidEmail){
            loginMessage.style.color = "red"
            loginMessage.innerHTML = fetchedData.invalidEmail
        }

        else if (fetchedData.invalidPassword){
            loginMessage.style.color = "red"
            loginMessage.innerHTML = fetchedData.invalidPassword
        }

        else if (fetchedData.successMessage){

            sessionStorage.setItem("token", JSON.stringify(fetchedData.Access_Token))
            location = "index.html"
        }

        else{
            loginMessage.style.color = "red"
            loginMessage.innerHTML = fetchedData.errorMessage
        }

    })

}

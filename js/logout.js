function preNavLogoutUser(){
    sessionStorage.removeItem("token")
    location = "mainPage.html"
  }

const Token = JSON.parse(sessionStorage.getItem("token"))
  if (!Token){
      location = "mainPage.html"
  }
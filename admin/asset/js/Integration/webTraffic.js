
const countUsers = document.getElementById("countUsers")
const countPosts = document.getElementById("countPosts")
var counterContainer = document.querySelector("#website-counter");
const countTraffic = document.getElementById("countTraffic")

async function users(){
    document.title = "Loading..."
    countUsers.innerHTML = `<img src="../../../img/spinner.gif" alt="" width="40px">`
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }
// Registered Users
  let response = await fetch("https://tuberculosis-detection-system.cyclic.app/register/getRegisteredUsers", getData)
  const fetchedData = await response.json()
  document.title = "Tuberculosis Detection System | Dashboard"
    const users = fetchedData.RegisteredUsers;

    countUsers.innerHTML = users.length;
   
}



users()
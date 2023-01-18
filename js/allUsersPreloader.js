const allusers_preloader = document.getElementById("allusers_preloader")
function showAssignRoleLoader(){
    allusers_preloader.classList.add("show")
    document.title = "Loading..."
}
showAssignRoleLoader()
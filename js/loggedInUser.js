const preNavLogin = document.getElementById("preNavLogin");

async function loggedInUser(){
    
    const preNavToken = sessionStorage.getItem("token")
    if(preNavToken){
        preNavLogin.innerHTML = `<img src="../../../img/spinner.gif" alt="" width="40px">`
    }

    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

  let response = await fetch("https://tuberculosis-detection-system.cyclic.app/login/loggedInUser", getData)
  const fetchedData = await response.json()
  console.log(fetchedData)


   




  const addProfile = document.getElementById("addProfile");
  addProfile.innerHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <title>Document</title>



      <style>
          
        div.profilePicture img{
            width: 50px; 
            border-radius: 50%; 
            cursor: pointer; 
        }
        
        div.profilePictureIn img{
            width: 100px; 
            border-radius: 50%; 
            cursor: pointer; 
        }
        
        div.userProfile{
            position: fixed;
            background-image: url(../img/background4.jpg);
            background-position: center;
            border-radius: 10px;
            z-index: 3;
            top: 77px;
            right: 120px;
            text-align: center;
            padding-top: 20px;
            color: white;
            height: auto;
            width: 300px;
            border: 1px solid white;
        }
        
        a.ManageAccountLink{
            text-decoration: none;
            border: 2px solid white;
            padding: 7px;
            border-radius: 10px;
            color: white;
            background: black;
        }

        a.ManageAccountLink:hover{
            background: #cba10a;
        }

        div.profilePicture{
            background: black;
            color: #13C5DD;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            line-height: 50px;
            font-weight: bold;
            font-size: 18px;
            cursor: pointer;
            text-align: center;
            margin-left: 100px;
        }

        img.topProfileImage{
            border: 1px solid black;
            width: 35px;
            border-radius: 50%;
            cursor: pointer;
            text-align: center;
        }

        img.inProfileImage{
            border: 1px solid black;
            width: 70px;
            border-radius: 50%;
            cursor: pointer;
            text-align: center; 
        }

        div.profilePictureIn{
            background: black;
            color: #13C5DD;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-left: 110px;
            line-height: 80px;
            font-weight: bold;
            font-size: 30px;
            cursor: pointer;
        }


        p.userFetchedEmail{
            margin-top: -15px;
            margin-bottom: 50px;
        }

        div.switchAccount{
            border-top: 1px solid white;
            padding-top: 20px;
            
        }

        p.switchAccountLink{ 
            padding: 7px; 
            border-radius: 5px; 
            cursor: pointer; 
            background: black;
            font-size: 1.2em;
          }
          
          p.switchAccountLink:hover{
            background: white;
            color: black;
          }

        h3.names{
            color: white;
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 10px;
        }



      </style>
  </head>
  <body>
      <div class="profilePicture" id="profilePicture">
        ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
      </div>
      <img src="https://tuberculosis-detection-system.cyclic.app/images/${fetchedData.imageLink}" class="topProfileImage" id="topProfileImage" alt="">

          
      <div class="userProfile" id="userProfile">
          <div class="profilePictureIn" id="profilePictureIn">
          ${fetchedData.firstName.charAt(0)}${fetchedData.lastName.charAt(0)}
          </div>
          <img src="https://tuberculosis-detection-system.cyclic.app/images/${fetchedData.imageLink}" class="inProfileImage" id="inProfileImage" alt="">
          <br>
          <h3 class="names">${fetchedData.firstName} ${fetchedData.lastName}</h3>
          <p class="userFetchedEmail" style="font-weight: 500;">${fetchedData.email}</p>

          <div class="switchAccount" style="font-weight: 500; padding: 20px;" id="adminPanel">
                <p class="switchAccountLink"> 
                <i class="fas fa-chalkboard-teacher"></i> </nbsp> Admin Panel
                </p>
          </div>

          <div class="switchAccount" style="font-weight: 500; padding: 20px;" id="viewResults">
                <p class="switchAccountLink"> 
                    View Results
                </p>
          </div>

          <div class="preNavLogout" style="margin-bottom: 20px;">
              <h5><a href="" onClick="preNavLogoutUser()"><i class="fa fa-sign-out"></i> </nbsp>Logout</a></h5>
          </div>
      </div>
      

  </body>
  </html>
  `

        const UserProfilePicture = document.getElementById("profilePicture");
        const UserProfile = document.getElementById("userProfile");
        const HideUserProfile = document.querySelectorAll("[id='hideUserProfile']");
        // const myProfile = document.getElementById("myProfile");
        const myFooterCopyRight = document.getElementById ("myFooterCopyRight");
        const profilePictureIn = document.getElementById("profilePictureIn");
        const adminPanel = document.getElementById("adminPanel");
        const viewResults = document.getElementById("viewResults");
        const scanPatients = document.getElementById("scanPatients");
        

        //show or hide admin panel
        if(fetchedData.medicalCareer == "Nurse"){
            adminPanel.style.display = "none"
            scanPatients.style.display = "none"
        }

        else{
            viewResults.style.display = "none" 
        }
    
        //Go to admin panel
        adminPanel.addEventListener("click", ()=>{
            location = "../admin/dashboard.html"
        })

        const topProfileImage = document.getElementById("topProfileImage");
        topProfileImage.addEventListener("click", ()=>{
            if(UserProfile.style.display !== "none"){
                UserProfile.style.display = "none"
            }
    
            else {
                UserProfile.style.display = "block"
            }
            })

        // hidding and showing the image profile in the top right corner
        const inProfileImage = document.getElementById("inProfileImage");

        if (fetchedData.imageLink) {
            UserProfilePicture.style.display = "none"
            profilePictureIn.style.display = "none"
        }

        
        else{
            topProfileImage.style.display = "none"
            inProfileImage.style.display = "none"
        }



  
        preNavLogin.style.display = "none"

        

        UserProfile.style.display = "none";

        UserProfilePicture.addEventListener("click", ()=>{
        if(UserProfile.style.display !== "none"){
            UserProfile.style.display = "none"
        }

        else {
            UserProfile.style.display = "block"
        }
        })


        for(var i = 0; i < HideUserProfile.length; i++) 
        HideUserProfile[i].addEventListener("click", ()=>{
        UserProfile.style.display = "none"
        })

        // myProfile.addEventListener("click", ()=>{
        // UserProfile.style.display = "none"
        // })

        // myFooterCopyRight.addEventListener("click", ()=>{
        // UserProfile.style.display = "none"
        // })



}

loggedInUser()
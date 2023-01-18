const resultForm = document.getElementById("resultForm");
const patientName = document.getElementById("patientName");
const doctorName = document.getElementById("doctorName");
const patientResult = document.getElementById("patientResult");
const patientStage = document.getElementById("patientStage");
const patientMedications = document.getElementById("patientMedications");
const patientDescription = document.getElementById("patientDescription");
const saveResult = document.getElementById("saveResult");
const popupBoxSavedResult = document.getElementById("popupBoxSavedResult")

// contactMessage.style.display = "block";
window.addEventListener("message", function(event) {
    if (event.data === "redirect") {
      window.location.href = "https://tb.test.woza.work/";
    }
  });


saveResult.addEventListener("click", (event)=>{
    event.preventDefault();
    saveResult.innerHTML = `<img src="../img/Spinner.gif" alt="Loading..." width="40px" height="40px">`
    document.title = "Loading..."
    result();
});


function result(){
    const data = {
        patientName: patientName.value,
        doctorName: doctorName.value,
        result: patientResult.options[patientResult.selectedIndex].text,
        tbStage: patientStage.options[patientStage.selectedIndex].text,
        treatments: patientMedications.value,
        description: patientDescription.value
    }

    const sendData = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("https://tuberculosis-detection-system.cyclic.app/saveResult", sendData)
    .then(response => response.json())
    .then((fetchedData)=>{
        console.log(fetchedData)

        if (fetchedData.successMessage){
            popupBoxSavedResult.classList.add("open-popup")
            document.title = "Tuberculosis Detection System"
            saveResult.innerHTML = "Save Result"
        }

    })
}

function closePopup(){
    popupBoxSavedResult.classList.remove("open-popup")
    resultForm.reset();
}



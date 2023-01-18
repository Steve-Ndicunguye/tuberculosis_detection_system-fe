const popupBoxSingleResult = document.getElementById("popupBoxSingleResult")
let result_id;

async function getSingleResult(resultId){
    document.title = "Loading..."
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://tuberculosis-detection-system.cyclic.app/getResultById/"+resultId, getData)
    const fetchedData = await response.json()
    console.log(fetchedData)


    if (fetchedData.resultMessage){
        popupBoxSingleResult.classList.add("open-popupResult")
        localStorage.setItem("resultId", fetchedData.resultMessage._id)
        result_id = localStorage.getItem("resultId")
        resultDetails()
        document.title = "Tuberculosis Detection System"
    }
}

function closePopupResult(){
    popupBoxSingleResult.classList.remove("open-popupResult")
}



async function resultDetails(){  
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://tuberculosis-detection-system.cyclic.app/getResultById/"+result_id, getData)
    const fetchedData = await response.json()
    const singleResult = fetchedData.resultMessage;

    const patientNameDetails = document.getElementById("patientNameDetails")
    patientNameDetails.innerHTML = singleResult.patientName

    const doctorNameDetails = document.getElementById("doctorNameDetails")
    doctorNameDetails.innerHTML = singleResult.doctorName

    const patientResultDetails = document.getElementById("patientResultDetails")
    patientResultDetails.innerHTML = singleResult.result

    const patientStageDetails = document.getElementById("patientStageDetails")
    patientStageDetails.innerHTML = singleResult.tbStage

    const proposedMedicationsDetails = document.getElementById("proposedMedicationsDetails")
    proposedMedicationsDetails.innerHTML = singleResult.treatments

    const doctorDescriptionDetails = document.getElementById("doctorDescriptionDetails")
    doctorDescriptionDetails.innerHTML = singleResult.description

}



function printResult() {
    var popupBoxSingleResultPrint = document.getElementById("popupBoxSingleResult").innerHTML;
    var a = window.open('', '', 'height=500, width=500');
    a.document.write('<html>');
    a.document.write(popupBoxSingleResultPrint);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
}
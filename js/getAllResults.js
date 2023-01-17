getAllResults();

async function getAllResults(){
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("https://tuberculosis-detection-system.cyclic.app/getAllResults", getData)
    const fetchedData = await response.json()
    const results = fetchedData.patientResults;

    for(let i=0; i<results.length; i++){
        const resultArray = results[i];

        const patientName = resultArray.patientName;
        const description = resultArray.description.slice(0, 200)+"...";


        const allPatientsResults = document.getElementById("allPatientsResults");
        
        const resultTemplate = `
        <div class="col-lg-4 col-md-6">
            <div class="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                <h4 class="mb-3">${patientName}</h4>
                <p class="m-0">${description}</p>
                <div class="">
                    <button type="button" class="viewResults"> View Results </button>
                </div>
            </div>
        </div>
        `
        
        allPatientsResults.innerHTML += resultTemplate
    }
}





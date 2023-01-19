


function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}



function predictOnLoad() {
	
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
}



let model;
(async function () {
	
	model = await tf.loadModel('http://tb.test.woza.work/model_tb_1/model.json');
	$("#selected-image").attr("src", "http://tb.test.woza.work/assets/tb_image.jpg");
	
	$('.progress-bar').hide();
	

	predictOnLoad();
	
	
	
})();


$("#predict-button").click(async function () {
	
	let image = undefined;
	
	image = $('#selected-image').get(0);
	
	let tensor = tf.fromPixels(image)
	.resizeNearestNeighbor([96,96])
	.toFloat()
	.div(tf.scalar(255.0))
	.expandDims();
	
	let predictions = await model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function (p, i) { 
			return {
				probability: p,
				className: TARGET_CLASSES[i] 
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
		}).slice(0, 3);
	
		var file_name = 'tb_image.jpg';
		
		$("#prediction-list").append(`<li class="w3-text-blue fname-font" style="list-style-type:none;">${file_name}</li>`);
		
		top5.forEach(function (p) {
	
			$("#prediction-list").append(`<li style="list-style-type:none;">${p.className}: ${p.probability.toFixed(3)}</li>`);
		
			
		});
	
	
});



//######################################################################

// ### 3. READ THE IMAGES THAT THE USER SELECTS

// Then direct the code execution to app_batch_prediction_code.js

//######################################################################




// This listens for a change. It fires when the user submits images.

$("#image-selector").change(async function () {
	
	// the FileReader reads one image at a time
	fileList = $("#image-selector").prop('files');
	
	//$("#prediction-list").empty();
	
	// Start predicting
	// This function is in the app_batch_prediction_code.js file.
	model_processArray(fileList);
	
});






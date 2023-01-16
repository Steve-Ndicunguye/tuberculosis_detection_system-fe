

async function model_makePrediction(fname) {
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
		
	$("#prediction-list").append(`<li class="w3-text-blue fname-font" style="list-style-type:none;">
	${fname}</li>`);
	
	top5.forEach(function (p) {
	
		$("#prediction-list").append(`<li style="list-style-type:none;">${p.className}: ${p.probability.toFixed(3)}</li>`);
	
		
	});
	
	$("#prediction-list").append(`<br>`);
		
}



function model_delay() {
	
	return new Promise(resolve => setTimeout(resolve, 200));
}


async function model_delayedLog(item, dataURL) {
	
	await model_delay();
	
	$("#selected-image").attr("src", dataURL);
	$("#displayed-image").attr("src", dataURL);
	
}


async function model_processArray(array) {
	
	for(var item of fileList) {
		
		
		let reader = new FileReader();
		
		let file = undefined;
	
		
		reader.onload = async function () {
			
			let dataURL = reader.result;
			
			await model_delayedLog(item, dataURL);
			
			
			
			var fname = file.name;
			
			$("#prediction-list").empty();
			
			await model_makePrediction(fname);
		}
		
		file = item;
		
			
		reader.readAsDataURL(file);
	}
}














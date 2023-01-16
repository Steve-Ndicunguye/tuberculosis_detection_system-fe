

function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}

function predictOnLoad() {
	
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
};


$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
	}
	
		
		let file = $("#image-selector").prop('files')[0];
		reader.readAsDataURL(file);
		
	
		setTimeout(simulateClick.bind(null,'predict-button'), 500);

});




let model;
(async function () {
	
	model = await tf.loadModel('http://concept.test.woza.work/model_tb_1/model.json');
	$("#selected-image").attr("src", "http://concept.test.woza.work/assets/tb.jpg")
	
	
	$('.progress-bar').hide();
	
	predictOnLoad();
	
	
})();






$("#predict-button").click(async function () {
	
	
	
	let image = $('#selected-image').get(0);
	
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
				
		}).slice(0, 2);
	
	
$("#prediction-list").empty();
top5.forEach(function (p) {

	$("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);

	
	});
	
	
});










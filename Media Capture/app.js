(function() {
	
	"use strict";

	var videoElement;
	var canvasElement;
	var device;
	
	document.addEventListener("DOMContentLoaded", () => {

		document.querySelector("#capture").addEventListener("click", captureAction);
		document.querySelector("#save").addEventListener("click", savePhoto);
		videoElement = document.querySelector("#preview");
		canvasElement = document.querySelector("#picture");
		videoElement.addEventListener("click", capturePhoto);

	});
	
	function captureAction() {
		
		navigator.mediaDevices.getUserMedia( {
			video: {
				facingMode: "user"
			}
		}).then( ( stream ) => {
			if(typeof(videoElement.srcObject) != "undefined") {
				videoElement.srcObject = stream;	
			} else {
				videoElement.src = URL.createObjectURL(stream);
			}
			
			if( videoElement.paused ) videoElement.play();
			
		}).catch( ( error ) => {
			console.log(`${error.name}: ${error.message}`);
		})		
	}
	
	function capturePhoto() {
		
		canvasElement.width = videoElement.videoWidth;
		canvasElement.height = videoElement.videoHeight;
		
		var context = canvasElement.getContext("2d");
		context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
	}
	
	function savePhoto() {
		var imgData = canvasElement.msToBlob("image/jpeg");
		navigator.msSaveBlob(imgData, "frame.jpg");
	}
	
	
	
})();
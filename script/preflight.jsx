// Define the preflight document
var preflightDoc = app.activeDocument;

// We are using mm
var mm = 2.8346455656;
var strokeWidthAmount = (0.001 * mm);
var strokeWidthRounded = strokeWidthAmount.toFixed(6);

//Messages
var infoMessage = "";
infoMessage +=  "Pre-Flight for \"" + preflightDoc.name + "\"\n";
infoMessage +=  '\n';
var modalScreen;

//Run Tests
PreFlightTests();

//Run Tests Function
function PreFlightTests() {
	// Tests
	rgbMode();
	strokeTest();
	strokeOpacity();
	strokeColor();

	//Display Info
	displayAlert(infoMessage);
}

// Tests

// RGB Mode
function rgbMode(){
	if ( preflightDoc.documentColorSpace === DocumentColorSpace.RGB ) {
		//Pass
		infoMessage += "\n✔ PASS: Document is in RGB Colour Mode\n";
	} else {
		infoMessage += "\n✕ FAILED: Document is not in RGB Colour Mode\n";
	}
}

function strokeTest(){

		var allPaths = preflightDoc.pathItems;
		var inCorrectPaths = 0;
		var correctPaths = 0;
		
		for (var l=0; l < allPaths.length; l++) {  
			// TODO: Need to improve so it checks what is less than this amount, but having an issue doing this
			if(allPaths[l].strokeWidth.toFixed(6) > strokeWidthRounded){
				inCorrectPaths += 1;
			} else {
				correctPaths += 1;
			}
		}

		if(inCorrectPaths >= 1) {
			infoMessage += "\n✕ FAILED: Please check all your paths have a stroke of 0.001mm. You have the following paths which are incorrect:" + inCorrectPaths + "\n";
		}

		if(correctPaths >= 1) {
			infoMessage += "\n✔ PASS: Stroke width for paths are 0.001mm\n";
		}
}

function strokeOpacity(){
	var allPaths = preflightDoc.pathItems; 
	
	var invaildOpacityCount = 0;
	
	for (var l=0; l < allPaths.length; l++) {
		if (allPaths[l].opacity < 100) { 
			//FAIL, opacity is less that 100%.
			invaildOpacityCount += 1;
		}
	}
	
	if(invaildOpacityCount > 0){
		infoMessage += "\n❗ WARNING:	Transparency detected in " + invaildOpacityCount + " paths\n";
	}
}

function strokeColor(){
	var allPaths = preflightDoc.pathItems; 

	//Cut = Red
	var spotCut = "255,0,0";

	//Score =  Blue
	var spotScore = "0,0,255";

	//Engrave = Black
	var spotEngrave = "0,0,0";

	//count the number of paths for each colour
	var spotCutCount = 0;
	var spotEngraveCount = 0;
	var spotScoreCount = 0;
	var invaildColorCount = 0;

	for (var l=0; l < allPaths.length; l++) {

		if (allPaths[l].strokeColor.spot === undefined) { 
			//FAIL, no colours detected
			invaildColorCount += 1;
		} else {
				//make sure the spot colours are as we set
				var getColor = allPaths[l].strokeColor.spot.getInternalColor();

				if(getColor == spotCut){
					spotCutCount += 1;
				}
		
				if(getColor == spotEngrave){
					spotEngraveCount += 1;
				}
		
				if(getColor == spotScore){
					spotScoreCount += 1;
				}

			}

	}

	if(spotCutCount >= 1) {
		infoMessage += "\nℹ️ Paths to Cut:" + spotCutCount + "\n";
	}
	if(spotEngraveCount >= 1) {
		infoMessage += "\nℹ️ Paths to Engrave:" + spotEngraveCount + "\n";
		infoMessage += "Consider using Scoring instead of Engraving to speed up the process of laser cutting.\n";
	}
	if(spotScoreCount >= 1) {
		infoMessage += "\nℹ️ Paths to Score:" + spotScoreCount + "\n";
	}
	if(invaildColorCount >= 1) {
		infoMessage += "\n❗ WARNING:	Paths with non-existent swatch colour: " + invaildColorCount + "\n";
		infoMessage += "		You might want to use only swatch colours!";
	}
}



// displayAlert function based off function from LeoMari Sep 29, 2015 11:47 AM 
// https://forums.adobe.com/message/8012218#8012218

function displayAlert( info ) {
	modalScreen = new Window('dialog', 'Preflight'); 
	
	var messageArea = modalScreen.add('panel', undefined, ''); 
	messageArea.orientation = 'row';

	messageArea.report = messageArea.add('statictext', undefined, info,{multiline:true});
	messageArea.report.preferredSize = [400,200];

	var buttonArea = modalScreen.add('group', undefined, ''); 
	buttonArea.orientation = 'row'
	buttonArea.okButton = buttonArea.add('button', undefined, 'OK', {name:'ok'});
	buttonArea.okButton.onClick = function() { modalScreen.close() };

	modalScreen.show();
}
 
// Force redraw
app.redraw();



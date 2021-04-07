
var vidcapture, ctracker, drawcanvas
var flag = false


function setup() {
	var cnv = createCanvas(windowWidth, windowHeight * 5/8)

	cnv.parent('p5Canvas')

	vidcapture = createCapture(VIDEO)
	vidcapture.size(windowWidth, windowHeight * 5/8)
	vidcapture.hide()

	ctracker = new clm.tracker()
	ctracker.init()

	ctracker.start(vidcapture.elt)
}


function draw() {

	translate(vidcapture.width, 0)
	scale(-1, 1)
	print(windowWidth)
	if($('#camera').val() == "on") {
		background(255,255,255)
		// print((vidcapture.width*3)/2)
		// image(vidcapture, -windowWidth + (vidcapture.width*3)/2, 0)
		image(vidcapture, 0, 0)
		flag = true
	} else if($('#camera').val() == "off" && flag){
		background(255,255,255)
		flag = false
	}
	

	


	var positions = ctracker.getCurrentPosition()

	if(positions && $('#currentDrawing').val() == "on") {
		var size = $('#size').val()
		var cursorTemp = $('#cursor').val()
		var cursor = 0
		if(cursorTemp == "nose") {
			cursor = 62
		} else if(cursorTemp == "lEye") {
			cursor = 32
		} else if(cursorTemp == "rEye") {
			cursor = 27
		} else if(cursorTemp == "mouth") {
			cursor = 60
		}
		
		var x = map(positions[cursor][0], windowWidth/2+300, windowWidth/2-300, windowWidth, 0, false)
		var y = map(positions[cursor][1], ((windowHeight * 5/8)/2)+100, ((windowHeight * 5/8)/2)-100, windowHeight * 5/8, 0, false)


		fill($("#color").val())
		if($('#match').val() == "on") {
			$("#stroke").val($("#color").val())
		} 
		stroke($("#stroke").val())

		if($("#object").val() == "line") {
			line(x, y, x, y-size)
		} else if($("#object").val() == "ellipse") {
			ellipse(x, y, size)
		} else if ($("#object").val() == "rect"){
			rect(x, y, size, size)
		}




	}
}


$(".clear").on("click", function() {
	background(255,255,255)
})

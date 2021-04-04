
var vidcapture, ctracker, drawcanvas
var flag = false


function setup() {
	var cnv = createCanvas(windowWidth/2, windowHeight * 5/8)
	cnv.parent('p5Canvas')

	vidcapture = createCapture(VIDEO)
	vidcapture.size(vidcapture.width*3, vidcapture.height*4.5)
	vidcapture.hide()

	ctracker = new clm.tracker()
	ctracker.init()

	ctracker.start(vidcapture.elt)
	//just for testing
	drawcanvas = document.getElementById('defaultCanvas0')
}


function draw() {

	//ctracker
	// background(255,10)
	translate(vidcapture.width, 0)
	scale(-1, 1)
	
	if($('#camera').val() == "on") {
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
			cursor = 27
		} else if(cursorTemp == "rEye") {
			cursor = 32
		} else if(cursorTemp == "mouth") {
			cursor = 60
		}
		
		var x = map(positions[cursor][0], 560, 340, windowWidth/2, 0, true)
		var y = map(positions[cursor][1], 320, 220, windowHeight * 5/8, 0, true)
		print("x: ")
		print(positions[cursor][0])
		// // 640 130
		//340 560
		// // 40 430
		// 320 220
		print("y: ")
		print(positions[cursor][1])

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


		// if($("#object").val() == "line") {
		// 	line(positions[cursor][0], positions[cursor][1], positions[cursor][0], positions[cursor][1]-size)
		// } else if($("#object").val() == "ellipse") {
		// 	ellipse(positions[cursor][0], positions[cursor][1], size)
		// } else if ($("#object").val() == "rect"){
		// 	rect(positions[cursor][0], positions[cursor][1], size, size)
		// }
		
		// line(positions[23][0], positions[23][1], positions[23][0]-30, positions[23][1]-30)
		// line(positions[28][0], positions[28][1], positions[28][0]+30, positions[28][1]-30)
		// image("imgs/test.png", 50, 50, 20, 20)

		// var r = map(positions[62][0], 0, width, 0, 255, true)
		// var b = map(positions[62][1], 0, height, 0, 255, true)

		// background(r, 255, b)
		// tint(255,126)
		// image(vidcapture, 0, 0)

	}

	// translate(mouseX, mouseY)
	// var r = map(mouseX, 0, width, 0, 255)
	// var g = map(mouseY, 0, width, 0, 255)
	// var xRotate = map(mouseX, 0, width, 0, 360)

	// //background(255,0,0)
	// noFill()
	
	// stroke(r, g, 255)
	// // circle(0, 0, 20)

	// angleMode(DEGREES)
	// rotate(xRotate)
	// stroke(r,0,g)
	// // translate(mouseX, mouseY)
	// line(0, 0, 50, 50)
	
}


$(".clear").on("click", function() {
	background(255,255,255)
})
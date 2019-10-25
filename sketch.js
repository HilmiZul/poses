/*
 * oh my glasses
 * p5.js
 * ml5.js
 * 25 Oktober 2019
 * inspired by The Coding Train - PoseNet on Hour of Code 😅
 */
let vidio;
let poseNet;
let eleftX = 0;
let eleftY = 0;
let erightX = 0;
let erightY = 0;
function setup() {
	createCanvas(640, 480);
	vidio = createCapture(VIDEO);
	poseNet = ml5.poseNet(vidio, modelReady);
	vidio.hide();
	poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
	// console.log(poses);	
	if (poses.length > 0) {
		let neweX = poses[0].pose.keypoints[1].position.x;
		let neweY = poses[0].pose.keypoints[1].position.y;
		let newerX = poses[0].pose.keypoints[2].position.x;
		let newerY = poses[0].pose.keypoints[2].position.y;
		eleftX = lerp(eleftX, neweX, 0.5);
		eleftY = lerp(eleftY, neweY, 0.5);
		erightX = lerp(erightX, newerX, 0.5);
		erightY = lerp(erightY, newerY, 0.5);
	}
}

function modelReady() {
	console.log('model ready');
}

function draw() {
	image(vidio, 0, 0);
	let d = dist(eleftX, eleftY, erightX, erightY)
	fill(255, 255, 255, 80);
	strokeWeight(2);
	ellipse(eleftX, eleftY, d - 10);
	ellipse(erightX, erightY, d - 10);
}
songLeftStatus = "";
songRightStatus = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song1 = loadSound("steaser.mp3");
    song2 = loadSound("sunflower.mp3");
}

function setup(){
    canvas = createCanvas(550, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video, 0, 0, 550, 500);
    fill("red");
    stroke("red");

    songLeftStatus = song1.isPlaying();
    songRightStatus = song2.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(songLeftStatus == false){
            song1.play();
            //song1.volume(1);
            song1.rate(1);
            document.getElementById("sone").innerHTML = "Spider-Gwen is playing";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(songRightStatus == false){
            song2.play();
            //song2.volume(1);
            song2.rate(1);
            document.getElementById("stwo").innerHTML = "Sunflower is playing";
        }
    }
}

function modelLoaded(){
    console.log('PoseNet Is Initialized. ');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + " & scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("The x value of the left wrist is " + leftWristX + " & the y value of the left wrist is " + leftWristY + ". ");
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("The x value of the right wrist is " + rightWristX + " & the y value of the right wrist is " + rightWristY + ". ");
    }
}
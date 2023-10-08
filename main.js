song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("poses", gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        accuracy = result[0].pose.keypoints[10].score;
        accuraty = result[0].pose.keypoints[9].score;
        console.log("score left Wrist = " + accuraty + "score right Wrist = " + accuracy);

        leftWristX = results[0].poses.leftWrist.x;
        leftWristY = results[0].poses.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY );

        rightWristX = results[0].poses.rightWrist.x;
        rightWristY = results[0].poses.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY );
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');

    if(accuracy > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(accuraty > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        InNumberleftwristY = Number(leftWristY);
        remove_decimal = floor(InNumberleftwristY);
        leftWristY_divided_1000 = remove_decimal/1000;
        Volume = leftWristY_divided_1000 * 2;
        document.getElementById("volume").innerHTML = "Volume = " + Volume;
        song.setVolume(Volume);
    }
}

function modelLoaded()
{
    console.log("PoseNet is initialized");
}

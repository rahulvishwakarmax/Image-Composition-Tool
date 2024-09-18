var fgimg = null;
var bgimg = null;

function uploadFgimage() {
    var fgfile = document.getElementById("fgimage");
    fgimg = new SimpleImage(fgfile);
    var canvas = document.getElementById("can1");
    fgimg.drawTo(canvas);
}

function uploadBgimage() {
    var bgfile = document.getElementById("bgimage");
    bgimg = new SimpleImage(bgfile);
    var canvas = document.getElementById("can2");
    bgimg.drawTo(canvas);
}

function clearCanvases() {
    var canvas1 = document.getElementById("can1");
    var context1 = canvas1.getContext("2d");
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
    var canvas2 = document.getElementById("can2");
    var context2 = canvas2.getContext("2d");
    context2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function createComposite() {
    if (!fgimg || !fgimg.complete()) {
        alert("Upload foreground image");
        return;
    }
    if (!bgimg || !bgimg.complete()) {
        alert("Upload background image");
        return;
    }
    bgimg.setSize(fgimg.width, fgimg.height);
    var outputimg = new SimpleImage(fgimg.width, fgimg.height);
    for (var pixel of fgimg.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
            outputimg.setPixel(x, y, bgimg.getPixel(x, y));
        } else {
            outputimg.setPixel(x, y, pixel);
        }
    }
    clearCanvases();
    var canvas = document.getElementById("can1");
    outputimg.drawTo(canvas);
}

function trySampleImages(sampleNumber) {
    var fgSampleImage = new Image();
    var bgSampleImage = new Image();
    if (sampleNumber === 1) {
        fgSampleImage.src = "drewRobert.png"; 
        bgSampleImage.src = "dinos.png";
    } else if (sampleNumber === 2) {
        fgSampleImage.src = "greencar.jpg"; 
        bgSampleImage.src = "paintimg.png";
    } else if (sampleNumber === 3) {
        fgSampleImage.src = "try33.jpeg"; 
        bgSampleImage.src = "try3.jpeg";
    }
    fgSampleImage.onload = function () {
        var canvas1 = document.getElementById("can1");
        canvas1.width = fgSampleImage.width; 
        canvas1.height = fgSampleImage.height; 
        var ctx1 = canvas1.getContext("2d");
        ctx1.drawImage(fgSampleImage, 0, 0); 

        var canvas2 = document.getElementById("can2");
        canvas2.width = bgSampleImage.width; 
        canvas2.height = bgSampleImage.height; 
        var ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(bgSampleImage, 0, 0);
        
        fgimg = new SimpleImage(fgSampleImage);
        bgimg = new SimpleImage(bgSampleImage);
    };
}

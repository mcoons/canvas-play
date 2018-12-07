let width = 801;
let halfWidth = Math.floor(width / 2);

////////////////////////////////////////////////////////

let background = document.getElementById("background");
background.width = width;
background.height = width;
background.style.width = width;
background.style.height = width;

let backCtx = background.getContext("2d");
backCtx.translate(halfWidth,halfWidth);

backCtx.fillStyle = "#000000";
backCtx.fillRect(-halfWidth,-halfWidth,width,width);

let backgroundInterval = scrollingBackground();

////////////////////////////////////////////////////////

function scrollingBackground(){
    const image = document.getElementById('colorsource');

    let colorwheel = document.getElementById("colorwheel")
    colorwheel.width = 100;
    colorwheel.height = 100;
    colorwheel.style.width = 100;
    colorwheel.style.height = 100;

    colorTheta = 0;

    let colorCtx = colorwheel.getContext("2d");
    colorCtx.translate(50,50);
    colorCtx.drawImage(image, -50, -50, 100, 100);

    let interval = setInterval(scrollColors, 20, backCtx);
    return interval;

    function scrollColors(ctx) {
        colorX = Math.cos(colorTheta)*40;
        colorY = Math.sin(colorTheta)*40;
        
        color2X = Math.cos(colorTheta+2*Math.PI/3)*40;
        color2Y = Math.sin(colorTheta+2*Math.PI/3)*40;
        
        color3X = Math.cos(colorTheta+4*Math.PI/3)*40;
        color3Y = Math.sin(colorTheta+4*Math.PI/3)*40;

        let bColor = colorCtx.getImageData(colorX+50, colorY+50, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(bColor[0]/2, bColor[1]/2, bColor[2]/4)).slice(-6);
        
        let bColor2 = colorCtx.getImageData(color2X+50, color2Y+50, 1, 1).data;
        var hex2 = "#" + ("000000" + rgbToHex(bColor2[0]/2, bColor2[1]/2, bColor2[2]/4)).slice(-6);
        
        let bColor3 = colorCtx.getImageData(color3X+50, color3Y+50, 1, 1).data;
        var hex3 = "#" + ("000000" + rgbToHex(bColor3[0]/2, bColor3[1]/2, bColor3[2]/4)).slice(-6);

        let gradient =ctx.createRadialGradient(0,0,75, 0,0,width/1.5);

        // Add three color stops
        gradient.addColorStop(0, hex);
        gradient.addColorStop(.3, hex2);
        gradient.addColorStop(.9, hex3);

        // Set the fill style and draw a rectangle
        ctx.fillStyle = gradient;
        ctx.fillRect(-halfWidth, -halfWidth, width, width);

        colorTheta += .005;
        if (colorTheta >= 2*Math.PI) colorTheta = 0;
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }
}

////////////////////////////////////////////////////////

let canvas = document.getElementById("canvas1");
canvas.width = width;
canvas.height = width;
canvas.style.width = width;
canvas.style.height = width;

let x, y, j;
let ctx = canvas.getContext("2d");

ctx.translate(halfWidth, halfWidth);
clear(ctx);

function clear(ctx) {
  ctx.clearRect(-halfWidth, -halfWidth, width, width);
}


// for (let r = halfWidth/3; r <= halfWidth; r+=1.5) {
//     let color = `rgba(0,0,${255-r+halfWidth/8},.2)`;
//     drawCircle(ctx, 0, 0, r, color);
// }

// drawCircle(ctx, 0, 0, halfWidth, "red");

//////////////////////////////////////////////////////////////////////

// trig(ctx);

function trig(ctx) {
  // ctx.shadowColor = "rgba(20,20,20,.2)";
  // ctx.shadowOffsetX = 5;
  // ctx.shadowOffsetY = 5;
  // ctx.shadowBlur = 1;

  ctx.fillStyle = "#FFFFFF";
  drawText(ctx, 5, -6, "(0,0)", "12px serif");

  for (x = -Math.PI; x < Math.PI; x += 0.001) {
    j = width / (2 * Math.PI);

    ctx.fillStyle = "#FFFFFF";
    drawPoint(ctx, x * j * 4, 0);
    drawPoint(ctx, 0, x * j * 4);

    ctx.fillStyle = "#0000FF";
    y = Math.sin(x * 3);
    drawPoint(ctx, x * j, (y * halfWidth) / 3);

    ctx.fillStyle = "#00FF00";
    y = Math.cos(x * 3);
    drawPoint(ctx, x * j, (y * halfWidth) / 3);
  }
}

//////////////////////////////////////////////////////////////////////

// for (let r = halfWidth/2; r <= halfWidth; r+=.5) {
//     let color = `rgba(${255-r+halfWidth/3},0,0,.7)`;
//     drawCircle(ctx, 0, 0, r, color);
// }
// circles(0, 0, (width-1)/4, 5);

function circles(x, y, r, i) {
  drawCircle(ctx, x, y, r, "magenta");

  if (i === 0) return;

  circles(x - r, y, r / 2, i - 1);
  circles(x + r, y, r / 2, i - 1);
  circles(x, y + r, r / 2, i - 1);
  circles(x, y - r, r / 2, i - 1);
}

//////////////////////////////////////////////////////////////////////

// for (let r = halfWidth/5; r <= halfWidth; r+=.5) {
//     let color = `rgba(0,${255-r+halfWidth/8},0,.7)`;
//     drawCircle(ctx, 0, 0, r, color);
// }
// circles2(0, 0, (width-1)/5, 7, null);

function circles2(x, y, r, i, dir) {
  drawCircle(ctx, x, y, r, "red");

  if (i === 0) return;

  if (dir != "r") circles2(x - r - r / 2, y, r / 2, i - 1, "r");
  if (dir != "l") circles2(x + r + r / 2, y, r / 2, i - 1, "l");
  if (dir != "t") circles2(x, y + r + r / 2, r / 2, i - 1, "t");
  if (dir != "b") circles2(x, y - r - r / 2, r / 2, i - 1, "b");
}

//////////////////////////////////////////////////////////////////////

// for (let r = halfWidth/3; r <= halfWidth; r+=.5) {
//     let color = `rgba(0,0,${255-r+halfWidth/8},.7)`;
//     drawCircle(ctx, 0, 0, r, color);
// }
// circles3(0, 0, (width - 1) / 6, 7, null);

function circles3(x, y, r, i, dir) {
  drawCircle(ctx, x, y, r, `#${i + 2}${i + 2}${i + 2}${i + 2}FF`);

  if (i === 0) return;

  if (dir != "l") circles3(x - r - r / 2, y, r / 2, i - 1, "r");
  if (dir != "r") circles3(x + r + r / 2, y, r / 2, i - 1, "l");
  if (dir != "b") circles3(x, y + r + r / 2, r / 2, i - 1, "t");
  if (dir != "t") circles3(x, y - r - r / 2, r / 2, i - 1, "b");
}

// function drawCircle(ctx, cx, cy, radius, color){
//     ctx.fillStyle = color;
//     for (let deg = 0; deg < 360; deg+=.1) {
//         let rad = deg*Math.PI/180;

//         let x = cx + Math.cos(rad) * radius;
//         let y = cy + Math.sin(rad) * radius;

//         drawPoint(ctx, x, y);
//     }
// }

//////////////////////////////////////////////////////////////////////


// var gradient = ctx.createRadialGradient(0,0,100, 0,0,500);

// Add three color stops
// gradient.addColorStop(0, 'red');
// gradient.addColorStop(.3, 'purple');
// gradient.addColorStop(.4, 'purple');
// gradient.addColorStop(.7, 'blue');
// gradient.addColorStop(1, 'green');

// Set the fill style and draw a rectangle
// ctx.fillStyle = gradient;
// ctx.fillRect(-halfWidth, -halfWidth, width, width);

koch();

function koch() {
  ctx.strokeStyle = "#00FFFF";

  for (let r = 2.2; r <= 80; r *= 1.34) {
    let radius = width / r;

    let rad = (90 * Math.PI) / 180;
    let x1 = Math.cos(rad) * radius;
    let y1 = Math.sin(rad) * radius;

    rad = (210 * Math.PI) / 180;
    let x2 = Math.cos(rad) * radius;
    let y2 = Math.sin(rad) * radius;

    rad = (330 * Math.PI) / 180;
    let x3 = Math.cos(rad) * radius;
    let y3 = Math.sin(rad) * radius;

    kochCurve(x1, y1, x2, y2, 5);
    kochCurve(x2, y2, x3, y3, 5);
    kochCurve(x3, y3, x1, y1, 5);
  }
}

function kochCurve(p1x, p1y, p2x, p2y, i) {
  let p3x, p4x, p5x;
  let p3y, p4y, p5y;

  let theta = Math.PI / 3;

  if (i > 0) {
    p3x = (2 * p1x + p2x) / 3;
    p3y = (2 * p1y + p2y) / 3;

    p5x = (2 * p2x + p1x) / 3;
    p5y = (2 * p2y + p1y) / 3;

    p4x = p3x + (p5x - p3x) * Math.cos(theta) + (p5y - p3y) * Math.sin(theta);
    p4y = p3y - (p5x - p3x) * Math.sin(theta) + (p5y - p3y) * Math.cos(theta);

    kochCurve(p1x, p1y, p3x, p3y, i - 1);
    kochCurve(p3x, p3y, p4x, p4y, i - 1);
    kochCurve(p4x, p4y, p5x, p5y, i - 1);
    kochCurve(p5x, p5y, p2x, p2y, i - 1);
  } else {
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();
  }
}

//////////////////////////////////////////////////////////////////////

function drawCircle(ctx, cx, cy, radius, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.ellipse(cx, cy, radius, radius, 0, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawPoint(ctx, x, y) {
  ctx.fillRect(x, y, 1, 1);
}

function drawCenteredText(ctx, x, y, txt, font) {
  ctx.textAlign = "center";
  ctx.font = font;
  ctx.fillText(txt, x, y);
}

function drawText(ctx, x, y, txt, font) {
  ctx.textAlign = "left";
  ctx.font = font;
  ctx.fillText(txt, x, y);
}

///////////////////////////
// Properties
///////////////////////////

// canvas
// fillStyle **
// font **
// globalAlpha
// globalCompositeOperation
// lineCap
// lineDashOffset
// lineJoin
// lineWidth
// miterLimit
// shadowBlur **
// shadowColor **
// shadowOffsetX **
// shadowOffsetY **
// strokeStyle **
// textAlign **
// textBaseline

///////////////////////////
// Methods
///////////////////////////

// arc()
// arcTo()
// beginPath() **
// bezierCurveTo()
// clearRect()
// clip()
// closePath()
// createImageData()
// createLinearGradient()
// createPattern()
// createRadialGradient() **
// drawFocusIfNeeded()
// drawImage()
// ellipse() **
// fill()
// fillRect() **
// fillText() **
// getImageData()
// getLineDash()
// isPointInPath()
// isPointInStroke()
// lineTo() **
// measureText()
// moveTo() **
// putImageData()
// quadraticCurveTo()
// rect()
// restore()
// rotate()
// save()
// scale()
// setLineDash()
// setTransform()
// stroke() **
// strokeRect()
// strokeText()
// transform()
// translate() **

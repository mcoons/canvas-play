let width = 800;
let halfWidth = Math.floor(width / 2);
let palette = [];
buildPalette();

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

let colorTheta = 0;
let index = 0;

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

//////////////////////////////////////////////////////////////////////

let showBackground = true;
let showTrig = true;
let showCircles = false;
let showCircles2 = false;
let showCircles3 = false;
let showKoch = false;

let backgroundInterval = null;

if (showBackground) backgroundInterval = scrollingBackground();
if (showTrig) trig();
if (showCircles) circles(0, 0, (width-1)/4, 5);
if (showCircles2) circles2(0, 0, (width-1)/5, 7, null);
if (showCircles3) circles3(0, 0, (width - 1) / 6, 7, null);
if (showKoch) koch();

//////////////////////////////////////////////////////////////////////

function trig() {
  ctx.shadowColor = "rgba(20,20,20,.2)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 1;

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

function circles(x, y, r, i) {
  drawCircle(ctx, x, y, r, "magenta");

  if (i === 0) return;

  circles(x - r, y, r / 2, i - 1);
  circles(x + r, y, r / 2, i - 1);
  circles(x, y + r, r / 2, i - 1);
  circles(x, y - r, r / 2, i - 1);
}

//////////////////////////////////////////////////////////////////////

function circles2(x, y, r, i, dir) {
  drawCircle(ctx, x, y, r, "red");

  if (i === 0) return;

  if (dir != "r") circles2(x - r - r / 2, y, r / 2, i - 1, "r");
  if (dir != "l") circles2(x + r + r / 2, y, r / 2, i - 1, "l");
  if (dir != "t") circles2(x, y + r + r / 2, r / 2, i - 1, "t");
  if (dir != "b") circles2(x, y - r - r / 2, r / 2, i - 1, "b");
}

//////////////////////////////////////////////////////////////////////

function circles3(x, y, r, i, dir) {
  drawCircle(ctx, x, y, r, `#${i + 2}${i + 2}${i + 2}${i + 2}FF`);

  if (i === 0) return;

  if (dir != "l") circles3(x - r - r / 2, y, r / 2, i - 1, "r");
  if (dir != "r") circles3(x + r + r / 2, y, r / 2, i - 1, "l");
  if (dir != "b") circles3(x, y + r + r / 2, r / 2, i - 1, "t");
  if (dir != "t") circles3(x, y - r - r / 2, r / 2, i - 1, "b");
}

//////////////////////////////////////////////////////////////////////

function koch() {
  ctx.strokeStyle = "#99FFFF";

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

function clear(ctx) {
  ctx.clearRect(-halfWidth, -halfWidth, width, width);
}

// index:   into color palette
// percent:  -1 = black, 1 = white
function getColor(index, percent){   
  let color = palette[index].color;
  let newColor = shadeRGBColor(color, percent); 
  return newColor;
}

// percent:  -1 = black, 1 = white
function shadeRGBColor(color, percent) {
  var f=color.split(","),
      t=percent<0?0:255,
      p=percent<0?percent*-1:percent,
      R=parseInt(f[0].slice(4)),
      G=parseInt(f[1]),
      B=parseInt(f[2]);

  return "rgb("+(Math.round((t-R)*p)+R)+","+
                (Math.round((t-G)*p)+G)+","+
                (Math.round((t-B)*p)+B)+")";
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function buildPalette(){
  let r=255, g=0, b=0;

  for (g=0; g<=255; g++){ palette.push({r,g,b,color:`rgb(${r},${g},${b})`});}
  g--;

  for (r=254; r>=0; r--){ palette.push({r,g,b,color:`rgb(${r},${g},${b})`});}
  r++;

  for (b=1; b<=255; b++){ palette.push({r,g,b,color:`rgb(${r},${g},${b})`});}
  b--;

  for (g=254; g>=0; g--){ palette.push({r,g,b,color:`rgb(${r},${g},${b})`});}
  g++;

  for (r=1; r<=255; r++){ palette.push({r,g,b,color:`rgb(${r},${g},${b})`});}
  r--;

  for (b=254; b>0; b--){ palette.push({r,g,b,color:`rgb(${r},${g},${b})`});}
  b++;
}

////////////////////////////////////////////////////////

function scrollingBackground(){
  // const image = document.getElementById('colorsource');

  // let colorwheel = document.getElementById("colorwheel")
  // colorwheel.width = 100;
  // colorwheel.height = 100;
  // colorwheel.style.width = 100;
  // colorwheel.style.height = 100;

  // let colorCtx = colorwheel.getContext("2d");
  // colorCtx.translate(50,50);
  // colorCtx.drawImage(image, -50, -50, 100, 100);

  // let interval = setInterval(scrollColors, 20, backCtx);
  let interval = setInterval(scrollColors2, 20, backCtx, -.75);
  return interval;

  // function scrollColors(ctx) {
  //     colorX = Math.cos(colorTheta)*40;
  //     colorY = Math.sin(colorTheta)*40;
      
  //     color2X = Math.cos(colorTheta+2*Math.PI/3)*40;
  //     color2Y = Math.sin(colorTheta+2*Math.PI/3)*40;
      
  //     color3X = Math.cos(colorTheta+4*Math.PI/3)*40;
  //     color3Y = Math.sin(colorTheta+4*Math.PI/3)*40;

  //     let bColor = colorCtx.getImageData(colorX+50, colorY+50, 1, 1).data;
  //     var hex = "#" + ("000000" + rgbToHex(bColor[0]/4, bColor[1]/4, bColor[2]/2)).slice(-6);
      
  //     let bColor2 = colorCtx.getImageData(color2X+50, color2Y+50, 1, 1).data;
  //     var hex2 = "#" + ("000000" + rgbToHex(bColor2[0]/4, bColor2[1]/4, bColor2[2]/2)).slice(-6);
      
  //     let bColor3 = colorCtx.getImageData(color3X+50, color3Y+50, 1, 1).data;
  //     var hex3 = "#" + ("000000" + rgbToHex(bColor3[0]/4, bColor3[1]/4, bColor3[2]/2)).slice(-6);

  //     let gradient =ctx.createRadialGradient(0,0,75, 0,0,width/1.5);

  //     // Add three color stops
  //     gradient.addColorStop(0, hex);
  //     gradient.addColorStop(.3, hex2);
  //     gradient.addColorStop(.9, hex3);

  //     // Set the fill style and draw a rectangle
  //     ctx.fillStyle = gradient;
  //     ctx.fillRect(-halfWidth, -halfWidth, width, width);

  //     colorTheta += .005;
  //     if (colorTheta >= 2*Math.PI) colorTheta = 0;
  // }

  function scrollColors2(ctx, percent){
    bColor1 = getColor( index%1530, percent);
    // bColor2 = getColor( (index+255)%1530, percent);
    bColor3 = getColor( (index+510)%1530, percent);
    // bColor4 = getColor( (index+765)%1530, percent);
    bColor5 = getColor( (index+1020)%1530, percent);
    // bColor6 = getColor( (index+1275)%1530, percent);

    let gradient =ctx.createRadialGradient(0,0,width/20, 0,0,width/1.5);

    // Add three color stops
    gradient.addColorStop(0,  bColor1);
    // gradient.addColorStop(.2, bColor2);
    gradient.addColorStop(.5, bColor3);
    // gradient.addColorStop(.6, bColor4);
    gradient.addColorStop(1, bColor5);
    // gradient.addColorStop(1,  bColor6);

    ctx.fillStyle = gradient;
    ctx.fillRect(-halfWidth, -halfWidth, width, width);

    index++;
    index = index%1530;
  }
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
// clearRect() **
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

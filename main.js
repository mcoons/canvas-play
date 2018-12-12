let width = 800;
let halfWidth = Math.floor(width / 2);

let colorTheta = 0;
let index = 0;
// let x, y, j;

let palette = [];
buildPalette();

let backgroundInterval = null;

////////////////////////////////////////////////////////

let background = document.getElementById("background");
background.width = background.height = width;
background.style.width = background.style.height = width;
background.style.left = `${halfWidth}px`;

let backCtx = background.getContext("2d");
backCtx.translate(halfWidth,halfWidth);

backCtx.fillStyle = "#000000";
backCtx.fillRect(-halfWidth,-halfWidth,width,width);

////////////////////////////////////////////////////////

let canvas = document.getElementById("canvas1");
canvas.width = canvas.height = width;
canvas.style.width = canvas.style.height = width;
canvas.style.left = `${halfWidth}px`;

let ctx = canvas.getContext("2d");
ctx.translate(halfWidth, halfWidth);

clear(ctx);

//////////////////////////////////////////////////////////////////////

let showBackground = true;
let showTrig = false;
let showCircles = false;
let showCircles2 = false;
let showCircles3 = false;
let showKoch = false;

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

  for (let x = -Math.PI; x < Math.PI; x += 0.001) {
    let j = width / (2 * Math.PI);

    ctx.fillStyle = "#FFFFFF";
    drawPoint(ctx, x * j * 4, 0);
    drawPoint(ctx, 0, x * j * 4);

    ctx.fillStyle = "#0000FF";
    let y = Math.sin(x * 3);
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
let inc = .0002;

parametric1(inc);

function parametric1(inc){
  ctx.fillStyle = "#FFFFFF";
  let x,y,r;
  let scale = halfWidth/6;
  var a=2,b=2,c=640;
    
  var formulatext = document.createElement('label');
  formulatext.innerText = "r = A + B * cos(C * theta)";
  document.getElementById('form').appendChild(formulatext);

  var aslider = document.createElement('input');
  aslider.id = "aValue";
  aslider.type = 'range';
  aslider.min = 0;
  aslider.max = 10;
  aslider.value = 2;
  aslider.step = 1;
  aslider.oninput = function(){atext.innerText = "Value of A: " + aslider.value; submit.onclick()}
  document.getElementById('form').appendChild(aslider);

  var atext = document.createElement('label');
  atext.innerText = "Value of A: 2";
  document.getElementById('form').appendChild(atext);

  var bslider = document.createElement('input');
  bslider.id = "bValue";
  bslider.type = 'range';
  bslider.min = 1;
  bslider.max = 10;
  bslider.value = 2;
  bslider.step = 1;
  bslider.oninput = function(){btext.innerText = "Value of B: " + bslider.value; submit.onclick()}
  document.getElementById('form').appendChild(bslider);
  
  var btext = document.createElement('label');
  btext.innerText = "Value of B: 2";
  document.getElementById('form').appendChild(btext);

  var cslider = document.createElement('input');
  cslider.id = "cValue";
  cslider.type = 'range';
  cslider.min = 1;
  cslider.max = 1000;
  cslider.value = 640;
  cslider.step = 1;
  cslider.oninput = function(){ctext.innerText = "Value of C: " + cslider.value; submit.onclick()}
  document.getElementById('form').appendChild(cslider);
  
  var ctext = document.createElement('label');
  ctext.innerText = "Value of C: 640";
  document.getElementById('form').appendChild(ctext);

  var islider = document.createElement('input');
  islider.id = "iValue";
  islider.type = 'range';
  islider.min = 1;
  islider.max = 100;
  islider.value = 20;
  islider.step = 1;
  islider.oninput = function(){itext.innerText = "Value of theta inc: " + islider.value/100000; submit.onclick()}
  document.getElementById('form').appendChild(islider);
  
  var itext = document.createElement('label');
  itext.innerText = "Value of theta inc: .02";
  document.getElementById('form').appendChild(itext);





  var submit = document.createElement('button');
  submit.type = "button";
  submit.innerText = "Submit";
  submit.onclick = function(){console.log("clicked"); 
                              a=Number(aslider.value); 
                              b=Number(bslider.value); 
                              c=Number(cslider.value); 
                              inc = Number(islider.value/100000);
                              drawParametric(a,b,c); }
  document.getElementById('form').appendChild(submit);


  drawParametric(a,b,c);

  function drawParametric(a,b,c){
    clear(ctx);

    // console.log("a",a);
    // console.log("b",b);
    // console.log("c",c);


    for (let theta = 0; theta < 2*Math.PI; theta+=inc){
      r = (a+b*Math.cos(c*theta));
      ctx.fillStyle = 'red';
      // console.log("r",r)
      // console.log("palette", palette)
      ctx.fillStyle = palette[Math.abs(Math.round(265*r)%1529)].color;
      x = Math.cos(theta+Math.PI/4)*r*scale;
      y = Math.sin(theta+Math.PI/4)*r*scale;
      drawPoint(ctx, x, y);
    }
  }

}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
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
// percent: -1 = black bias, 0 = actual, 1 = white bias
function getColor(index, percent){   
  let color = palette[index%1530].color;
  let newColor = shadeRGBColor(color, percent); 
  return newColor;
}

// color:   rgb color 
// percent: -1 = black bias, 0 = actual, 1 = white bias
function shadeRGBColor(color, percent) {
  let f=color.split(","),
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

  console.log(palette);
}

////////////////////////////////////////////////////////

function scrollingBackground(){

  let interval = setInterval(scrollColors, 20, backCtx, -.55);
  return interval;

  function scrollColors(ctx, percent){
    bColor1 = getColor( index%1530, percent);
    // bColor2 = getColor( (index+255)%1530, percent);
    bColor3 = getColor( (index+510)%1530, percent);
    // bColor4 = getColor( (index+765)%1530, percent);
    bColor5 = getColor( (index+1020)%1530, percent);
    // bColor6 = getColor( (index+1275)%1530, percent);

    let gradient = ctx.createRadialGradient(0,0,width/20, 0,0,width/1.5);

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
// Canvas 2D Properties
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
// Canvas 2D Methods
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
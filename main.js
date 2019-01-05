var canvas = document.querySelector('#xxx');
var context = canvas.getContext('2d');
//获取页面宽高
autoSetCanvasSize(canvas);

//监听canvas事件
listenToMouse(canvas);
//eraser click
var usingEraser = false
var actions = document.querySelector('.actions');
eraser.onclick = function(){
 usingEraser =true
  actions.className = 'actions active'
}
brush.onclick = function(){
   usingEraser = false
  actions.className = 'actions'
}


//获取页面宽高--------------------

function autoSetCanvasSize(canvas){
function size(){
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
canvas.height = pageHeight//加载放大canvas宽高
canvas.width = pageWidth 
  }
size();

//重置宽高后更新
window.onresize = function(){
 size();
}
}

//监听用户鼠标事件---------------------------

function listenToMouse(canvas){
var context = canvas.getContext('2d');
context.fillStyle = "#696562";
context.strokeStyle = "#696562";


//画圈行为
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill()
}
//划线行为
function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1)
  context.lineWidth = 2
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
}

var painting = false   //判断是否在划线
var lastPoint = {x:undefined, y: undefined}//找出上一个点，用于连接和划线

//按下鼠标
canvas.onmousedown = function(a){
  var x = a.clientX
  var y = a.clientY
  painting = true //开启绘画模式
  if(usingEraser){
    context.clearRect(x-10,y-10,20,20)
  }
  else{  
  var lastPoint = {"x":x,"y":y} //找出上次的点
  }
}
//动鼠标
canvas.onmousemove = function(a){
  var x = a.clientX
  var y = a.clientY

   if(usingEraser){
     if(painting){
    context.clearRect(x-10,y-10,20,20)}
  }else {
     if(painting){

  var newPoint = {"x":x,"y":y};//找出新的点
  drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
  lastPoint = newPoint //实时更新上一个点
  }
  }
}
//松开鼠标
canvas.onmouseup = function(a){
  painting = false
  lastPoint = {x:undefined, y: undefined}
}
}
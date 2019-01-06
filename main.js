var canvas = document.querySelector('#xxx');
var context = canvas.getContext('2d');
//获取页面宽高
autoSetCanvasSize(canvas);

//监听canvas事件
listenToUser(canvas);
//笔刷和橡皮点击事件
var usingEraser = false
var actions = document.querySelector('.actions');
eraser.onclick = function() {
  usingEraser = true
  eraser.classList.add('active')
  pen.classList.remove('active')
  clean.classList.remove('active')
  save.classList.remove('active')
}
pen.onclick = function() {
  usingEraser = false
  pen.classList.add('active')
  eraser.classList.remove('active')
  clean.classList.remove('active')
  save.classList.remove('active')
  context.fillStyle = '#696562'
  context.strokeStyle = '#696562'
}
clean.onclick = function() {
  usingEraser = false
  clean.classList.add('active')
  eraser.classList.remove('active')
  pen.classList.remove('active')
  save.classList.remove('active')
  context.clearRect(0, 0, canvas.width, canvas.height);
}
save.onclick = function() {
  save.classList.add('active')
  eraser.classList.remove('active')
  pen.classList.remove('active')
  clean.classList.remove('active')
  //下载图片
  var url = canvas.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'my canvas'
  a.target = '_blank'
  a.click()
}

//颜色转换
black.onclick = function() {
  context.fillStyle = '#3A5791'
  context.strokeStyle = '#3A5791'
}
red.onclick = function() {
  context.fillStyle = '#CA7471'
  context.strokeStyle = '#CA7471'
}
blue.onclick = function() {
  context.fillStyle = '#74ADB3'
  context.strokeStyle = '#74ADB3'
}
yellow.onclick = function() {
  context.fillStyle = '#E0AE6E'
  context.strokeStyle = '#E0AE6E'
}

//获取页面宽高--------------------

function autoSetCanvasSize(canvas) {
  function size() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.height = pageHeight //加载放大canvas宽高
    canvas.width = pageWidth
  }
  size();

  //重置宽高后更新r
  window.onresize = function() {
    size();
  }
}

//监听用户鼠标事件---------------------------

function listenToUser(canvas) {
  var context = canvas.getContext('2d');
  // context.fillStyle = "#696562";
  // context.strokeStyle = "#696562";


  //画圈行为
  function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
  }
  //划线行为
  function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1)
    context.lineWidth = 2
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
  }

  var painting = false //判断是否在划线
  var lastPoint = {
    x: undefined,
    y: undefined
  } //找出上一个点，用于连接和划线

  //特性检测---------------------------********
  if (document.body.ontouchstart !== undefined) {
    //触屏设备-----------
    canvas.ontouchstart = function(a) {
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      painting = true
      if (usingEraser) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(a) {
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY

      if (usingEraser) {
        if (painting) {
          context.clearRect(x - 10, y - 10, 20, 20)
        }
      } else {
        if (painting) {
          var newPoint = {
            "x": x,
            "y": y
          };
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint
        }
      }

    }
    canvas.ontouchend = function(a) {
      painting = false
      lastPoint = {
        x: undefined,
        y: undefined
      }
    }
  } else {
    //非触屏设备-----------

    //按下鼠标
    canvas.onmousedown = function(a) {
      var x = a.clientX
      var y = a.clientY
      painting = true //开启绘画模式
      if (usingEraser) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        var lastPoint = {
          "x": x,
          "y": y
        } //找出上次的点
      }
    }
    //动鼠标
    canvas.onmousemove = function(a) {
      var x = a.clientX
      var y = a.clientY

      if (usingEraser) {
        if (painting) {
          context.clearRect(x - 10, y - 10, 20, 20)
        }
      } else {
        if (painting) {

          var newPoint = {
            "x": x,
            "y": y
          }; //找出新的点
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          lastPoint = newPoint //实时更新上一个点
        }
      }
    }
    //松开鼠标
    canvas.onmouseup = function(a) {
      painting = false
      lastPoint = {
        x: undefined,
        y: undefined
      }
    }
  }

}

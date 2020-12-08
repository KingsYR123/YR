Game2048.prototype = {
  constructor: Game2048,

  // 开始游戏init
  init: function () {

    /*随机生成名字后端测试用*/
    this.name=Math.random().toString(36).slice(-4);

    this.score = 0;
    this.arr = [];
    this.moveAble = false;
    this.Max_Num = 0;
    this.Max_Num_x = -1;
    this.Max_Num_y = -1;
    $("#score").html("0");
    $(".number_cell").remove();
    this.creatArr();

    /* 预先发送一次玩家数据
    let tmpName=this.name;
    let tmpScore=this.score;
    let tmpArr=this.arr;
    console.log('client',tmpArr);
    setTimeout(function(){
      sendScore(tmpName,tmpScore,tmpArr);
    }, 100);*/
  },

  // 更新数列使得游戏进入初始阶段
  creatArr: function () {
    var i, j;
    for (i = 0; i < 4; i++) {
      this.arr[i] = [];
      for (j = 0; j < 4; j++) {
        this.arr[i][j] = {};
        this.arr[i][j].value = 0;
      }
    }
    var i1, i2, j1, j2;

    i1 = getRandom(3);
    j1 = getRandom(3);

    this.arrValueUpdate(2, i1, j1);
    this.drawCell(i1, j1);
  },

  drawCell: function (i, j) {
    var item =
      '<div class="number_cell pos' +
      i +
      j +
      '" ><a class="number_cell_con n'+this.arr[i][j].value+'"><div class="span_wrap"><span>' +
      this.arr[i][j].value +
      "</span></div></a></div>";
    $(".box").append(item);
  },

  addEvent: function () {
    var that = this;

    document.onkeydown = function (event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      var direction = that.direction;
      var keyCode = e.keyCode;
      switch (keyCode) {
        case 39:
          that.moveAble = false;
          that.moveRight();
          that.Get_Max_Num();
          that.checkLose();
          sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
          break;

        case 40:
          that.moveAble = false;
          that.moveDown();
          that.Get_Max_Num();
          that.checkLose();
          sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
          break;

        case 37:
          that.moveAble = false;
          that.moveLeft();
          that.Get_Max_Num();
          that.checkLose();
          sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
          break;

        case 38:
          that.moveAble = false;
          that.moveUp();
          that.Get_Max_Num();
          that.checkLose();
          sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
          break;
      }
    };
  },

  touchEvent: function () {
    var that = this;
    //滑动处理
    var startX, startY;
    document.addEventListener(
      "touchstart",
      function (ev) {
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;
      },
      false
    );
    document.addEventListener(
      "touchend",
      function (ev) {
        var endX, endY;
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = GetSlideDirection(startX, startY, endX, endY);
        switch (direction) {
          case 0:
            break;
          case 1:
            that.moveAble = false;
            that.moveUp();
            that.Get_Max_Num();
            that.checkLose();

            sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
            break;
          case 2:
            that.moveAble = false;
            that.moveDown();
            that.Get_Max_Num();
            that.checkLose();

            sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
            break;
          case 3:
            that.moveAble = false;
            that.moveLeft();
            that.Get_Max_Num();
            that.checkLose();

            sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
            break;
          case 4:
            that.moveAble = false;
            that.moveRight();
            that.Get_Max_Num();
            that.checkLose();

            sendScore(that.name,that.score,that.arr, that.Max_Num, that.Max_Num_x, that.Max_Num_y);
            break;
          default:
        }
      },
      false
    );
  },

  arrValueUpdate: function (num, i, j) {
    this.arr[i][j].oldValue = this.arr[i][j].value;
    this.arr[i][j].value = num;
  },

  newCell: function () {
    var i, j, len, index;
    var ableArr = [];
    if (this.moveAble != true) {
      console.log("请尝试其他方向移动！");
      return;
    }
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        if (this.arr[i][j].value == 0) {
          ableArr.push([i, j]);
        }
      }
    }
    len = ableArr.length;
    if (len > 0) {
      index = getRandom(len);
      i = ableArr[index][0];
      j = ableArr[index][1];
      this.arrValueUpdate(2, i, j);
      this.drawCell(i, j);
    } else {
      return;
    }
  },

  moveDown: function () {
    var i, j, k, n;
    for (i = 0; i < 4; i++) {
      n = 3;
      for (j = 3; j >= 0; j--) {
        if (this.arr[i][j].value == 0) {
          continue;
        }
        k = j + 1;
        aa: while (k <= n) {
          if (this.arr[i][k].value == 0) {
            if (
              k == n ||
              (this.arr[i][k + 1].value != 0 &&
                this.arr[i][k + 1].value != this.arr[i][j].value)
            ) {
              this.moveCell(i, j, i, k);
            }
            k++;
          } else {
            if (this.arr[i][k].value == this.arr[i][j].value) {
              this.mergeCells(i, j, i, k);
              n--;
            }
            break aa;
          }
        }
      }
    }
    this.newCell();
  },

  moveUp: function () {
    var i, j, k, n;
    for (i = 0; i < 4; i++) {
      n = 0;
      for (j = 0; j < 4; j++) {
        if (this.arr[i][j].value == 0) {
          continue;
        }
        k = j - 1;
        aa: while (k >= n) {
          if (this.arr[i][k].value == 0) {
            if (
              k == n ||
              (this.arr[i][k - 1].value != 0 &&
                this.arr[i][k - 1].value != this.arr[i][j].value)
            ) {
              this.moveCell(i, j, i, k);
            }
            k--;
          } else {
            if (this.arr[i][k].value == this.arr[i][j].value) {
              this.mergeCells(i, j, i, k);
              n++;
            }
            break aa;
          }
        }
      }
    }
    this.newCell();
  },

  moveLeft: function () {
    var i, j, k, n;

    for (j = 0; j < 4; j++) {
      n = 0;
      for (i = 0; i < 4; i++) {
        if (this.arr[i][j].value == 0) {
          continue;
        }
        k = i - 1;
        aa: while (k >= n) {
          if (this.arr[k][j].value == 0) {
            if (
              k == n ||
              (this.arr[k - 1][j].value != 0 &&
                this.arr[k - 1][j].value != this.arr[i][j].value)
            ) {
              this.moveCell(i, j, k, j);
            }
            k--;
          } else {
            if (this.arr[k][j].value == this.arr[i][j].value) {
              this.mergeCells(i, j, k, j);
              n++;
            }
            break aa;
          }
        }
      }
    }
    this.newCell();
  },

  moveRight: function () {
    var i, j, k, n;
    for (j = 0; j < 4; j++) {
      n = 3;
      for (i = 3; i >= 0; i--) {
        if (this.arr[i][j].value == 0) {
          continue;
        }
        k = i + 1;
        aa: while (k <= n) {
          if (this.arr[k][j].value == 0) {
            if (
              k == n ||
              (this.arr[k + 1][j].value != 0 &&
                this.arr[k + 1][j].value != this.arr[i][j].value)
            ) {
              this.moveCell(i, j, k, j);
            }
            k++;
          } else {
            if (this.arr[k][j].value == this.arr[i][j].value) {
              this.mergeCells(i, j, k, j);
              n--;
            }
            break aa;
          }
        }
      }
    }
    this.newCell();
  },

  mergeCells: function (i1, j1, i2, j2) {
    //合并
    var temp = this.arr[i2][j2].value;
    var temp1 = temp * 2;
    this.moveAble = true;
    this.arr[i2][j2].value = temp1;
    this.arr[i1][j1].value = 0;
    $(".pos" + i2 + j2).addClass("toRemove");
    var theDom = $(".pos" + i1 + j1)
      .removeClass("pos" + i1 + j1)
      .addClass("pos" + i2 + j2)
      .find(".number_cell_con");
    setTimeout(function () {
      $(".toRemove").remove();
      theDom
        .addClass("n" + temp1)
        .removeClass("n" + temp)
        .find("span")
        .html(temp1);
    }, 200);
    this.score += temp1;
    $("#score").html(this.score);
    if (temp1 == 4) {
      if (confirm("江山代有才人出~~~")) {
        picture_win();
        this.init();
      }
  
    }
  },

  moveCell: function (i1, j1, i2, j2) {
    this.arr[i2][j2].value = this.arr[i1][j1].value;
    this.arr[i1][j1].value = 0;
    this.moveAble = true;
    $(".pos" + i1 + j1)
      .removeClass("pos" + i1 + j1)
      .addClass("pos" + i2 + j2);
  },

  // 得到最大的单元格的位置和大小
  Get_Max_Num: function() {
    var i, j, temp
    temp = this.Max_Num;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        if (temp < this.arr[i][j].value) {
          temp = this.arr[i][j].value
          this.Max_Num = temp
          this.Max_Num_x = i
          this.Max_Num_y = j
        }
      }
    }
    console.log("temp为：" + temp + "最大值为：" + this.Max_Num + "最大值x为：" + this.Max_Num_x + "最大值y为：" + this.Max_Num_y)
  },

  checkLose: function () {
    //判断游戏结束
    var i, j, temp;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        temp = this.arr[i][j].value;
        if (temp == 0) {
          return false;
        }
        if (this.arr[i + 1] && this.arr[i + 1][j].value == temp) {
          return false;
        }
        if (
          this.arr[i][j + 1] != undefined &&
          this.arr[i][j + 1].value == temp
        ) {
          return false;
        }
      }
    }
    if (confirm("百尺竿头，更进一步！")) {
      this.init();

    }
    picture_loss()
    return true;
  },
};

//弹出自定义提示窗口
var showAlert = function (msg, url) {
  //弹框存在
  if ($("#alert_box").length > 0) {
    $("#pop_box_msg").html(msg);
  } else {
    var alertHtml =
      '<div id="alert_box" class="pop_box">' +
      '<div class="center_wrap">' +
      '<div class="pop_center">' +
      '<div class="pop_head"></div>' +
      '<span id="pop_box_msg">' +
      msg +
      "</span>" +
      '<button class="closebtn" onclick="closeAlert()">再来一次</button>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(alertHtml);
  }
  $("#alert_box").show();
  if (url) {
    setTimeout(function () {
      window.location.href = url + "?id=" + 10000 * Math.random();
    }, 2000);
  }
};

//重定义alert
window.alert = showAlert;
//点击遮罩关闭
function closeAlert() {
  $("#alert_box").hide();
}

//排行榜在这里 静静等待后台传数据

function showRanking() {
  if ($("#ranking_box").length > 0) {
  } else {
    //id名为rank_cell  的div块随用户玩获取成绩而增++
    //id ranking 排名1 2 3...
    //id headpic 用户头像
    //id name 用户名
    //id score 用户成绩
    //
    var rankingHtml =
      '<div id="ranking_box" class="pop_box">' +
      '<div class="center_wrap">' +
      '<div class="pop_center">' +
      '<div class="pop_head"><b>排行榜</b></div>' +
      '<div class="rank_wrap">' +
      '<div id="rank_cell">' +
      '<span id="ranking" class="ranking">1</span>' +
      '<img id="headpic" class="headpic">' +
      '<span id="name" class="name">SuperZZQ</span>' +
      '<span id="myscore" class="myscore"></span>' +
      "</div>" +
      '</div><div class="close" onclick="closeRanking()">+</div>' +
      "</div>" +
      "</div>" +
      "</div>";
    $("body").append(rankingHtml);
    $("#myscore").html(this.score);
  }
  $("#ranking_box").show();
}

function closeRanking() {
  $("#ranking_box").hide();
}

function GetSlideAngle(dx, dy) {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
  var dy = startY - endY;
  var dx = endX - startX;
  var result = 0;
  //滑动距离太短
  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    return result;
  }
  var angle = GetSlideAngle(dx, dy);
  if (angle >= -45 && angle < 45) {
    result = 4;
  } else if (angle >= 45 && angle < 135) {
    result = 1;
  } else if (angle >= -135 && angle < -45) {
    result = 2;
  } else if (
    (angle >= 135 && angle <= 180) ||
    (angle >= -180 && angle < -135)
  ) {
    result = 3;
  }
  return result;
}

function getRandom(n) {
  return Math.floor(Math.random() * n);
}

function Game2048() {
  this.addEvent();
  this.touchEvent();
}
var g = new Game2048();
g.init();

Notice(64)

function RestartFun() {
  var h = new Game2048();
  h.init();
}

function Notice( num ) {
  var item = 
  '<div class="news_head">警告</div>' + 
  '<div class="news_content">对面已经生成 ' + 
  num +
  ' 辣!</div>';

  $(".news").append(item);
  setTimeout(function () { 
    $(".news").empty(item);
  }, 500);
  setTimeout(function () { 
    $(".news").append(item);
  }, 1000);
  setTimeout(function () { 
    $(".news").empty(item);
  }, 1500);
  setTimeout(function () { 
    $(".news").append(item);
  }, 2000);
  setTimeout(function () { 
    $(".news").empty(item);
  }, 2500);
  setTimeout(function () { 
    $(".news").append(item);
  }, 3000);
  setTimeout(function () { 
    $(".news").empty(item);
  }, 6500);
}


function picture_win() {
  var item = '<div id="dataImage" style="no-repeat;z-index:-1;">'    
	'<img src="F:\字节\all\backend_updated\target\classes\static\images\win.jpg" style="width:100%;height:100%" /> ' 
'</div>';
  $(".dataImage").append(item);
}

function picture_loss() {
  var item = '<div id="dataImage" style="no-repeat;z-index:-1;">'    
	'<img src="F:\字节\all\backend_updated\target\classes\static\images\lose.jpg" style="width:100%;height:100%" /> ' 
'</div>';
  $(".dataImage").append(item);
}

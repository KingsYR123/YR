var stompClient = null;
/*记录玩家们的列表（姓名，分数，游戏盘）*/
/* 比如 [{"name":"n75q(randomForTest)","score":"0.0","playBoard":[[0,0,0,2],[0,0,0,0],[0,0,0,2],[0,0,0,0]]}
,{"name":"y7zv(randomForTest)","score":"0.0","playBoard":[[0,2,0,0],[0,0,0,2],[0,0,0,0],[0,0,0,0]]}]*/
var myList;

//连接服务器
connect();

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        /* 申请topic/Scores，client每send一次，就会执行一次funtion中的函数*/
        stompClient.subscribe('/topic/Scores', function (greeting) {
            updateMyList(JSON.parse(greeting.body));
        });
    });
}

/*发送数据到服务器端*/
function sendScore(name,score,arr,max,max_x,max_y) {
    /* 提取arr */
    var playBoard=new Array();
    var i, j;
    for (i = 0; i < 4; i++) {
        playBoard[i] = new Array();
        for (j = 0; j < 4; j++) {
            playBoard[i][j]=arr[i][j].value;
        }
    }


    console.log(JSON.stringify({
        'name': name,
        'score': score,
        'playboard':playBoard,
        'max':max,
        'max_x':max_x,
        'max_y':max_y
    }));
    stompClient.send("/app/hello", {}, JSON.stringify({
        'name': name,
        'score': score,
        'playBoard':playBoard,
        'max':max,
        'max_x':max_x,
        'max_y':max_y
    }));
}

/* 更新前端排行榜 */
function updateRanking(){
    var tmplist=myList; //玩家列表
    /*mylist（两个人）*/
    if(myList.length==2){
        if(parseFloat(tmplist[0].score)<parseFloat(tmplist[1].score)){
            document.getElementById("rank_1").innerHTML="1";
            document.getElementById("rankName_1").innerHTML=tmplist[1].name;
            document.getElementById("rankScore_1").innerHTML=tmplist[1].score;
            document.getElementById("rank_2").innerHTML="2";
            document.getElementById("rankName_2").innerHTML=tmplist[0].name;
            document.getElementById("rankScore_2").innerHTML=tmplist[0].score;
        }else{
            document.getElementById("rank_2").innerHTML="2";
            document.getElementById("rankName_2").innerHTML=tmplist[1].name;
            document.getElementById("rankScore_2").innerHTML=tmplist[1].score;
            document.getElementById("rank_1").innerHTML="1";
            document.getElementById("rankName_1").innerHTML=tmplist[0].name;
            document.getElementById("rankScore_1").innerHTML=tmplist[0].score;
        }
    }/*mylist（一个人）*/
    else{
        document.getElementById("rank_1").innerHTML="1";
        document.getElementById("rankName_1").innerHTML=tmplist[0].name;
        document.getElementById("rankScore_1").innerHTML=tmplist[0].score;
    }
}

/*每当对方做出操作，更新缩略图*/
function updateBoard(){
    var opponentBoard=new Array();
    /*判断一下哪个是对手的游戏盘*/
    var i,j;
    /*若当前页面的名字不等于myList[0].name，则myList[0].playBoard是对手的游戏盘（4*4的二维数组）*/
    if(myList[0].name!=g.name){
        for(i=0;i<4;i++){
            opponentBoard[i]=new Array();
            for(j=0;j<4;j++)
                opponentBoard[i][j]=myList[0].playBoard[i][j];
        }
    }
    /*反之，myList[1].playBoard是对手的游戏盘*/
    else{
        for(i=0;i<4;i++){
            opponentBoard[i]=new Array();
            for(j=0;j<4;j++)
                opponentBoard[i][j]=myList[1].playBoard[i][j];
        }
    }

    /*画出对手的缩略图*/
    for(i=0;i<4;i++)
        for(j=0;j<4;j++){
            //console.log(opponentBoard[i][j]);
            var item =
                        '<div class="number_cell2 spos' +
                        i +
                        j +
                        '" ><a class="number_cell_con2 sn' +
                        0 +
                        '"><div class="span_wrap2"><span>' +
                        0 +
                        "</span></div></a></div>";
                        $(".box2").append(item);
        }

    for (i = 0; i < 4; i++) {
          for (j = 0; j < 4; j++)
           {
            var item =
            '<div class="number_cell2 spos' +
            i +
            j +
            '" ><a class="number_cell_con2 sn' +
            opponentBoard[i][j] +
            '"><div class="span_wrap2"><span>' +
            opponentBoard[i][j] +
            "</span></div></a></div>";
            $(".box2").append(item);
          }


}

}

/* 每当client发送一次数据， 更新一次列表 */
function updateMyList(message) {
    myList=message;
    updateRanking();

    /*有两个玩家时画出缩略图*/
    if(myList.length==2)
        updateBoard();
}


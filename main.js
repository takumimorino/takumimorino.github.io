'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const start = document.getElementById('start');
const div = document.querySelector('div');

//ボタンを予め用意しておいてあとでDOMに追加する
//名前入力ボックス
const name1 = document.createElement('input');
name1.value = 'Tom';
const name2 = document.createElement('input');
name2.value = 'Bob';
const name3 = document.createElement('input');
name3.value = 'Tim';
//名前確定ボタン
const ok = document.createElement('button');
ok.textContent = '名前を確定する';
//準備OKボタン
const ready = document.createElement('button');
ready.textContent = '準備OK';
//役職確認ボタン
const check = document.createElement('button');
check.textContent = '役職を見る';
//役職確認終了ボタン
const checked = document.createElement('button');
checked.textContent = '確認終了';
//話し合い終了ボタン
const end = document.createElement('button');
end.textContent = '話し合い終了';
//投票ボタン
const judge1 = document.createElement('button');
const judge2 = document.createElement('button');
const judge3 = document.createElement('button');
//投票結果見るボタン
const result = document.createElement('button');
result.textContent = '投票結果を見る';
//順位発表ボタン
const ranking = document.createElement('button');
ranking.textContent = '順位発表';
//もう一回プレイボタン
const replay = document.createElement('a');
replay.href = '';
replay.textContent = 'もう一度プレイ';


let i = 0;             //whoseTurnのフェイズ確認用
let j = 0;             //誰から誰への投票かの、誰からの判定用
let arrow1 = 0;        //1番目の人の矢印
let arrow2 = 0;        //2番目の人の矢印
let arrow3 = 0;        //3番目の人の矢印
let judgeCount1 = 0;    //投票された数
let judgeCount2 = 0;   //投票された数
let judgeCount3 = 0;    //投票された数
let rank1;         //一番目の人の順位（０から数える）
let rank2;         //二番目の人の順位
let rank3;         //三番目の人の順位
let array = [0, 1, 2];   //役職用
let role1;         //一番目の人の役職（0:Joker, 1:Normal, 2:Ace)
let role2;         //二番目の人の役職（0:Joker, 1:Normal, 2:Ace)
let role3;         //三番目の人の役職（0:Joker, 1:Normal, 2:Ace)
let role1Name;
let role2Name;
let role3Name;


//役職を振り分ける
role1 = array.splice(Math.floor(Math.random() * 3), 1)[0];
role2 = array.splice(Math.floor(Math.random() * 2), 1)[0];
role3 = array.splice(Math.floor(Math.random() * 1), 1)[0];
//数字と役職名をリンク
switch (role1) {
    case 0:
        role1Name = 'Joker';
        break;
    case 1:
        role1Name = 'Normal';
        break;
    case 2:
        role1Name = 'Ace';
        break;
}
switch (role2) {
    case 0:
        role2Name = 'Joker';
        break;
    case 1:
        role2Name = 'Normal';
        break;
    case 2:
        role2Name = 'Ace';
        break;
}
switch (role3) {
    case 0:
        role3Name = 'Joker';
        break;
    case 1:
        role3Name = 'Normal';
        break;
    case 2:
        role3Name = 'Ace';
        break;
}


console.log(role1, role2, role3);

ctx.font = 'bold 60px Verdana';
if (screen.width < 1600) {
    ctx.font = 'bold 48　　　　px Verdana'
}
ctx.textBaseline = 'top';
ctx.fillStyle  = 'skyblue';

// スタート画面描写
function drawstart() {
    ctx.fillText('誰がJoker持ってるの？', 50, 50);
}
drawstart();


// 名前教えての画面描写
start.addEventListener('click', () => {
    console.log('ok');
    ctx.clearRect(0, 0, 800, 500);
    ctx.fillText('三人の名前をおしえてね', 50, 50);
    div.removeChild(start);
    div.appendChild(name1);
    div.appendChild(name2);
    div.appendChild(name3);
    div.appendChild(ok);
});


// 名前取得
ok.addEventListener('click', ()=> {
    ctx.clearRect(0, 0, 800, 500);
    ctx.fillText(name1.value + 'さん', 50, 50);
    ctx.fillText(name2.value + 'さん', 50, 150);
    ctx.fillText(name3.value + 'さん', 50, 250);
    ctx.fillText('心の準備はできた？', 50, 350);
    div.removeChild(ok);
    div.removeChild(name1);
    div.removeChild(name2);
    div.removeChild(name3);
    div.appendChild(ready);
});


// 役職確認
function whoseTurn() {              //本人確認と話し合い開始
    ctx.clearRect(0, 0, 800, 500);
    switch( i ) {
        case 0:
            ctx.fillText(name1.value + 'さんの番です', 50, 50);
            break;
        case 1:
            ctx.fillText(name2.value + 'さんの番です', 50, 50);
            break;
        case 2:
            ctx.fillText(name3.value + 'さんの番です', 50, 50);
            break;
        case 3:
            ctx.fillText('誰がJokerか', 50, 50);
            ctx.fillText('話し合ってください', 50, 150);
            break;
        case 4:
            ctx.fillText( name1.value + 'さんの投票です', 50, 150);
            div.appendChild(judge2);
            div.appendChild(judge3);
            j = 1;
            break;
        case 5:
            ctx.fillText(name2.value + 'さんの投票です', 50, 150);
            div.removeChild(judge2);
            div.removeChild(judge3);
            div.appendChild(judge1);
            div.appendChild(judge3);
            j = 2;
            break;
        case 6:
            ctx.fillText(name3.value + 'さんの投票です', 50, 150);
            div.removeChild(judge1);
            div.removeChild(judge3);
            div.appendChild(judge1);
            div.appendChild(judge2);
            j = 3;
            break;
        case 7:
            ctx.fillText('投票が終わりました', 50, 50);
            div.removeChild(judge1);
            div.removeChild(judge2);
            div.appendChild(result);
    }
    i++;
}

function positionView() {               //役職を見せてゆく
    ctx.clearRect(0, 0, 800, 500);
    ctx.fillText('あなたの役職は', 50, 50);
    switch( i - 1 ) {
        case 0:
            ctx.fillText(role1Name + 'です', 50, 150);
            break;
        case 1:
            ctx.fillText(role2Name + 'です', 50, 150);
            break;
        case 2:
            ctx.fillText(role3Name + 'です', 50, 150);
            break;
    }
}




ready.addEventListener('click', () => {
    whoseTurn();
    div.removeChild(ready);
    div.appendChild(check);
});

check.addEventListener('click', () => {
    positionView();
    div.removeChild(check);
    div.appendChild(checked);
});

checked.addEventListener('click', () => {
    whoseTurn();
    div.removeChild(checked);
    if (i > 3) {
        div.appendChild(end);
    } else {
        div.appendChild(check);
    }
});


end.addEventListener('click', () => {
    judge1.textContent = name1.value + 'さんに投票する';
    judge2.textContent = name2.value + 'さんに投票する';
    judge3.textContent = name3.value + 'さんに投票する';
    whoseTurn();
    div.removeChild(end);
});

judge1.addEventListener('click', () => {
    judgeCount1++;       
    if ( j == 2 ) {       //2番目の人からの指名だったら
        arrow2 = -1;      //矢印2は逆順 
        if (role2 == 2) {    //Aceだったら
            judgeCount1 -= 0.5;
        }
    }
    if ( j == 3 ) {       //3番目の人からの指名だったら
        arrow3 = 1;     //矢印3は正順
        if (role3 == 2) {    //Aceだったら
            judgeCount1 -= 0.5;
        }
    }
    whoseTurn();
});
judge2.addEventListener('click', () => {
    judgeCount2++;
    if ( j == 1 ) {       //1番目の人からの指名だったら
        arrow1 = 1;      //矢印１は正順
        if (role1 == 2) {    //Aceだったら
            judgeCount2 -= 0.5;
        }
    }
    if ( j == 3 ) {       //3番目の人からの指名だったら
        arrow3 = -1;     //矢印3は逆順
        if (role3 == 2) {    //Aceだったら
            judgeCount2 -= 0.5;
        }
    }
    whoseTurn();
});
judge3.addEventListener('click', () => {
    judgeCount3++;
    if ( j == 1 ) {       //1番目の人からの指名だったら
        arrow1 = -1;      //矢印１は逆順
        if (role1 == 2) {    //Aceだったら
            judgeCount3 -= 0.5;
        }
    }
    if ( j == 2 ) {       //2番目の人からの指名だったら
        arrow2 = 1;     //矢印2は正順
        if (role2 == 2) {    //Aceだったら
            judgeCount3 -= 0.5;
        }
    }
    whoseTurn();
});

function threePeople() {     //3人の名前と枠と役職を描画
    //一人目
    ctx.fillText(name1.value, canvas.width / 2 - 100, 60, 200);
    ctx.strokeRect(canvas.width / 2 - 100, 55, 200, 60);
    ctx.fillText(role1Name, canvas.width / 2 -100, 0, 200);
    //二人目
    ctx.fillText(name2.value, 0, canvas.height - 100, 200);
    ctx.strokeRect(0, canvas.height - 105, 200, 60);
    ctx.fillText(role2Name, 0, canvas.height - 155, 200);
    //３人目
    ctx.fillText(name3.value, canvas.width - 200, canvas.height - 100, 200);
    ctx.strokeRect(canvas.width - 200, canvas.height - 105, 200, 60);
    ctx.fillText(role3Name, canvas.width - 200, canvas.height - 155, 200);

}

function selectArrow1() {   //1人目の矢印を描画（場合分けもオッケー）
    ctx.beginPath();
    if (arrow1 == 1) {         //正順の場合
        ctx.moveTo(canvas.width / 2, 118);
        ctx.lineTo(canvas.width / 2 - 90, canvas.height - 300);
        ctx.lineTo(canvas.width / 2 - 70, canvas.height - 300);
        ctx.moveTo(canvas.width / 2 - 90, canvas.height - 300);
        ctx.lineTo(canvas.width / 2 - 85, canvas.height - 320);
    } else {                  //逆順の場合
        ctx.moveTo(canvas.width / 2, 118);
        ctx.lineTo(canvas.width / 2 + 90, canvas.height - 300);
        ctx.lineTo(canvas.width / 2 + 70, canvas.height - 300);
        ctx.moveTo(canvas.width / 2 + 90, canvas.height - 300);
        ctx.lineTo(canvas.width / 2 + 85, canvas.height - 320);
    }
    ctx.stroke();
}
function selectArrow2() {   //2人目の矢印を描画（場合分けもオッケー）
    ctx.beginPath();
    if (arrow2 == 1) {        //正順の場合
        ctx.moveTo(200, canvas.height - 80);
        ctx.lineTo(330, canvas.height - 80);
        ctx.lineTo(310, canvas.height - 65);
        ctx.moveTo(330, canvas.height - 80);
        ctx.lineTo(310, canvas.height - 95);
    } else {                 //逆順の場合
        ctx.moveTo(200, canvas.height - 150);
        ctx.lineTo(280, canvas.height - 240);
        ctx.lineTo(280, canvas.height - 220);
        ctx.moveTo(280, canvas.height - 240);
        ctx.lineTo(255, canvas.height - 230);
    }
    ctx.stroke();
}
function selectArrow3() {   //3人目の矢印を描画（場合分けもオッケー）
    ctx.beginPath();
    if (arrow3 == 1) {        //正順の場合
        ctx.moveTo(canvas.width - 200, canvas.height - 150);
        ctx.lineTo(canvas.width - 280, canvas.height - 240);
        ctx.lineTo(canvas.width - 280, canvas.height - 220);
        ctx.moveTo(canvas.width - 280, canvas.height - 240);
        ctx.lineTo(canvas.width - 255, canvas.height - 230);

    } else {                 //逆順の場合
        ctx.moveTo(canvas.width - 200, canvas.height - 80);
        ctx.lineTo(canvas.width - 330, canvas.height - 80);
        ctx.lineTo(canvas.width - 310, canvas.height - 65);
        ctx.moveTo(canvas.width - 330, canvas.height - 80);
        ctx.lineTo(canvas.width - 310, canvas.height - 95);
    }
    ctx.stroke();
}


result.addEventListener('click', ()=> {
    ctx.clearRect(0, 0, 800, 500);
    console.log(name1.value + 'に' + judgeCount1 + '票');
    console.log(name2.value + 'に' + judgeCount2 + '票');
    console.log(name3.value + 'に' + judgeCount3 + '票');
    console.log(arrow1);
    console.log(arrow2);
    console.log(arrow3);

    threePeople();
    selectArrow1();
    selectArrow2();
    selectArrow3();

    div.appendChild(ranking);
    div.appendChild(replay);
});



function makeTable() {   //順位確定、順位入りの表を作成
//順位確定
    const ranks = [0, 1, 2];          // ０位、１位、２位を準備
    if (role1 == 2) {             //一人目がAceの場合
        rank1 = 2 - judgeCount1  ;    //Aceの順位を確定
        ranks.splice(rank1, 1);     //ranksからAceの順位を取り除く
        if (judgeCount2 < judgeCount3) {      //2人目が3人目より勝つ場合
            rank2 = ranks[0];
            rank3 = ranks[1];
        } else{        //2人目が3人目より負ける場合
            rank2 = ranks[1];
            rank3 = ranks[0];
        }
    }
    if (role2 == 2) {            //２人目がAceの場合
        rank2 = 2 - judgeCount2;    //Aceの順位を確定
        ranks.splice(rank2, 1);     //ranksからAceの順位を取り除く
        if (judgeCount1 < judgeCount3) {      //一人目が3人目より勝つ場合
            rank1 = ranks[0];
            rank3 = ranks[1];
        } else{        //一人目が3人目より負ける場合
            rank1 = ranks[1];
            rank3 = ranks[0];
        }
    }
    if (role3 == 2) {            //３人目がAceの場合
        rank3 = 2 - judgeCount3;    //Aceの順位を確定
        ranks.splice(rank3, 1);     //ranksからAceの順位を取り除く
        if (judgeCount1 < judgeCount2) {      //一人目が二人目より勝つ場合
            rank1 = ranks[0];
            rank2 = ranks[1];
        } else{        //一人目が二人目より負ける場合
            rank1 = ranks[1];
            rank2 = ranks[0];
        }
    }


//表の線を描画
    ctx.beginPath();
    ctx.moveTo(0,80);
    ctx.lineTo(canvas.width,80);
    ctx.moveTo(0,canvas.height / 3 + 80);
    ctx.lineTo(canvas.width, canvas.height / 3 + 80);
    ctx.moveTo(0, canvas.height * 2 / 3 + 80);
    ctx.lineTo(canvas.width, canvas.height * 2 / 3 + 80);
    ctx.stroke();
    console.log(canvas.height);
    console.log('ueue');
//1st 2nd 3rd を描画
    ctx.fillText('1st', 10, 10, canvas.width / 3);
    ctx.fillText('2nd', 10, 10 + canvas.height / 3, canvas.width / 3);
    ctx.fillText('3rd', 10, 10 + canvas.height * 2 / 3, canvas.width / 3);

//名前を描画
    ctx.fillText(name1.value + 'さん', canvas.width / 2 + 10, canvas.height / 3 * rank1, canvas.width / 2 - 20);
    ctx.fillText(name2.value + 'さん', canvas.width / 2 + 10, canvas.height / 3 * rank2, canvas.width / 2 - 20);
    ctx.fillText(name3.value + 'さん', canvas.width / 2 + 10, canvas.height / 3 * rank3, canvas.width / 2 - 20);
}


ranking.addEventListener('click', () => {
    ctx.clearRect(0, 0, 800, 500);
    //表をつくる
    makeTable();
});





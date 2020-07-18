'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

//ここから 指定した子要素を削除する処理と、診断結果を表示する処理の２つを関数かする記述

//指定した子要素を削除する関数
/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {  //引数は好きな名前を付ける
  while (element.firstChild) {  // result-areaに、何かタグがある限りtrueになりループ
    element.removeChild(element.firstChild); //子要素がある限り削除
  }
}

//診断結果を表示する関数
/**
 * 指定した要素に診断結果用のタグを設定する
 * @param {HTMLElement} element HTMLの要素
 * @param {string} result 診断結果のテキスト
 */
function appendAssessmentResult(element, result) {
  // result-areaにh3タグで診断結果という文字を表示
  const h3 = document.createElement('h3'); //h3タグを作る
  h3.innerText = '診断結果';              //h3にテキストを書く
  element.appendChild(h3);       //result-areaにh3変数を設定
  
  // pタグで診断結果を表示
  const p = document.createElement('p');
  p.innerText = result;
  element.appendChild(p);
}

//ツイートボタンを表示する関数
/**
 * 指定した要素に属性を設定する
 * @param {HTMLElement} element HTMLの要素
 * @param {string} massage ツイート本文
 */
function anchorSetAttribute(element, massage) {
  //aタグを作って属性を設定する
  const a = document.createElement('a');
  const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ') //日本語をURIエンコードで半角英数文字列に変換
    +'&ref_src=twsrc%5Etfw';
  a.setAttribute('href',hrefValue); //setAttributeで作ったタグにhrefの一文（属性と値）をセット（追加）する
  a.setAttribute('class','twitter-hashtag-button');   //a.className = 'twitter-hashtag-button'; こういう書き方もある
  a.setAttribute('data-text',massage);
  a.innerText = 'Tweet #あなたのいいところ';

  // tweetDivided.appendChild(a); //aタグをHTMLとして設定追加する (関数化してなかったときの記述)
  element.appendChild(a); //関数化したので引数elementに書き換え
  
  //scriptタグを作る
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  // tweetDivided.appendChild(script); //scriptタグをHTMLに追加する (関数化してなかった時の記述)
  element.appendChild(script); //関数化したので引数elementに書き換え
}
  
// ここまでが２つの処理を関数化した記述、それぞれremoveAllChildrenとshowAssessmentResultという関数にまとめた


// ↓設定した変数”assessmentButton”をクリックしたときに処理を記述
assessmentButton.onclick = function() {   //再利用する予定がない関数は無名関数(引数無)にしてOK
    const userName = userNameInput.value;
    if(userName.length === 0){ //名前の入力がなかった場合はreturnで処理中断
      return;
    }

  // 診断結果の表示
  removeAllChildren(resultDivided);  // すでにある診断結果を削除、上で関数化してるのでこれだけの記述でOK
   const result = assessment(userName); // 診断結果をresultという変数に入れる
  appendAssessmentResult(resultDivided, result); // 診断(アセスメント)の結果を表示する。（同じく上で関数化している）
 
  // todo ツイートエリアの作成
  // tweetボタンの表示とリセット
  removeAllChildren(tweetDivided); // 同じ関数でTweetエリアも削除する
  anchorSetAttribute(tweetDivided, result); //上で関数化したものを表示
}


// 入力欄でEnterキーを押した時の処理
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
    // ボタンのonclick()処理を呼び出す
    assessmentButton.onclick(); 
  }
}

const answers = [
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
 function assessment(userName) {
   //全ての文字を足し算する
   let userNameNumber = 0; //userNameNumberを毎回初期化する
   for(let i = 0; i < userName.length; i++) {
     userNameNumber = userNameNumber + userName.charCodeAt(i); // userName(文字列)を数値に変換
   }
   // 変換した数値を回答結果の範囲(0～15)に変換
   let index = userNameNumber % answers.length;
   // 診断結果
   let result = answers[index]
   
   return result.replace(/\{userName\}/g,userName); //文字列の{userName}を関数の値に置換
 }

 // テスト
 console.assert(
  assessment('太郎') === 
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

 console.assert(
  assessment('太郎') === assessment('太郎'),
  '「入力が同じ名前なら、同じ診断結果を出力する」処理が正しくありません。'
);


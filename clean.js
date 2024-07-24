// 人間科学科目
var classNingen = ["フレッシュマンセミナー","文章表現法","論理的思考法","情報と職業","東京電機大学で学ぶ","人間科学プロジェクト","歴史理解の基礎","哲学と倫理の基礎","認知心理学","人間関係の心理","自己心理学セミナー","情報デザインと心理","芸術","実用法律入門","日本国憲法","日本経済入門","介護福祉論","企業と社会","大学と社会","企業と経営","健康と生活","身体運動のしくみ","トリムスポーツI","トリムスポーツII","体力科学演習","アウトドアスポーツA","アウトドアスポーツB","アウトドアスポーツC","技術者倫理","失敗学","情報化社会と知的財産権","製造物責任法","情報倫理","情報とネットワークの経済社会","情報化社会とコミュニケーション","科学と技術の社会史","科学技術と現代社会","科学技術と企業経営","グローバル社会の市民論","比較文化論","地球環境論","国際政治の基礎","ヨーロッパ理解","アメリカ理解","アジア理解","ドイツ語・ドイツ文化","中国語・中国文化"];
// 自然科学概論
var classSizen = ["自然科学概論Ａ","自然科学概論Ｂ","自然科学概論Ｃ","自然科学概論Ｄ","自然科学概論Ｅ","自然科学概論Ｆ","自然科学概論Ｇ"];

// 必修科目
var compulsory = ["微分積分学および演習I", "線形代数学および演習I","基礎物理学Ａ","物理実験","基礎化学","化学・生物実験","ワークショップ","コンピュータリテラシー","コンピュータプログラミングI","電気回路基礎","電磁気学I","電磁気学II","電気回路I","電子回路I","プログラミングI","電子システム工学基礎実験Ｉ","電子システム工学基礎実験ＩＩ","電子システム工学実験Ｉ","電子システム工学実験ＩＩ","プレゼンテーションＩ","プレゼンテーションＩＩ","卒業研究"]



// 削除実行ボタンがクリックされたとき
$(document).on("click","#sakujobutton", function() {
    if($('h2').text().indexOf('授業時間割表') != -1){
        // localStorageから配列・オブジェクト型データを取得する
        let className = localStorage.getItem('className_key'); /*className_keyは単位取得済み科目の配列 */
        className = JSON.parse(className); /*classNameは値受け取り用の配列 */
        
        // 授業時間割表から単位修得済み授業を消去
        // '物理実験'の部分とeq()のインデックスで消す授業を指定する
        for (k=0; k < 10; k++) {
            for (i=0; i < 1000;i++) {
                var a = $('td.colYobi div.jugyo-info div.fontB').eq(i).text();
                console.log(a);
                for (j = 0; j < 1000; j++) {
                    // 履修済み科目を削除
                    if ((a.substring(0, a.indexOf('（')-1) === className[j] || a.substring(0, a.indexOf("(")-1) === className[j] || a.substring(0, a.indexOf(" ")-1) === className[j] || a === className[j]) && document.querySelector('#rishu_delete').checked){
                        $('.jugyo-info.jugyo-normal').eq(i).remove();
                    }

                    // 必修科目をハイライト
                    if (a === compulsory[j]&& document.querySelector('#compulsoryHilight').checked) {
                        $('.jugyo-info.jugyo-normal').eq(i).css("background-color", document.getElementById('color_auto').value);
                    }

                    // 自然科学概論を削除
                    if (a.indexOf(classSizen[j]) !== -1 && document.querySelector('#sizenkagaku').checked){
                        $('.jugyo-info.jugyo-normal').eq(i).remove();
                    }

                    // 人間科学科目を削除
                    if (a.indexOf(classNingen[j]) !== -1 && document.querySelector('#ningenkagaku').checked){
                        $('.jugyo-info.jugyo-normal').eq(i).remove();
                    }   
                }
            }
        }
    }
});


// 手動削除モードのときクリックされた要素を消す
$(document).on("click", ".jugyo-info.jugyo-normal", function (e) {
    // $(this)でイベントが発生した要素を取得して削除する
    if (document.querySelector('#handDelete').checked) {
        $(this).remove();
    }
});

// 手動ハイライトモードのときクリックされた要素をハイライトする
$(document).on("click", ".jugyo-info.jugyo-normal", function (e) {
    // $(this)でイベントが発生した要素を取得して削除する
    if (document.querySelector('#highlight_manual').checked) {
        $(this).css("background-color", document.getElementById('color_manual').value);
    }
});


// 削除実行ボタン(編集ツール)の設置
// セットインターバルしているのは、表示ボタンをクリックすると追加した要素が消えてしまうから
setInterval(function(){
    if($('#sakujobutton').length == 0 ){
        // 設置
        $('.ui-outputpanel.ui-widget.searchArea').append('<fieldset style="border:3px solid gray; display:flex; justify-content: center; align-items: center; width: fit-content;" id="howToDelete"><legend>【編集ツール】</legend><fieldset style="border:3px dashed gray;" id="edit_auto"><legend>【自動】</legend><div class="howToDelete_div"><input type="checkbox" id="compulsoryHilight" name="scales"><label for="scales">必修科目をハイライト</label><form><input id="color_auto" type="color" list="color-list1"><datalist id="color-list1"><option value="#DEFFDE"></option><option value="#FFFFDE"></option><option value="#FFDEFF"></option><option value="#87ceeb"></option><option value="#f4a460"></option></datalist></form></div><div class="howToDelete_div"><input type="checkbox" id="rishu_delete" name="horns"><label for="horns">履修済み科目を削除</label></div><div class="howToDelete_div"><input type="checkbox" id="sizenkagaku" name="horns"><label for="horns">自然科学概論を削除</label></div><div class="howToDelete_div"><input type="checkbox" id="ningenkagaku" name="horns"><label for="horns">人間科学科目を削除</label></div><input id="sakujobutton" type="button" value="チェック項目を実行" ><input id="class_table_storage" type="button" value="保存" ></fieldset><div style="display:block"><fieldset style="border:3px dashed gray;" id="edit_manual"><legend>【手動】</legend><div class="howToDelete_div"><input type="checkbox" id="handDelete" name="horns"><label for="horns">削除</label></div><div class="howToDelete_div" style="display:flex"><input type="checkbox" id="highlight_manual" name="horns"><label for="horns">ハイライト</label><form><input id="color_manual" type="color" list="color-list2"><datalist id="color-list2"><option value="#DEFFDE"></option><option value="#FFFFDE"></option><option value="#FFDEFF"></option><option value="#87ceeb"></option><option value="#f4a460"></option></datalist></form></div></fieldset><br><fieldset style="border:3px dashed gray;" id="edit_viewer"><legend>【保存した時間割を表示】</legend><input type="file" id="selfile"></fieldset></div></fieldset>');
        // '<fieldset style="border:3px dotted gray;" id="howToDelete"><legend>【 消し方 】 </legend><div><input type="checkbox" id="compulsoryHilight" name="scales"><label for="scales">必修科目を強調</label></div><div><input type="checkbox" id="rishu_delete" name="horns"><label for="horns">履修済み科目を削除</label></div><div><input type="checkbox" id="sizenkagaku" name="horns"><label for="horns">自然科学概論を削除</label></div><div><input type="checkbox" id="ningenkagaku" name="horns"><label for="horns">人間科学科目を削除</label></div><div><input type="checkbox" id="handDelete" name="horns"><label for="horns">手動で削除</label></div><input id="sakujobutton" type="button" value="実行" ></fieldset>'
    }
},1000);






// 成績照会から修得済み授業情報を取得
if($('h2').text().indexOf('成績照会') != -1){
    // 修得済み授業情報を取得
    // xは行番号、yは列番号
    var x, y, z, i = 0; var className = [], score = [], text = [];
    for (x = 1; x <= 100; x++) {
        for (y = 1; y <= 5; y++) {
            z = 7 * x + y;
            text[z] = ($('div.ui-datatable-tablewrapper table td').eq(z)).text();
            if ( y == 3 && (text[z] == 'S'|| text[z] == 'A'|| text[z] == 'B'|| text[z] == 'C')) {
                ($('div.ui-datatable-tablewrapper table td').eq(z)).text('S');
                className[i] = text[z-2];
                score[i] = text[z];
                i++
            }
        }
    }
    // localStorageに格納
    let json = JSON.stringify(className, undefined, 1);
    localStorage.setItem('className_key', json);
}
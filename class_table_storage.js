$(document).on("click","#class_table_storage", function(e) {
    // 時間割のhtml要素をtxtファイルとして保存する
        // 1. Blobオブジェクトを作成する
        DLelement = document.querySelector('#funcForm\\:contents').innerHTML;
        const blob = new Blob([DLelement],{type:"text/html"});

        // 2. HTMLのa要素を生成
        const DLlink = document.createElement('a');

        // 3. BlobオブジェクトをURLに変換
        DLlink.href = URL.createObjectURL(blob);

        // 4. ファイル名を指定する
        DLlink.download = '時間割.txt';

        // 5. a要素をクリックする処理を行う
        DLlink.click();
});



$(document).on("mouseover","#funcForm\\:conditionArea", function(e) {
    // 時間割のhtml要素をtxtファイルのhtml要素に置き換える
    console.log("あいうえお");
    var obj1 = document.querySelector("#selfile");
    //ダイアログでファイルが選択された時
    obj1.addEventListener("change",function(evt){
            
        var file = evt.target.files;
        
        //FileReaderの作成
        var reader = new FileReader();
        //テキスト形式で読み込む
        reader.readAsText(file[0]);
            
        //読込終了後の処理
        reader.onload = function(ev){
            document.querySelector('div#funcForm\\:contents').innerHTML = reader.result;
        }
    },false);
});


            


    





    
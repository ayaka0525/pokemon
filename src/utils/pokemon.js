// getAllPokemon 関数は、指定されたURLからポケモンデータを取得し、Promiseオブジェクトを返します
export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        // fetch 関数を使って指定されたURLからデータを取得します
        fetch(url)
         // 取得したレスポンスデータをJSON形式に変換します
         .then((res) => res.json())
         // データが正常に取得できたら resolve 関数を使って返します
         .then((data) => resolve(data))
         // エラー処理を行っていないため、reject は呼ばれていません（必要に応じて追加できます）
    });
};


export const getPokemon = (url) => {
    return new Promise((resolve,reject) => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            resolve(data)

        });
    });

};
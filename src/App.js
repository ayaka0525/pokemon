import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  // ポケモンAPIのエンドポイントURLを変数に格納
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");


   // useEffectフックを使用して、コンポーネントの最初のレンダリング時にAPIを呼び出す
  useEffect (() => {
    // APIからポケモンデータを取得する非同期関数
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    // 関数を実行
    fetchPokemonData(); // 非同期関数の呼び出し




  }, []);// 空の依存配列で、コンポーネントの初回レンダリング時のみ実行

// 非同期関数 loadPokemon：ポケモンデータを取得するための関数
  const loadPokemon = async (data) => {
  // Promise.allを使って、すべてのポケモンデータを同時に取得
  let _pokemonData = await Promise.all(
    data.map(async(pokemon) => {
 // 各ポケモンのURLを元にポケモンデータを取得
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;// 取得したデータを返す
    })

  );
  setPokemonData(_pokemonData);
};
// pokemonDataが更新される前にコンソールログを表示（初期値の確認などに使うことがある）
// console.log(pokemonData);

const handleNextPage = async () => {
  setLoading(true);
  let data = await getAllPokemon(nextURL);
  // console.log(data);
  await loadPokemon(data.results);
  setNextURL(data.next);
  setPrevURL(data.previous);
  setLoading(false);
};
const handlePrevPage = async () => {
  // 前のURLが存在しない場合、何もしない
  if (!prevURL) return;

  // ローディング状態をtrueに設定
  setLoading(true);

  // 前のページのポケモンデータを取得
  let data = await getAllPokemon(prevURL);

  // 取得したポケモンデータをロード
  await loadPokemon(data.results);

  // 次のページのURLを更新
  setNextURL(data.next);

  // 前のページのURLを更新
  setPrevURL(data.previous);

  // ローディング状態をfalseに設定
  setLoading(false);
};

  return (
    <>
    <Navbar />
    <div className="App">
       {/* ローディング中は「ロード中...」を表示 */}
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <div>
            {/* ポケモンのカードを表示するコンテナ */}
        <div className="pokemonCardContainer">
           {/* pokemonDataの各要素（ポケモン）に対して、カードを描画 */}
          {pokemonData.map((pokemon, i) => {
            // 各ポケモンに対して「Card」コンポーネントを描画し、keyにはインデックス「i」を使用
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
        </div>
      )}
      <div className='btn'>
      <button on onClick={handlePrevPage}>前へ</button>
      <button onClick={handleNextPage}>次へ</button>

    </div>

    </div>

    </>
  );
}

export default App;

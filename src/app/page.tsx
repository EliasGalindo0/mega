"use client";

import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Home() {
  const [parameter, setParameter] = useState<number>(6);
  const [games, setGames] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [lastResult, setLastResult] = useState<any>({});

  useEffect(() => {
    const getLastResult = async () => {
      const url = "https://loteriascaixa-api.herokuapp.com/api/megasena/latest";

      const result = await fetch(url);
      const lastResult = await result.json();
      const storedGames = localStorage.getItem("games");
      if (storedGames) {
        setGames(JSON.parse(storedGames));
      }

      setLastResult(lastResult);

      setLoading(false);
    };
    getLastResult();
  }, []);

  const generateNumbers = () => {
    const numeros: number[] = [];
    while (numeros.length < parameter) {
      const numeroAleatorio = Math.floor(Math.random() * 60) + 1;
      if (numeros.indexOf(numeroAleatorio) === -1) {
        numeros.push(numeroAleatorio);
      }
    }
    // Formatar os números como strings de duas casas
    const numerosFormatados = numeros.map((numero) =>
      numero < 10 ? `0${numero}` : `${numero}`
    );
    // Adicionar o novo jogo à lista de jogos
    const newGames = [...games, numerosFormatados];
    setGames(newGames);

    // Armazenar os jogos no armazenamento local
    localStorage.setItem("games", JSON.stringify(newGames));
  };

  const cleanStorage = () => {
    localStorage.removeItem("games");
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex flex-col items-center h-full p-4'>
          {lastResult && lastResult.dezenas ? (
            <div className='mb-4'>
              <p className='font-bold text-lg text-center'>Último Sorteio</p>
              <p className='text-center mb-2'>
                <span className='px-3 py-1 bg-green-600 rounded-full font-bold text-white'>
                  {lastResult.dezenas.join(", ")}
                </span>
              </p>

              <div className='grid grid-cols-2 gap-2'>
                <div className='text-center'>
                  <b>Concurso</b>
                  <p>{lastResult.concurso}</p>
                </div>

                <div className='text-center'>
                  <b>Data</b>
                  <p>{lastResult.data}</p>
                </div>

                <div className='text-center'>
                  <b>Próximo Sorteio</b>
                  <p>{lastResult.dataProximoConcurso}</p>
                </div>

                <div className='text-center'>
                  <b>Próximo Concurso</b>
                  <p>
                    {lastResult.valorEstimadoProximoConcurso.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className='flex flex-col items-center mb-4'>
            <label htmlFor='dez' className='text-sm font-bold mb-2'>
              Dezenas
            </label>
            <input
              id='dez'
              type='number'
              value={parameter}
              onChange={(e) => setParameter(parseInt(e.target.value))}
              className='border rounded-lg text-center w-16 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-2'
            />
            <button
              className='w-full bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'
              onClick={generateNumbers}>
              GERAR JOGO
            </button>
          </div>
          <p className='font-bold text-center mb-2'>Jogos</p>
          {games.length > 0
            ? games.map((game: any, index: number) => (
                <p
                  key={index}
                  className='flex items-center justify-center mb-2'>
                  <span className='px-3 py-1 bg-green-600 rounded-full font-bold text-white'>
                    {game.sort((a: number, b: number) => a - b).join(", ")}
                  </span>
                  {/* <span>{`Vc acertou ${}`}</span> */}
                </p>
              ))
            : null}
          <button
            className='w-1/2 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'
            onClick={cleanStorage}>
            Limpar
          </button>
        </div>
      )}
    </>
  );
}

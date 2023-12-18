"use client";

import { useState } from "react";

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [parameter, setParameter] = useState<number>(6);
  const [results, setResults] = useState<number[]>([]);

  const generateNumbers = () => {
    const numeros: number[] = [];
    while (numeros.length < parameter) {
      const numeroAleatorio = Math.floor(Math.random() * 60) + 1;
      if (numeros.indexOf(numeroAleatorio) === -1) {
        numeros.push(numeroAleatorio);
      }
    }
    setNumbers(numeros);
    setResults((prevResults: any) => [...prevResults, [...numeros] as any]); // Adiciona os novos números ao histórico
  };

  return (
    <main className='flex flex-col items-center justify-between'>
      <div className='flex items-center justify-between border border-gray-600 p-4 mb-4'>
        {numbers.length > 0 && (
          <p className='text-xl'>Números gerados: {numbers.join(", ")}</p>
        )}
      </div>
      <input
        type='number'
        value={parameter}
        onChange={(e) => setParameter(parseInt(e.target.value))}></input>
      <button
        className='rounded bg-green-700 text-white font-bold px-4 py-2 mt-8'
        onClick={generateNumbers}>
        GERAR JOGO
      </button>
      {results.length > 0
        ? results.map((result: any, index: number) => (
            <p key={index}>
              {index + 1} - {result.join(", ")}
            </p>
          ))
        : null}
    </main>
  );
}

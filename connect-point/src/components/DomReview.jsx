"use client"
import { useRef } from "react";

export default function DomReview() {
  const inputRef = useRef(null);

  const destacarTitulo = () => {
    // Exemplo de manipulação direta do DOM
    const titulo = document.querySelector('h2');
    if (titulo) {
      titulo.classList.add('outline', 'outline-4', 'outline-orange-400');
      setTimeout(() => titulo.classList.remove('outline', 'outline-4', 'outline-orange-400'), 1500);
    }
    // Dar foco programático num input via ref
    inputRef.current?.focus();
  };

  return (
    <div className="my-4 p-4 bg-gray-50 rounded-lg">
      <button onClick={destacarTitulo} className="px-4 py-2 rounded bg-purple-600 text-white">
        Revisão do DOM: destacar título e focar input
      </button>
      <input ref={inputRef} placeholder="Exemplo de focus" className="mt-2 p-2 border rounded w-full" />
    </div>
  );
}

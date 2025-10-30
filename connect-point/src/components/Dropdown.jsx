"use client"
import { useState, useRef, useEffect } from "react";

export default function Dropdown({ label = "Opções", items = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="px-3 py-2 rounded bg-gray-200">
        {label}
      </button>
      {open && (
        <div className="absolute mt-2 w-48 bg-white rounded shadow-lg z-10">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => { it.onClick?.(); setOpen(false); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

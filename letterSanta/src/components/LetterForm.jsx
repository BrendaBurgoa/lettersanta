import React from "react";
import { useEffect, useState } from "react";

export default function LetterForm() {
  const [letter, setLetter] = useState("");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
   const [fly, setFly] = useState(false);

  // 👉 Acá van a quedar los datos ya listos para enviar/guardar
  const handleSend = async () => {
        if (!validateEmail(email)) {
      setError("Ingresá un mail válido.");
      return;
    }
    setError("");

    const data = {
      letter,
      email,
      createdAt: new Date().toISOString(),
    };

    console.log("Datos listos para enviar:", data);

    // Ejemplo: enviar a una API propia
    
    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbzD4rn9Lh_EdPfoYRFiowcG2TVpwdVe45kKpcOE8pmdIcP_WbHNpbkIQ9VrOMElZP8mbQ/exec", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
      } catch (err) {
        console.error("Hubo un problema al enviar la carta.:", err);
      }

      setStep(3);
  };

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleEmailContinue = () => {
    if (!validateEmail(email)) {
      setError("Ingresá un mail válido.");
      return;
    }
    setError("");
    setStep(3);
  };

  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setFly(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setFly(false);
    }
  }, [step]);

  return (
    <div className={`card ${fly ? "fly-away" : ""}`}>
      <h1 className="title">
      {step === 1 && "Querido Papá Noel 🎅"}
      {step === 2 && "Dejanos un email!"}
      {step === 3 && (
        <>
          Carta Recibida!
          <br />
          Pronto Papá Noel te contestará 🎅
        </>
      )}
    </h1>
      {step === 1 && (
        <>
          <textarea
            placeholder="Escribí tu cartita acá… 🎁✨"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            style={{ width: "80%", height: "50vh", marginLeft: "3rem", background:"none", fontSize:"1rem" }}
          />

          {letter.length > 5 && (
            <button onClick={() => setStep(2)} style={{ marginTop: "10px" }}>
              Continuar
            </button>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="email"
            placeholder="Un mail para recibir la respuesta ✨."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{  width: "80%", marginLeft: "3rem", background:"none", fontSize:"1rem", padding:"0.5rem"  }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={handleSend} style={{ marginTop: "10px" }}>
            Enviar carta 🎄
          </button>
        </>
      )}

      
    </div>
  );
}

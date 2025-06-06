"use client";
import { useState, useEffect } from "react";

export default function LegalBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("acceptedTerms") === "true";
    setAccepted(hasAccepted);
  }, []);

  const accept = () => {
    localStorage.setItem("acceptedTerms", "true");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#111",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      <p>
        Ao continuar usando este site, você concorda com nossa{" "}
        <a
          href="/privacy"
          style={{ textDecoration: "underline", color: "#0af" }}
        >
          política de privacidade
        </a>{" "}
        e{" "}
        <a href="/terms" style={{ textDecoration: "underline", color: "#0af" }}>
          termos de uso
        </a>
        .
      </p>
      <button
        onClick={accept}
        style={{
          marginTop: "0.5rem",
          background: "#0af",
          color: "#000",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Aceitar
      </button>
    </div>
  );
}

// utils/formatTime.ts
export function formatSurvivalTime(ts: string) {
  // Ex: "2.10:54:28.5972988" ou "739409.10:54:28.5972988"
  // Tenta dividir em dias, horas, minutos, segundos
  if (!ts) return "-";

  // Verifica se tem ponto (.) separando dias
  const [days, rest] = ts.split(".");
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (rest) {
    d = parseInt(days, 10);
    // rest = "HH:MM:SS"
    const [hms] = rest.split(".");
    const [hh, mm, ss] = hms.split(":").map(Number);
    h = hh || 0;
    m = mm || 0;
    s = ss || 0;
  } else {
    // Se não tem dias
    const [hms] = ts.split(".");
    const [hh, mm, ss] = hms.split(":").map(Number);
    h = hh || 0;
    m = mm || 0;
    s = ss || 0;
  }

  let result = "";
  if (d > 0) result += `${d}d `;
  if (h > 0 || d > 0) result += `${h.toString().padStart(2, "0")}:`;
  else result += "00:";
  result += `${m.toString().padStart(2, "0")}:`;
  result += `${s.toString().padStart(2, "0")}`;
  return result.trim();
}

// Fundo fixo atrás de todo o site. Só CSS, então não pesa no JS.
// Posições calculadas na hora (sem Math.random) para não dar erro de hidratação.

const COLORS = ["#ff6b5e", "#ffb547", "#62e3c8", "#f4f0ff"];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 4 + ((i * 7) % 3) * 2,
  duration: 12 + ((i * 5) % 14),
  delay: -((i * 3.1) % 24),
  drift: ((i % 5) - 2) * 36,
  color: COLORS[i % COLORS.length],
}));

const SHOOTING = [
  { top: 6, left: 82, delay: 0, duration: 5 },
  { top: 22, left: 96, delay: 3.2, duration: 6 },
  { top: 12, left: 70, delay: 7, duration: 5.5 },
];

export default function GameBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Brilho do horizonte */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 100%, rgba(255,107,94,.28), rgba(138,63,143,.14) 45%, transparent 75%)",
        }}
      />

      {/* Chão em grade que corre na direção da tela */}
      <div className="fx-grid" />

      {/* Estrelas cadentes */}
      {SHOOTING.map((s, i) => (
        <span
          key={i}
          className="fx-shoot"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Pixels subindo */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="fx-particle"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Scanlines + vinheta de monitor antigo */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,.6) 0 1px, transparent 1px 3px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(8,6,20,.7))" }}
      />
    </div>
  );
}
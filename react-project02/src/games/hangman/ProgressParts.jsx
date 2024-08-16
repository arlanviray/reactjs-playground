function ProgressParts({ fails }) {
  const failParts = [
    // Head
    <circle key={1} cx="140" cy="70" r="20" />,
    // Body
    <line key={2} x1="140" y1="90" x2="140" y2="150" />,
    // Arms
    <line key={3} x1="140" y1="120" x2="120" y2="100" />,
    <line key={4} x1="140" y1="120" x2="160" y2="100" />,
    // Legs
    <line key={5} x1="140" y1="150" x2="120" y2="180" />,
    <line key={6} x1="140" y1="150" x2="160" y2="180" />,
  ];

  return (
    <div className="progress">
      <svg height="250" width="200">
        {/* Rods */}
        <line x1="20" y1="230" x2="100" y2="230" />
        <line x1="60" y1="20" x2="60" y2="230" />
        <line x1="60" y1="20" x2="140" y2="20" />
        <line x1="140" y1="20" x2="140" y2="50" />
        {failParts.slice(0, fails.length)}
      </svg>
    </div>
  );
}

export default ProgressParts;

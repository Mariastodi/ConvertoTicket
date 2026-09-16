function createQrCells(seed: number, count: number): boolean[] {
  let value = seed
  const next = () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }

  return Array.from({ length: count }, () => next() > 0.52)
}

export default function FauxQrCode({ seed = 7, size = 168 }: { seed?: number; size?: number }) {
  const grid = 11
  const cells = createQrCells(seed, grid * grid)
  const cell = size / grid

  const isFinder = (row: number, col: number) =>
    (row < 3 && col < 3) || (row < 3 && col > grid - 4) || (row > grid - 4 && col < 3)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="QR code de demonstração">
      <rect width={size} height={size} fill="#fcfbf8" />
      {cells.map((filled, index) => {
        const row = Math.floor(index / grid)
        const col = index % grid
        if (isFinder(row, col)) return null
        if (!filled) return null
        return (
          <rect
            key={index}
            x={col * cell}
            y={row * cell}
            width={cell}
            height={cell}
            fill="#15130f"
          />
        )
      })}
      {[
        [0, 0],
        [0, grid - 3],
        [grid - 3, 0],
      ].map(([row, col]) => (
        <g key={`${row}-${col}`}>
          <rect x={col * cell} y={row * cell} width={cell * 3} height={cell * 3} fill="#15130f" />
          <rect
            x={col * cell + cell}
            y={row * cell + cell}
            width={cell}
            height={cell}
            fill="#fcfbf8"
          />
        </g>
      ))}
    </svg>
  )
}

import React, { useState, useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  label: string;
}

interface GraphProps {
  data: Point[][];
  variableNames: string[];
}

const Graph: React.FC<GraphProps> = ({ data, variableNames }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentData = data[selectedIndex];
  const margin = 60;
  const maxY = Math.max(...currentData.map(d => d.y)) * 1.1;

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getX = (index: number) =>
    margin + (index * (dimensions.width - 2 * margin)) / (currentData.length - 1);
  const getY = (y: number) =>
    dimensions.height - margin - (y / maxY) * (dimensions.height - 2 * margin);

  const linePath = currentData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)},${getY(p.y)}`)
    .join(' ');

  return (
    <div ref={containerRef} className="w-2/3 h-[400px] relative mb-5">
      <div className="flex justify-between items-center p-4">
        <h2 className='text-4xl font-semibold'>Graphs</h2>
        <select
          className="bg-[#2c2c2c] text-white px-4 py-2 rounded"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {variableNames.map((name, i) => (
            <option key={i} value={i}>{name}</option>
          ))}
        </select>
      </div>

      {dimensions.width > 0 && (
        <svg width={dimensions.width} height={dimensions.height} className="bg-[#181818] rounded-md text-white mb-6">
          {/* Y Axis Lines and Labels */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = margin + (i * (dimensions.height - 2 * margin)) / 4;
            const value = Math.round(maxY - (i * maxY) / 4);
            return (
              <g key={i}>
                <line x1={margin} y1={y} x2={dimensions.width - margin} y2={y} stroke="#333" />
                <text x={margin - 10} y={y + 5} textAnchor="end" fill="#aaa" fontSize={12}>
                  ${value}k
                </text>
              </g>
            );
          })}

          {/* X Axis Lines and Labels */}
          {currentData.map((point, i) => (
            <g key={i}>
              <line x1={getX(i)} y1={margin} x2={getX(i)} y2={dimensions.height - margin} stroke="#333" />
              <text
                x={getX(i)}
                y={dimensions.height - margin + 20}
                textAnchor="middle"
                fill="#aaa"
                fontSize={12}
              >
                {point.label}
              </text>
            </g>
          ))}

          {/* Axis Lines */}
          <line x1={margin} y1={margin} x2={margin} y2={dimensions.height - margin} stroke="#555" />
          <line x1={margin} y1={dimensions.height - margin} x2={dimensions.width - margin} y2={dimensions.height - margin} stroke="#555" />

          {/* Line Path */}
          <path d={linePath} stroke="#a1ff0a" fill="none" strokeWidth={2} />

          {/* Points + Tooltip */}
          {currentData.map((p, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(p.y)}
                r={5}
                fill="#a1ff0a"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {hoveredIndex === i && (
                <g>
                  <rect
                    x={getX(i) - 50}
                    y={getY(p.y) - 60}
                    width={100}
                    height={40}
                    rx={8}
                    fill="#333"
                  />
                  <text x={getX(i)} y={getY(p.y) - 40} textAnchor="middle" fill="white">
                    ${p.y}k
                  </text>
                  <text x={getX(i)} y={getY(p.y) - 25} textAnchor="middle" fill="#aaa">
                    {p.label}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      )}
    </div>
  );
};

export default Graph
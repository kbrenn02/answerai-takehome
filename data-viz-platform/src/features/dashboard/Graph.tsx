import React, { useState, useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  label: string;
  description: string;
}

interface GraphProps {
  data: Point[][];
  variableNames: string[];
}

const Graph: React.FC<GraphProps> = ({ data, variableNames }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Defined to adjust graph dimensions dynamically 
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const currentData = data[selectedIndex % 4];
    const margin = 60;
    const maxY = Math.max(...currentData.map(d => d.y)) * 1.1;

    // The actual work of resizing the graph dynamically
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

    // Turn x and y data points into points on the graph
    const getX = (index: number) => margin + (index * (dimensions.width - 2 * margin)) / (currentData.length - 1);
    const getY = (y: number) => dimensions.height - margin - (y / maxY) * (dimensions.height - 2 * margin);

    // Create the line connecting the data points
    const linePath = currentData
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)},${getY(p.y)}`)
        .join(' ');

    return (
        <div ref={containerRef} className="w-2/3 h-[420px] relative mb-5">
            {/* Title and drop down variable menu to switch between different selected variables */}
            <div className="flex justify-between items-center p-4">
                <h2 className='text-3xl font-semibold'>Graphs</h2>
                <select
                    className="bg-black/60 text-white px-4 py-2 rounded"
                    value={selectedIndex}
                    onChange={(e) => setSelectedIndex(Number(e.target.value))}
                >
                    {variableNames.length === 0 ? (
                        <option>Please select a variable</option>
                    ) : (
                        variableNames.map((name, i) => (
                            <option key={i} value={i}>{name}</option>
                        ))
                    )}
                </select>
            </div>

            {/* Building of the actual graph itself */}
            {dimensions.width > 0 && (
                <svg width={dimensions.width} height={dimensions.height} className="bg-black/60 rounded-md text-white mb-6">
                {/* Y Axis lines and labels */}
                {Array.from({ length: data.length + 2 }).map((_, i) => {
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

                {/* X Axis lines and labels */}
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

                {/* Axis lines */}
                <line x1={margin} y1={margin} x2={margin} y2={dimensions.height - margin} stroke="#555" />
                <line x1={margin} y1={dimensions.height - margin} x2={dimensions.width - margin} y2={dimensions.height - margin} stroke="#555" />

                {/* Line path */}
                <path d={linePath} stroke="green" fill="none" strokeWidth={2} />

                {/* Points + tooltip */}
                {currentData.map((p, i) => (
                    <g key={i}>
                        {/* Invisible hover zone */}
                        <circle
                            cx={getX(i)}
                            cy={getY(p.y)}
                            r={16}
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="cursor-pointer"
                        />
                        {/* Actual, visible cricle */}
                        <circle
                            cx={getX(i)}
                            cy={getY(p.y)}
                            r={5}
                            fill="cyan"
                            pointerEvents="none"
                        />
                        {hoveredIndex === i && (() => {
                            const maxWidth = 140;
                            const words = p.description.split(' ');
                            const lines: string[] = [];
                            let currentLine = '';

                            words.forEach(word => {
                                const testLine = currentLine + word + ' ';
                                if (testLine.length * 6 < maxWidth) {
                                    currentLine = testLine;
                                } else {
                                    lines.push(currentLine);
                                    currentLine = word + ' ';
                                }
                            });
                            if (currentLine) lines.push(currentLine);

                            const tooltipHeight = 40 + (lines.length + 1) * 16;
                            const tooltipWidth = maxWidth + 20;
                            const padding = 10;

                            const rawX = getX(i);
                            const rawY = getY(p.y);

                            // Center tooltip horizontally over the point
                            let tooltipX = rawX - tooltipWidth / 2;
                            let tooltipY = rawY - tooltipHeight - 15;

                            // Clamp horizontal edges
                            if (tooltipX < padding) tooltipX = padding;
                            if (tooltipX + tooltipWidth > dimensions.width - padding) {
                                tooltipX = dimensions.width - tooltipWidth - padding;
                            }

                            // Flip tooltip below if it overflows top
                            if (tooltipY < padding) {
                                tooltipY = rawY + 20; // push below point instead
                            }

                            return (
                            <>
                                <defs>
                                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Glowing circle */}
                                <circle
                                    cx={rawX}
                                    cy={rawY}
                                    r={6}
                                    fill="white"
                                    stroke="#cyan"
                                    strokeWidth={2}
                                    filter="url(#glow)"
                                    pointerEvents="none"
                                />

                                <g 
                                    pointerEvents="none"
                                >
                                    <rect
                                        x={tooltipX}
                                        y={tooltipY}
                                        width={tooltipWidth}
                                        height={tooltipHeight}
                                        rx={12}
                                        fill="#1a1a1a"
                                        stroke="green"
                                        strokeWidth={1.5}
                                    />
                                    <text
                                        x={tooltipX + tooltipWidth / 2}
                                        y={tooltipY + 22}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize={14}
                                    >
                                        ${p.y}k
                                    </text>
                                    <text
                                        x={tooltipX + tooltipWidth / 2}
                                        y={tooltipY + 43}
                                        textAnchor="middle"
                                        fill="#ccc"
                                        fontSize={12}
                                    >
                                        <tspan x={tooltipX + tooltipWidth / 2} dy="0">
                                            {p.label}:
                                        </tspan>
                                        {lines.map((line, i) => (
                                            <tspan key={i} x={tooltipX + tooltipWidth / 2} dy="1.2em">
                                            {line.trim()}
                                            </tspan>
                                        ))}
                                    </text>
                                </g>
                            </>
                        );})()}
                    </g>
                ))}
                </svg>
            )}
        </div>
    );
};

export default Graph
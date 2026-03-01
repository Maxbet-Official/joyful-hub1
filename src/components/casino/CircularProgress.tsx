interface CircularProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
}

const CircularProgress = ({ value, maxValue = 5, size = 52, strokeWidth = 3.5, label }: CircularProgressProps) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / maxValue) * circumference;
  const color = value >= 4.5 ? '#00C853' : value >= 3.5 ? '#FFC107' : '#FF5252';

  return (
    <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)',
              filter: `drop-shadow(0 0 4px ${color}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-foreground">
          {value.toFixed(1)}
        </div>
      </div>
      <div className="text-[9px] text-center leading-tight max-w-[56px] font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </div>
    </div>
  );
};

export default CircularProgress;

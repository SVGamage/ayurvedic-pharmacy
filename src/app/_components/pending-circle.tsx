import { cn } from "@/lib/utils";

interface PendingCircleProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function PendingCircle({
  size = 24,
  strokeWidth = 2,
  className,
}: PendingCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference * 0.25} ${circumference * 0.75}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("animate-spin", className)}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={0}
      />
    </svg>
  );
}

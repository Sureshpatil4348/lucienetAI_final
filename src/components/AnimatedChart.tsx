import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Static performance data
const performanceData = [
  { month: "January", sp: 2.12, eurekahedge: -0.64, lucient: 3.23 },
  { month: "February", sp: 4.84, eurekahedge: 0.0039, lucient: 7.37 },
  { month: "March", sp: 3.06, eurekahedge: -0.86, lucient: 4.66 },
  { month: "April", sp: -4.23, eurekahedge: 0.0009, lucient: -6.44 },
  { month: "May", sp: 4.94, eurekahedge: 0.001, lucient: 7.52 },
  { month: "June", sp: 3.08, eurekahedge: 0.0015, lucient: 4.69 },
  { month: "July", sp: 0.94, eurekahedge: -1.24, lucient: 1.43 },
  { month: "August", sp: 2, eurekahedge: 0.033, lucient: 3.05 },
  { month: "September", sp: 2.46, eurekahedge: 0.0039, lucient: 3.75 },
  { month: "October", sp: -0.91, eurekahedge: -0.95, lucient: -1.39 },
  { month: "November", sp: 5.4, eurekahedge: 0.0078, lucient: 8.22 },
  { month: "December", sp: -2.62, eurekahedge: 1.56, lucient: -3.99 }
];

interface AnimatedChartProps {
  height?: number;
  title?: string;
  subtitle?: string;
  color?: string;
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({
  height = 300,
  title,
  subtitle,
  color = "#8B5CF6"
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-lucent-deep-blue p-3 border border-white/10 rounded-md shadow-lg">
          <p className="text-white font-medium">{`Month: ${payload[0].payload.month}`}</p>
          <p className="text-gray-400 text-sm">{`S&P: ${payload[0].payload.sp}%`}</p>
          <p className="text-gray-400 text-sm">{`Eurekahedge: ${payload[0].payload.eurekahedge}%`}</p>
          <p className="text-gray-400 text-sm">{`Lucient: ${payload[0].payload.lucient}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`w-full opacity-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : ''}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-gray-400">{subtitle}</p>}
        </div>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={performanceData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id={`colorGradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#94A3B8' }} 
            axisLine={{ stroke: '#334155' }}
            tickLine={{ stroke: '#334155' }}
            interval={0}
            tickFormatter={(value) => value.substring(0, 3)}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis 
            tick={{ fill: '#94A3B8' }} 
            axisLine={{ stroke: '#334155' }}
            tickLine={{ stroke: '#334155' }}
            domain={['dataMin - 1', 'dataMax + 1']}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
            ticks={[-8, -7.5, -7, -6.5, -6, -5.5, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]}
            padding={{ top: 10, bottom: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sp"
            stroke="#94A3B8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#94A3B8", stroke: 'white', strokeWidth: 2 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="eurekahedge"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#3B82F6", stroke: 'white', strokeWidth: 2 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="lucient"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 2 }}
            isAnimationActive={false}
            fill={`url(#colorGradient-${color.replace('#', '')})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnimatedChart;

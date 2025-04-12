
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Simulated trading data
const generateData = (days: number = 30, uptrend: boolean = true) => {
  const data = [];
  let baseValue = 1000;
  const volatility = 0.03;
  const trend = uptrend ? 0.01 : -0.01;

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.5) * volatility + trend;
    baseValue = baseValue * (1 + change);
    
    data.push({
      day: i + 1,
      value: parseFloat(baseValue.toFixed(2)),
    });
  }
  
  return data;
};

interface AnimatedChartProps {
  uptrend?: boolean;
  height?: number;
  title?: string;
  subtitle?: string;
  animate?: boolean;
  color?: string;
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({
  uptrend = true,
  height = 300,
  title,
  subtitle,
  animate = true,
  color = "#8B5CF6"
}) => {
  const [data, setData] = useState(generateData(30, uptrend));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        
        const lastValue = newData[newData.length - 1].value;
        const change = (Math.random() - 0.5) * 0.03 + (uptrend ? 0.01 : -0.01);
        const newValue = parseFloat((lastValue * (1 + change)).toFixed(2));
        
        newData.push({
          day: prevData[prevData.length - 1].day + 1,
          value: newValue,
        });
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [animate, uptrend]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-lucent-deep-blue p-3 border border-white/10 rounded-md shadow-lg">
          <p className="text-white font-medium">{`Value: $${payload[0].value}`}</p>
          <p className="text-gray-400 text-sm">{`Day: ${payload[0].payload.day}`}</p>
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
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id={`colorGradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#94A3B8' }} 
            axisLine={{ stroke: '#334155' }}
            tickLine={{ stroke: '#334155' }}
          />
          <YAxis 
            tick={{ fill: '#94A3B8' }} 
            axisLine={{ stroke: '#334155' }}
            tickLine={{ stroke: '#334155' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: color, stroke: 'white', strokeWidth: 2 }}
            isAnimationActive={true}
            animationDuration={1000}
            fill={`url(#colorGradient-${color.replace('#', '')})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnimatedChart;

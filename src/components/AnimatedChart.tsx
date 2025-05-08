import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Static performance data with compound returns starting from $1M
const performanceData = [
  { month: "January", sp: 1012000, eurekahedge: 1006400, lucient: 1032300 },
  { month: "February", sp: 1061000, eurekahedge: 1006404, lucient: 1108400 },
  { month: "March", sp: 1093500, eurekahedge: 997700, lucient: 1160100 },
  { month: "April", sp: 1047300, eurekahedge: 997709, lucient: 1085400 },
  { month: "May", sp: 1099000, eurekahedge: 997719, lucient: 1167000 },
  { month: "June", sp: 1132800, eurekahedge: 997734, lucient: 1221700 },
  { month: "July", sp: 1143500, eurekahedge: 985400, lucient: 1239500 },
  { month: "August", sp: 1166400, eurekahedge: 985733, lucient: 1277700 },
  { month: "September", sp: 1195100, eurekahedge: 985772, lucient: 1325600 },
  { month: "October", sp: 1184200, eurekahedge: 976400, lucient: 1307200 },
  { month: "November", sp: 1248200, eurekahedge: 976476, lucient: 1414700 },
  { month: "December", sp: 1215500, eurekahedge: 991700, lucient: 1358300 }
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
          <p className="text-gray-400 text-sm">{`Pinaxa: $${payload[0].payload.lucient.toLocaleString()}`}</p>
          <p className="text-gray-400 text-sm">{`S&P: $${payload[0].payload.sp.toLocaleString()}`}</p>
          <p className="text-gray-400 text-sm">{`Eurekahedge: $${payload[0].payload.eurekahedge.toLocaleString()}`}</p>
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
            domain={['dataMin - 10000', 'dataMax + 10000']}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
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


import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";

interface PointType {
  title: string;
  description: string;
}

interface FeatureProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: PointType[];
}

const FeatureDetail = ({ feature, index }: { feature: FeatureProps; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={feature.id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`py-16 ${index !== 0 ? "border-t border-white/10" : ""}`}
    >
      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}>
        <div className="w-full lg:w-1/2">
          <div className="bg-lucent-navy border border-white/10 rounded-xl p-8 h-full">
            <div className="mb-6">
              {feature.icon}
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {feature.title}
            </h2>
            <p className="text-gray-300 mb-8">
              {feature.description}
            </p>
            
            <div className="space-y-6">
              {feature.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -20 : 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="flex"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-lucent-purple/20 flex items-center justify-center mr-4 mt-1">
                    <Check className="h-3.5 w-3.5 text-lucent-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{point.title}</h4>
                    <p className="text-gray-400 text-sm">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="bg-lucent-deep-blue border border-white/10 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-lucent-purple/30 to-lucent-blue/30 aspect-video flex items-center justify-center">
              <div className="text-center p-6">
                <div className="mb-4 mx-auto bg-lucent-deep-blue/50 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Interactive visualization would be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureDetail;

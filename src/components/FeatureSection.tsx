
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FeaturePoint {
  title: string;
  description: string;
}

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  points: FeaturePoint[];
}

interface FeatureSectionProps {
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const [ref, inView] = useInView({
          triggerOnce: true,
          threshold: 0.1,
        });

        const variants = {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };

        return (
          <motion.div
            key={feature.id}
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="feature-card"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400 mb-4">{feature.description}</p>
            <a
              href={`#${feature.id}`}
              className="text-lucent-purple hover:text-lucent-purple/80 font-medium inline-flex items-center text-sm"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </a>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FeatureSection;

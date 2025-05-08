import React, { useRef } from "react";
import { 
  Lightbulb, 
  Target,
  Cpu,
  Network,
  BrainCircuit,
  Lock,
  BarChart,
  Database,
  LineChart,
  Shield,
  Zap,
  Sparkles,
  Globe,
  ArrowRight,
  Users,
  Briefcase,
  Award,
  BarChart3,
  CircleCheck,
  Bot,
  Rocket,
  TrendingUp,
  AreaChart,
  Blocks,
  CheckCircle2,
  Star,
  HeartHandshake
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Team members data
const teamMembers = [
  {
    name: "Suresh Patil",
    role: "Founder & Chief Operations Officer",
    bio: "Former founder of AlgoFX with extensive experience in algorithmic trading systems and financial market analysis.",
    image: "/team/suresh-patil.jpg",
    placeholder: "SP"
  },
  {
    name: "Rahul Chawla",
    role: "Lead Investment Strategist",
    bio: "Co-Head of Investment Banking Coverage with expertise in market strategy and financial risk management.",
    image: "/team/rahul-chawla.jpg", 
    placeholder: "RC"
  },
  {
    name: "Kallol Sil",
    role: "Chief Technology Officer",
    bio: "Former CEO at WhizHack and technology leader with experience at Microsoft and EY, driving AI innovation.",
    image: "/team/kallol-sil.jpg",
    placeholder: "KS"
  },
  {
    name: "Kakoli Das",
    role: "Head of Operations & Finance",
    bio: "Financial operations specialist with experience at AXIS Bank and Credit Suisse, leading operational excellence.",
    image: "/team/kakoli-das.jpg",
    placeholder: "KD"
  }
];

// Core values data
const coreValues = [
  {
    title: "Innovation",
    description: "Pioneering the future of AI trading technology",
    icon: <Lightbulb className="h-6 w-6" />,
    color: "from-purple-600 to-indigo-600"
  },
  {
    title: "Transparency",
    description: "Full visibility into our systems and processes",
    icon: <Lock className="h-6 w-6" />,
    color: "from-blue-600 to-cyan-600"
  },
  {
    title: "Excellence",
    description: "Committed to delivering superior performance",
    icon: <Star className="h-6 w-6" />,
    color: "from-amber-500 to-orange-500"
  },
  {
    title: "Integrity",
    description: "Operating with the highest ethical standards",
    icon: <HeartHandshake className="h-6 w-6" />,
    color: "from-green-600 to-emerald-600"
  }
];

// Trading dashboard visualization data for demo chart
const tradingChartData = [
  { time: '9:00', price: 152.4, volume: 30 },
  { time: '10:00', price: 153.2, volume: 45 },
  { time: '11:00', price: 154.8, volume: 80 },
  { time: '12:00', price: 153.9, volume: 70 },
  { time: '13:00', price: 154.3, volume: 50 },
  { time: '14:00', price: 156.2, volume: 120 },
  { time: '15:00', price: 155.7, volume: 90 },
  { time: '16:00', price: 157.8, volume: 110 },
];

// AI capabilities data
const aiCapabilities = [
  {
    icon: <BrainCircuit />,
    title: "SVM Technology",
    description: "Support Vector Machine algorithms for precision trading with adaptive market analysis",
    stats: {
      value: "98.7%",
      label: "Accuracy"
    },
    color: "purple"
  },
  {
    icon: <AreaChart />,
    title: "Auto Hedging",
    description: "Intelligent automated hedging system to minimize risk in volatile market conditions",
    stats: {
      value: "27%",
      label: "Return Rate"
    },
    color: "blue"
  },
  {
    icon: <TrendingUp />,
    title: "Non-Martingale EA",
    description: "Advanced Expert Advisor system that avoids risky Martingale strategies",
    stats: {
      value: "50ms",
      label: "Response Time"
    },
    color: "green"
  },
  {
    icon: <Shield />,
    title: "In-Built Filters",
    description: "Sophisticated market filters to identify optimal trading opportunities",
    stats: {
      value: "24/7",
      label: "Monitoring"
    },
    color: "amber"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

// Stats counter component
const StatsCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lucent-purple to-lucent-blue mb-2">
        {value}
      </div>
      <div className="text-gray-400 text-sm md:text-base">{label}</div>
    </motion.div>
  );
};

// Animated card for features
const FeatureCard = ({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className={`group bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 hover:border-${color}-500/30 rounded-xl p-6 shadow-lg hover:shadow-${color}-500/10 transition-all duration-300`}
    >
      <div className={`mb-5 p-3 rounded-lg bg-${color}-500/10 w-14 h-14 flex items-center justify-center text-${color}-400 group-hover:bg-${color}-500/20 group-hover:text-${color}-300 transition-all duration-300`}>
        {React.cloneElement(icon as React.ReactElement, { className: "h-7 w-7" })}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </motion.div>
  );
};

// Team member card component
const TeamMemberCard = ({ member, index }: { member: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl overflow-hidden group"
    >
      <div className="h-64 relative overflow-hidden">
        {member.image ? (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 z-10"></div>
        ) : null}
        <div className={`w-full h-full flex items-center justify-center ${!member.image ? 'bg-gradient-to-br from-lucent-purple/20 to-lucent-blue/20' : ''}`}>
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="text-6xl font-bold text-lucent-purple/50">{member.placeholder}</div>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
        <p className="text-lucent-purple text-sm mb-3">{member.role}</p>
        <p className="text-gray-400 text-sm">{member.bio}</p>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  // Parallax scrolling effect for hero section
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-lucent-purple/5"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/background-grid.svg')] bg-repeat opacity-10"></div>
          <motion.div 
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-lucent-purple/20 filter blur-[120px]"
            style={{ y }}
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-lucent-blue/20 filter blur-[100px]"
            animate={{ 
              scale: [1, 1.3, 1],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-lucent-purple/10 text-lucent-purple border border-lucent-purple/20 mb-8"
            >
              <Bot className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Advanced AI Trading Technology</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Empowering Traders with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lucent-purple via-lucent-blue to-lucent-purple animate-gradient-x">
                AI Precision
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Pinaxa Labs specializes in cutting-edge auto trading algorithms designed exclusively for financial markets. Our mission is to democratize sophisticated trading technology.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href="/technology" className="px-8 py-3 rounded-lg bg-lucent-purple hover:bg-lucent-purple/90 text-white font-medium transition-all duration-300 flex items-center">
                Explore Our Technology
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#team" className="px-8 py-3 rounded-lg bg-transparent hover:bg-white/5 text-white border border-white/20 font-medium transition-all duration-300">
                Meet Our Team
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-10"></div>
      </div>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <StatsCounter value="0.5ms" label="Latency" />
            <StatsCounter value="50ms" label="Processing Speed" />
            <StatsCounter value="9+ Years" label="Market Experience" />
            <StatsCounter value="24/7" label="System Availability" />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-lucent-purple/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-lucent-purple to-lucent-blue">Vision</span> & Mission
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gray-300 text-lg"
            >
              We're on a mission to transform trading through artificial intelligence and make sophisticated algorithms accessible to all.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={slideInLeftVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="mb-6 p-4 rounded-xl bg-lucent-purple/10 inline-block">
                <Lightbulb className="h-8 w-8 text-lucent-purple" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                A world where trading is for everyone. We envision a future where sophisticated AI-powered trading tools are accessible to traders of all levels, not just institutions and high-net-worth individuals.
              </p>
              <div className="space-y-3">
                {["Democratize financial AI", "Empower individual traders", "Promote financial inclusion"].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-lucent-purple mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              variants={slideInRightVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="mb-6 p-4 rounded-xl bg-lucent-blue/10 inline-block">
                <Target className="h-8 w-8 text-lucent-blue" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Empowering you with revolutionary tools. We're dedicated to developing and providing state-of-the-art trading algorithms that continuously evolve and adapt to changing market conditions.
              </p>
              <div className="space-y-3">
                {["Develop cutting-edge AI", "Maximize trading performance", "Ensure system reliability"].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-lucent-blue mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-lucent-purple to-lucent-blue">Core Values</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gray-300 text-lg"
            >
              The principles that drive everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-all duration-300"
              >
                <div className={`mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-lucent-blue/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              variants={itemVariants}
              initial="hidden" 
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-lucent-purple to-lucent-blue">Technology</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gray-300 text-lg"
            >
              Built on cutting-edge AI and years of financial market expertise
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* SVM Technology */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-900/80 rounded-xl p-8 border border-gray-800 hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className="text-purple-500 p-2">
                  <BrainCircuit className="h-10 w-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">SVM Technology</h3>
                  <p className="text-gray-300 mb-4">Support Vector Machine algorithms for precision trading with adaptive market analysis</p>
                  <div>
                    <span className="text-4xl font-bold text-purple-500">98.7%</span>
                    <span className="text-sm text-gray-500 ml-2">Accuracy</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Auto Hedging */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-900/80 rounded-xl p-8 border border-gray-800 hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className="text-blue-500 p-2">
                  <AreaChart className="h-10 w-10" />
                    </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Auto Hedging</h3>
                  <p className="text-gray-300 mb-4">Intelligent automated hedging system to minimize risk in volatile market conditions</p>
                    <div>
                    <span className="text-4xl font-bold text-blue-500">27%</span>
                    <span className="text-sm text-gray-500 ml-2">Return Rate</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Non-Martingale EA */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-900/80 rounded-xl p-8 border border-gray-800 hover:border-green-500/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className="text-green-500 p-2">
                  <TrendingUp className="h-10 w-10" />
                        </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">Non-Martingale EA</h3>
                  <p className="text-gray-300 mb-4">Advanced Expert Advisor system that avoids risky Martingale strategies</p>
                  <div>
                    <span className="text-4xl font-bold text-green-500">50ms</span>
                    <span className="text-sm text-gray-500 ml-2">Response Time</span>
                        </div>
                      </div>
                    </div>
            </motion.div>

            {/* In-Built Filters */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-gray-900/80 rounded-xl p-8 border border-gray-800 hover:border-amber-500/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-6">
                <div className="text-amber-500 p-2">
                  <Shield className="h-10 w-10" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">In-Built Filters</h3>
                  <p className="text-gray-300 mb-4">Sophisticated market filters to identify optimal trading opportunities</p>
                  <div>
                    <span className="text-4xl font-bold text-amber-500">24/7</span>
                    <span className="text-sm text-gray-500 ml-2">Monitoring</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 p-8 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Highly Evolved System</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  At Pinaxa Labs, we've fine-tuned our automated trading system through rigorous testing and continuous improvement. Our dedication to innovation shines through as we enhance our system with cutting-edge Machine Learning technology. Our algorithms are designed to not just perform but to outshine, delivering outstanding results in the dynamic world of financial markets.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CircleCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Tested on 99.99% accurate historical data</span>
                  </div>
                  <div className="flex items-start">
                    <CircleCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Advanced risk management settings</span>
                  </div>
                  <div className="flex items-start">
                    <CircleCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Continuously enhanced with Machine Learning</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="aspect-video rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-1">
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <div className="h-8 w-full bg-gray-900 flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-full w-full bg-gray-950 p-4">
                      {/* Trading Visualization Dashboard */}
                      <div className="h-full flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-300">BTC/USD Trading Analysis</h3>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-green-500">+2.4%</span>
                            <span className="text-xs text-gray-400">Last 24h</span>
                          </div>
                        </div>
                        
                        {/* Price Chart */}
                        <div className="flex-1 relative">
                          <div className="absolute inset-0 flex items-end space-x-1">
                            {tradingChartData.map((data, index) => (
                              <div key={index} className="flex-1 flex items-end h-full">
                                <div 
                                  className={`w-full ${index % 2 === 0 ? 'bg-lucent-purple/40' : 'bg-lucent-blue/40'} rounded-t`}
                                  style={{ height: `${(data.price - 150) / 10 * 100}%` }}
                                ></div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Price Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="flex items-center w-full space-x-2">
                                <div className="text-xs text-gray-500 w-10">{158 - i * 2}</div>
                                <div className="h-px flex-1 bg-gray-800"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Volume Indicator */}
                        <div className="h-8 mt-1">
                          <div className="flex items-end h-full space-x-1">
                            {tradingChartData.map((data, index) => (
                              <div key={index} className="flex-1 flex items-end">
                                <div 
                                  className="w-full bg-lucent-purple/20 rounded-t"
                                  style={{ height: `${data.volume / 120 * 100}%` }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Time Labels */}
                        <div className="flex justify-between mt-1">
                          {tradingChartData.map((data, index) => (
                            <div key={index} className="text-xs text-gray-500">{data.time}</div>
                          ))}
                        </div>
                        
                        {/* Trading Signals */}
                        <div className="flex justify-between mt-3 text-xs">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                            <span className="text-gray-300">Buy Signal</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                            <span className="text-gray-300">Sell Signal</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></div>
                            <span className="text-gray-300">Hold</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-lucent-purple/10 backdrop-blur-sm p-3 rounded-lg border border-lucent-purple/20">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm text-white">Live Trading System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {false && (
        <section id="team" className="py-20 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-lucent-purple to-lucent-blue">Team</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gray-300 text-lg"
              >
                A diverse founding team of experts in finance, technology, and operations
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-lucent-purple/10 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-10 text-center max-w-4xl mx-auto shadow-2xl"
          >
            <div className="mb-6 p-4 rounded-full bg-lucent-purple/10 inline-block">
              <Rocket className="h-8 w-8 text-lucent-purple" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Future of Trading?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of traders who are leveraging our breakthrough AI technology to make smarter, data-driven decisions in the market.
            </p>
            <a 
              href="https://calendly.com/pinaxalabs/30min" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-lucent-purple to-lucent-blue text-white font-medium text-lg shadow-lg hover:shadow-lucent-purple/20 transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;

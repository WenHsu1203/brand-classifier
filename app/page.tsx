"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { StrategySection, RevenueEstimationSection, StrategyHeader } from "@/components/StrategySection"
import { EmailCollectionSection } from "@/components/EmailCollectionSection"
import { Hero } from "./components/Hero"
import { CallToAction } from "./components/CallToAction"
import { Navbar } from "./components/Navbar"
import { StepsSection } from "@/components/StepsSection"
import { AIGenerator } from "@/components/AIGenerator"
import { StrategySummary } from "@/components/StrategySummary"

export default function BrandStrategyDashboard() {
  const [analysisData, setAnalysisData] = useState({});
  const [positioningData, setPositioningData] = useState({});
  const [strategyData, setStrategyData] = useState({});
  const [revenueData, setRevenueData] = useState(null);
  const [cleanUsername, setCleanUsername] = useState<string>('');
  const strategyRef = useRef<HTMLDivElement>(null)
  const nextStepsRef = useRef<HTMLDivElement>(null)
  const aiGeneratorRef = useRef<HTMLDivElement>(null)

  // scroll to strategy section once the analysis data is received.
  useEffect(() => {
    if (Object.keys(analysisData).length > 0) {
      const scrollTimer = setTimeout(() => {
        strategyRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);

      return () => clearTimeout(scrollTimer);
    }
  }, [analysisData]);

  const handleDataReceived = ({ type, data, username }: { type: string, data: any, username?: string }) => {
    switch (type) {
      case 'analysis':
        setAnalysisData(prev => ({ ...prev, ...data }));
        if (username) setCleanUsername(username);
        break;
      case 'positioning':
        setPositioningData(prev => ({ ...prev, ...data }));
        break;
      case 'strategy':
        setStrategyData(prev => ({ ...prev, ...data }));
        break;
      case 'revenue':
        setRevenueData(data);
        break;
    }
  };

  return (

    <div className="container mx-auto p-4 space-y-8 bg-white min-h-screen">
      <Navbar aiGeneratorRef={aiGeneratorRef} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-32 pb-16 px-4"
      >
        <Hero />
      </motion.div>
      {/* Original Card Component */}
      <motion.div
        ref={aiGeneratorRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-32"
      >
        <AIGenerator onDataReceived={handleDataReceived} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <StepsSection />
      </motion.div>

      {/* Only show the strategy section if we have scraped data */}
      {Object.keys(analysisData).length > 0 && (
        <div ref={strategyRef}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-8">
              <StrategyHeader />
              <div>
                <StrategySection
                  title="分析"
                  data={analysisData}
                  step="第一步：分析"
                />
              </div>
            </div>
          </motion.div>
        </div>

      )}

      {Object.keys(analysisData).length > 0 &&
        Object.keys(positioningData).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StrategySection
              title="定位"
              data={positioningData}
              step="第二步：定位"
            />
          </motion.div>
        )}

      {Object.keys(analysisData).length > 0 &&
        Object.keys(positioningData).length > 0 &&
        Object.keys(strategyData).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StrategySection
              title="發想"
              data={strategyData}
              step="第三步：發想"
            />
          </motion.div>
        )}
      {/* Fourth section */}
      {Object.keys(analysisData).length > 0 &&
        Object.keys(positioningData).length > 0 &&
        Object.keys(strategyData).length > 0 &&
        revenueData && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <RevenueEstimationSection revenueData={revenueData} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StrategySummary
                analysisData={analysisData}
                positioningData={positioningData}
                strategyData={strategyData}
                revenueData={revenueData}
                username={cleanUsername}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <EmailCollectionSection
                analysisData={analysisData}
                positioningData={positioningData}
                strategyData={strategyData}
                revenueData={revenueData}
                username={cleanUsername}
              />
            </motion.div>
          </>
        )}
      {/* Call for action section */}
      <motion.div
        ref={nextStepsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CallToAction />
      </motion.div>
    </div>
  )
}


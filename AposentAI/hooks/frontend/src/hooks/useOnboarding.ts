import { useState, useEffect } from "react";

export const useOnboarding = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding before
    const seen = localStorage.getItem("aposentai-onboarding-seen");
    const hasSeenBefore = seen === "true";
    
    setHasSeenOnboarding(hasSeenBefore);
    
    // Show onboarding for new users after a brief delay
    if (!hasSeenBefore) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("aposentai-onboarding-seen", "true");
    setHasSeenOnboarding(true);
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem("aposentai-onboarding-seen", "true");
    setHasSeenOnboarding(true);
    setShowOnboarding(false);
  };

  const restartOnboarding = () => {
    setShowOnboarding(true);
  };

  return {
    hasSeenOnboarding,
    showOnboarding,
    completeOnboarding,
    skipOnboarding,
    restartOnboarding
  };
};
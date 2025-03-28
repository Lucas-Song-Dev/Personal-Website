"use client";

import React, { useState, useEffect } from 'react';
import TerminalAnimation from '@/components/TerminalAnimation';
import MainContent from '@/components/MainContent';

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnimationComplete = () => {
    setShowTerminal(false);
  };

  if (!mounted) return null;

  return (
    <>
      {showTerminal ? (
        <TerminalAnimation onAnimationComplete={handleAnimationComplete} />
      ) : (
        <MainContent />
      )}
    </>
  );
}

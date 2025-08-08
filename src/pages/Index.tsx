import React, { useState } from 'react';
import { DiagnosticForm } from '@/components/DiagnosticForm';
import { DiagnosticResult } from '@/components/DiagnosticResult';

const Index = () => {
  const [showResult, setShowResult] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState<{
    score: number;
    answers: Record<string, number>;
  } | null>(null);

  const handleDiagnosticComplete = (score: number, answers: Record<string, number>) => {
    setDiagnosticData({ score, answers });
    setShowResult(true);
  };

  const handleRestart = () => {
    setShowResult(false);
    setDiagnosticData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {!showResult ? (
        <DiagnosticForm onComplete={handleDiagnosticComplete} />
      ) : (
        diagnosticData && (
          <DiagnosticResult
            score={diagnosticData.score}
            answers={diagnosticData.answers}
            onRestart={handleRestart}
          />
        )
      )}
    </div>
  );
};

export default Index;
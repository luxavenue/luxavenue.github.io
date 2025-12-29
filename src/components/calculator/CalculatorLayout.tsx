import React from 'react';
import '../../css/CalculatorLayout.css';

interface CalculatorLayoutProps {
  title: string;
  children: React.ReactNode;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ title, children }) => {
  return (
    <div className="calculator-layout">
      <h2 className="calculator-title">{title}</h2>
      <p className="calculator-description">판매 수수료와 예상 수익을 빠르게 확인하세요.</p>
      <div className="calculator-content">{children}</div>
    </div>
  );
};

export default CalculatorLayout;
import React from 'react';
import { ConfiguredLayout } from '@site/src/components/Templates/ConfiguredLayout';
import { Calculator } from '@site/src/components/Pages/Calculator';

const CalculatorPage = () => {
  return (
    <ConfiguredLayout>
      <Calculator />
    </ConfiguredLayout>
  );
};

export default CalculatorPage;

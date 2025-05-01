import React from "react";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { CreateConfig } from "@site/src/components/Pages/CreateConfig";

const CalculatorPage = () => {
  return (
    <ConfiguredLayout>
      <CreateConfig />
    </ConfiguredLayout>
  );
};

export default CalculatorPage;

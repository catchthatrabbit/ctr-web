import React, { useState, useEffect } from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { InputText } from '@site/src/components/Atoms/InputText';
import { profitabilityCalculation } from '@site/src/utils/profitabilityCalculation';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import { POOLS_API_CONFIG_TYPE } from '@site/src/configs/types';
import ExchNumberFormat from 'exchange-rounding';
import { currencies, topCurrencies } from '@site/src/constants/currencies';
import { machines } from '@site/src/constants/machines';
import config from '@site/docusaurus.config';
import { getRepoUrl } from '@site/src/utils/getRepoUrl';

function isProfitabilityResult(
  obj: any
): obj is { revenue: number; xcbPrice: number; rewardXCB: number } {
  return (
    obj && typeof obj === 'object' && 'revenue' in obj && 'xcbPrice' in obj
  );
}

interface CustomFields {
  URLS: {
    BUY_LINK: string;
  };
}

const Calculator: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as unknown as CustomFields;
  const [currency, setCurrency] = useState('EUR');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [hashrate, setHashrate] = useState('');
  const [electricityCost, setElectricityCost] = useState('');
  const [electricityConsumption, setElectricityConsumption] = useState('');
  const [extraExpenses, setExtraExpenses] = useState('');
  const [result, setResult] = useState<null | {
    profit: number;
    xcbPrice: number;
    rewardXCB: number;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputWarning, setInputWarning] = useState<string | null>(null);

  const getValueColor = (value: number): string => {
    if (value > 0) return 'var(--ifm-color-success)';
    if (value < 0) return 'var(--ifm-color-danger)';
    return 'white';
  };

  const sortedMachines = [...machines].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    if (selectedMachine) {
      const machine = machines.find((m) => m.name === selectedMachine);
      if (machine) {
        setHashrate(machine.hashrate.toString());
        // Always set power if it's defined, even if it's 0
        if (typeof machine.powerConsumption === 'number') {
          setElectricityConsumption(machine.powerConsumption.toString());
        }
      }
    } else {
      // Clear all fields when "None" is selected
      setHashrate('');
      setElectricityConsumption('');
      setExtraExpenses('');
    }
  }, [selectedMachine, machines]);

  useEffect(() => {
    let cancelled = false;
    const recalc = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      setInputWarning(null);
      const hashrateNum = Number(hashrate);
      if (!hashrateNum || hashrateNum <= 0) {
        setInputWarning('Please enter a valid positive hashrate.');
        setLoading(false);
        return;
      }
      const electricityCostNum = Number(electricityCost) || 0;
      const electricityConsumptionNum = Number(electricityConsumption) || 0;
      const extraExpensesNum = Number(extraExpenses) || 0;
      try {
        const res = await profitabilityCalculation(
          hashrateNum,
          siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
          String(siteConfig.customFields.API_PATH),
          currency,
          'monthly',
          electricityConsumptionNum,
          electricityCostNum
        );
        if (isProfitabilityResult(res)) {
          const profitAfterExpenses =
            res.revenue - (res.electricityCost || 0) - extraExpensesNum;
          const rewardXCB = Number.isFinite(res.rewardXCB) ? res.rewardXCB : 0;
          setResult({
            profit: profitAfterExpenses,
            xcbPrice: res.xcbPrice,
            rewardXCB,
          });
        } else {
          setError('Calculation failed.');
        }
      } catch (e) {
        setError('Calculation failed.');
      } finally {
        setLoading(false);
      }
    };
    // Only recalc if hashrate is filled
    if (hashrate) {
      recalc();
    } else {
      setResult(null);
      setError(null);
      setInputWarning(null);
    }
    return () => {
      cancelled = true;
    };
  }, [
    hashrate,
    electricityCost,
    electricityConsumption,
    extraExpenses,
    currency,
    siteConfig,
  ]);

  return (
    <div className={styles.calculatorRoot}>
      <Text variant="heading2" color="white" weight="semiBold">
        Profit Calculator
      </Text>
      <Spacer variant="sm" />
      <form
        className={styles.calculatorForm}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.inputGroup}>
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={styles.dropdown}
          >
            <optgroup label="Currencies">
              {topCurrencies.map((curr) => (
                <option key={curr.value} value={curr.value}>
                  {`${curr.value} — ${curr.name}`}
                </option>
              ))}
            </optgroup>
            <optgroup label="All Supported Currencies (Alphabetically)">
              {currencies.map((curr) => (
                <option key={curr.value} value={curr.value}>
                  {`${curr.value} — ${curr.name}`}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="machine">Machine Template</label>
          <select
            id="machine"
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            className={styles.dropdown}
          >
            <option value="">None</option>
            {sortedMachines.map((machine) => (
              <option key={machine.name} value={machine.name}>
                {machine.name}
              </option>
            ))}
          </select>
          <div style={{ textAlign: 'right', marginTop: '0.5em' }}>
            <a
              href={`${getRepoUrl(config)}/edit/master/src/constants/machines.ts`}
              target="_blank"
              rel="noopener"
              style={{
                fontSize: 'var(--small-font-size)',
                color: 'var(--ifm-color-primary)',
              }}
            >
              Propose a New Machine Template
            </a>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>
            RandomY Hashrate (H/s)
            <InputText
              type="number"
              min="1"
              step="any"
              value={hashrate}
              onChange={(e) => setHashrate(e.target.value)}
              placeholder="Enter hashrate in H/s"
              context="dark"
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label>
            Electricity Cost ({currency} per kWh)
            <InputText
              type="number"
              step="0.01"
              value={electricityCost}
              onChange={(e) => setElectricityCost(e.target.value)}
              placeholder="e.g. 0.20"
              context="dark"
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label>
            Electricity Consumption (W)
            <InputText
              type="number"
              min="0"
              step="any"
              value={electricityConsumption}
              onChange={(e) => setElectricityConsumption(e.target.value)}
              placeholder="e.g. 120"
              context="dark"
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label>
            Extra expenses per month ({currency})
            <InputText
              type="number"
              min="0"
              step="any"
              value={extraExpenses}
              onChange={(e) => setExtraExpenses(e.target.value)}
              placeholder="e.g. 10 (internet, rent, etc.)"
              context="dark"
              className={styles.input}
            />
          </label>
        </div>
      </form>
      <Spacer variant="sm" />
      {loading && (
        <Text variant="smallBody" color="subheadingColor">
          Calculating…
        </Text>
      )}
      {inputWarning && (
        <Text variant="smallBody" color="subheadingColor">
          {inputWarning}
        </Text>
      )}
      {error && (
        <Text variant="smallBody" style={{ color: 'var(--ifm-color-danger)' }}>
          {error}
        </Text>
      )}
      {result && !error && !loading && (
        <div className={styles.resultBox}>
          <div className={styles.resultItem}>
            <span style={{ marginRight: '0.5em' }}>
              Estimated Monthly Profit:
            </span>
            <Text
              variant="body"
              weight="semiBold"
              style={{ color: getValueColor(result.profit) }}
            >
              {`${new ExchNumberFormat(undefined, {
                style: 'currency',
                currency: currency,
              }).format(result.profit)}`}
            </Text>
          </div>
          <div className={styles.resultItem}>
            <span style={{ marginRight: '0.5em' }}>
              Reward in XCB (brutto):
            </span>
            <Text
              variant="body"
              weight="semiBold"
              style={{ color: getValueColor(result.rewardXCB) }}
            >
              {`${new ExchNumberFormat(undefined, {
                style: 'currency',
                currency: 'XCB',
              }).format(result.rewardXCB)}`}
            </Text>
          </div>
          {result.profit < 0 && (
            <div className={styles.resultItem}>
              Not profitable?{' '}
              <a
                href={customFields.URLS.BUY_LINK}
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--ifm-color-primary)' }}
              >
                Buy XCB instead
              </a>
            </div>
          )}
          <div className={styles.resultItem}>
            <Text variant="smallBody" color="subheadingColor">
              {`XCB Price: ${new ExchNumberFormat(undefined, {
                style: 'currency',
                currency: currency,
              }).format(result.xcbPrice)}`}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;

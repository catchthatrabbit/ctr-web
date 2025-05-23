import React, { useState, useEffect } from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { InputText } from '@site/src/components/Atoms/InputText';
import { profitabilityCalculation } from '@site/src/utils/profitabilityCalculation';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import ExchNumberFormat from 'exchange-rounding';
import { currencies, topCurrencies } from '@site/src/constants/currencies';
import { machines } from '@site/src/constants/machines';
import config from '@site/docusaurus.config';
import { getRepoUrl } from '@site/src/utils/getRepoUrl';
import Select from 'react-select';

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

  const groupedMachines = machines.reduce((acc, machine) => {
    if (!machine.type) {
      acc.ungrouped = acc.ungrouped || [];
      acc.ungrouped.push({
        value: machine.name,
        label: machine.name
      });
    } else {
      const type = machine.type.charAt(0).toUpperCase() + machine.type.slice(1);
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({
        value: machine.name,
        label: machine.name
      });
    }
    return acc;
  }, {} as Record<string, { value: string; label: string }[]>);

  const machineOptions = Object.entries(groupedMachines).map(([type, machines]) => ({
    label: type === 'ungrouped' ? 'CPU' : type,
    options: machines
  }));

  const currencyOptions = [
    {
      label: 'Currencies',
      options: topCurrencies.map(curr => ({
        value: curr.value,
        label: `${curr.value} — ${curr.name}`
      }))
    },
    {
      label: 'All Supported Currencies',
      options: currencies.map(curr => ({
        value: curr.value,
        label: `${curr.value} — ${curr.name}`
      }))
    }
  ];

  useEffect(() => {
    if (selectedMachine) {
      const machine = machines.find((m) => m.name === selectedMachine);
      if (machine) {
        setHashrate(machine.hashrate.toString());
        if (typeof machine.powerConsumption === 'number') {
          setElectricityConsumption(machine.powerConsumption.toString());
        }
      }
    } else {
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
          siteConfig.customFields,
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
          <Select
            id="currency"
            value={currencyOptions
              .flatMap(group => group.options)
              .find(option => option.value === currency)}
            onChange={(option) => setCurrency(option?.value || 'EUR')}
            options={currencyOptions}
            className={styles.reactSelect}
            classNamePrefix="react-select"
            isSearchable={true}
            placeholder="Select currency..."
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: 'rgba(32, 33, 33, 1)',
                border: '1px solid var(--ifm-color-emphasis-200, #444)',
                borderRadius: '8px',
                minHeight: '38px',
                cursor: 'context-menu',
                '&:hover': {
                  borderColor: 'var(--ifm-color-emphasis-200, #444)'
                }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: 'rgba(32, 33, 33, 1)',
                border: '1px solid var(--ifm-color-emphasis-200, #444)',
                borderRadius: '8px',
                marginTop: '4px'
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? 'var(--ifm-color-primary)' : 'transparent',
                color: state.isFocused ? 'white' : 'var(--ifm-font-color-base, #fff)',
                cursor: 'context-menu',
                padding: '8px 12px',
                '&:hover': {
                  backgroundColor: 'var(--ifm-color-primary)',
                  color: 'white'
                }
              }),
              group: (base) => ({
                ...base,
                paddingTop: 0
              }),
              groupHeading: (base) => ({
                ...base,
                color: 'var(--ifm-color-primary)',
                fontWeight: 'bold',
                fontSize: '0.9em',
                padding: '8px 12px',
                backgroundColor: 'rgba(32, 33, 33, 0.8)'
              }),
              input: (base) => ({
                ...base,
                color: 'var(--ifm-font-color-base, #fff)',
                margin: 0,
                cursor: 'context-menu'
              }),
              singleValue: (base) => ({
                ...base,
                color: 'var(--ifm-font-color-base, #fff)'
              }),
              placeholder: (base) => ({
                ...base,
                color: 'var(--ifm-color-emphasis-600)'
              }),
              clearIndicator: (base) => ({
                ...base,
                color: 'var(--ifm-color-emphasis-600)',
                cursor: 'context-menu',
                '&:hover': {
                  color: 'var(--ifm-color-emphasis-800)'
                }
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: 'var(--ifm-color-emphasis-600)',
                cursor: 'context-menu',
                '&:hover': {
                  color: 'var(--ifm-color-emphasis-800)'
                }
              })
            }}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="machine">Machine Template</label>
          <Select
            id="machine"
            value={selectedMachine ? { value: selectedMachine, label: selectedMachine } : null}
            onChange={(option) => setSelectedMachine(option?.value || '')}
            options={machineOptions}
            isClearable
            placeholder="Select a machine..."
            className={styles.reactSelect}
            classNamePrefix="react-select"
            isSearchable={true}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: 'rgba(32, 33, 33, 1)',
                border: '1px solid var(--ifm-color-emphasis-200, #444)',
                borderRadius: '8px',
                minHeight: '38px',
                cursor: 'context-menu',
                '&:hover': {
                  borderColor: 'var(--ifm-color-emphasis-200, #444)'
                }
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: 'rgba(32, 33, 33, 1)',
                border: '1px solid var(--ifm-color-emphasis-200, #444)',
                borderRadius: '8px',
                marginTop: '4px'
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? 'var(--ifm-color-primary)' : 'transparent',
                color: state.isFocused ? 'white' : 'var(--ifm-font-color-base, #fff)',
                cursor: 'context-menu',
                padding: '8px 12px',
                '&:hover': {
                  backgroundColor: 'var(--ifm-color-primary)',
                  color: 'white'
                }
              }),
              group: (base) => ({
                ...base,
                paddingTop: 0
              }),
              groupHeading: (base) => ({
                ...base,
                color: 'var(--ifm-color-primary)',
                fontWeight: 'bold',
                fontSize: '0.9em',
                padding: '8px 12px',
                backgroundColor: 'rgba(32, 33, 33, 0.8)'
              }),
              input: (base) => ({
                ...base,
                color: 'var(--ifm-font-color-base, #fff)',
                margin: 0,
                cursor: 'context-menu'
              }),
              singleValue: (base) => ({
                ...base,
                color: 'var(--ifm-font-color-base, #fff)'
              }),
              placeholder: (base) => ({
                ...base,
                color: 'var(--ifm-color-emphasis-600)'
              }),
              clearIndicator: (base) => ({
                ...base,
                color: 'var(--ifm-color-emphasis-600)',
                cursor: 'context-menu',
                '&:hover': {
                  color: 'var(--ifm-color-emphasis-800)'
                }
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: 'var(--ifm-color-emphasis-600)',
                cursor: 'context-menu',
                '&:hover': {
                  color: 'var(--ifm-color-emphasis-800)'
                }
              })
            }}
          />
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

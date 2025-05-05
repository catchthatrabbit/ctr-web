import React, { useState, useEffect } from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { InputText } from '@site/src/components/Atoms/InputText';
import { profitabilityCalculation } from '@site/src/utils/profitabilityCalculation';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import { POOLS_API_CONFIG_TYPE } from '@site/src/configs/types';
import ExchNumberFormat from 'exchange-rounding';

// Currency options
const topCurrencies = [
  { value: 'EUR', name: 'Euro' },
  { value: 'USD', name: 'US Dollar' },
  { value: 'CHF', name: 'Swiss Franc' }
];

const otherCurrencies = [
  { value: 'AED', name: 'UAE Dirham' },
  { value: 'ARS', name: 'Argentine Peso' },
  { value: 'AUD', name: 'Australian Dollar' },
  { value: 'AZN', name: 'Azerbaijani Manat' },
  { value: 'BBD', name: 'Barbadian Dollar' },
  { value: 'BDT', name: 'Bangladeshi Taka' },
  { value: 'BGN', name: 'Bulgarian Lev' },
  { value: 'BHD', name: 'Bahraini Dinar' },
  { value: 'BIF', name: 'Burundian Franc' },
  { value: 'BOB', name: 'Bolivian Boliviano' },
  { value: 'BRL', name: 'Brazilian Real' },
  { value: 'BSD', name: 'Bahamian Dollar' },
  { value: 'BWP', name: 'Botswana Pula' },
  { value: 'CAD', name: 'Canadian Dollar' },
  { value: 'CHF', name: 'Swiss Franc' },
  { value: 'CLP', name: 'Chilean Peso' },
  { value: 'CNY', name: 'Chinese Yuan' },
  { value: 'COP', name: 'Colombian Peso' },
  { value: 'CRC', name: 'Costa Rican Colón' },
  { value: 'CUP', name: 'Cuban Peso' },
  { value: 'CZK', name: 'Czech Koruna' },
  { value: 'DKK', name: 'Danish Krone' },
  { value: 'DOP', name: 'Dominican Peso' },
  { value: 'EGP', name: 'Egyptian Pound' },
  { value: 'ETB', name: 'Ethiopian Birr' },
  { value: 'EUR', name: 'Euro' },
  { value: 'GBP', name: 'British Pound' },
  { value: 'GHS', name: 'Ghanaian Cedi' },
  { value: 'GNF', name: 'Guinean Franc' },
  { value: 'GTQ', name: 'Guatemalan Quetzal' },
  { value: 'HKD', name: 'Hong Kong Dollar' },
  { value: 'HNL', name: 'Honduran Lempira' },
  { value: 'HTG', name: 'Haitian Gourde' },
  { value: 'HUF', name: 'Hungarian Forint' },
  { value: 'IDR', name: 'Indonesian Rupiah' },
  { value: 'ILS', name: 'Israeli Shekel' },
  { value: 'INR', name: 'Indian Rupee' },
  { value: 'IQD', name: 'Iraqi Dinar' },
  { value: 'ISK', name: 'Icelandic Króna' },
  { value: 'JMD', name: 'Jamaican Dollar' },
  { value: 'JOD', name: 'Jordanian Dinar' },
  { value: 'JPY', name: 'Japanese Yen' },
  { value: 'KES', name: 'Kenyan Shilling' },
  { value: 'KGS', name: 'Kyrgyzstani Som' },
  { value: 'KHR', name: 'Cambodian Riel' },
  { value: 'KRW', name: 'South Korean Won' },
  { value: 'KWD', name: 'Kuwaiti Dinar' },
  { value: 'KZT', name: 'Kazakhstani Tenge' },
  { value: 'LAK', name: 'Lao Kip' },
  { value: 'LBP', name: 'Lebanese Pound' },
  { value: 'LYD', name: 'Libyan Dinar' },
  { value: 'MAD', name: 'Moroccan Dirham' },
  { value: 'MDL', name: 'Moldovan Leu' },
  { value: 'MGA', name: 'Malagasy Ariary' },
  { value: 'MKD', name: 'Macedonian Denar' },
  { value: 'MMK', name: 'Myanmar Kyat' },
  { value: 'MOP', name: 'Macanese Pataca' },
  { value: 'MUR', name: 'Mauritian Rupee' },
  { value: 'MVR', name: 'Maldivian Rufiyaa' },
  { value: 'MWK', name: 'Malawian Kwacha' },
  { value: 'MXN', name: 'Mexican Peso' },
  { value: 'MYR', name: 'Malaysian Ringgit' },
  { value: 'MZN', name: 'Mozambican Metical' },
  { value: 'NAD', name: 'Namibian Dollar' },
  { value: 'NGN', name: 'Nigerian Naira' },
  { value: 'NIO', name: 'Nicaraguan Córdoba' },
  { value: 'NOK', name: 'Norwegian Krone' },
  { value: 'NPR', name: 'Nepalese Rupee' },
  { value: 'NZD', name: 'New Zealand Dollar' },
  { value: 'OMR', name: 'Omani Rial' },
  { value: 'PEN', name: 'Peruvian Sol' },
  { value: 'PHP', name: 'Philippine Peso' },
  { value: 'PKR', name: 'Pakistani Rupee' },
  { value: 'PLN', name: 'Polish Złoty' },
  { value: 'PYG', name: 'Paraguayan Guaraní' },
  { value: 'QAR', name: 'Qatari Riyal' },
  { value: 'RON', name: 'Romanian Leu' },
  { value: 'RSD', name: 'Serbian Dinar' },
  { value: 'RUB', name: 'Russian Ruble' },
  { value: 'RWF', name: 'Rwandan Franc' },
  { value: 'SAR', name: 'Saudi Riyal' },
  { value: 'SCR', name: 'Seychellois Rupee' },
  { value: 'SDG', name: 'Sudanese Pound' },
  { value: 'SEK', name: 'Swedish Krona' },
  { value: 'SGD', name: 'Singapore Dollar' },
  { value: 'SOS', name: 'Somali Shilling' },
  { value: 'THB', name: 'Thai Baht' },
  { value: 'TJS', name: 'Tajikistani Somoni' },
  { value: 'TND', name: 'Tunisian Dinar' },
  { value: 'TRY', name: 'Turkish Lira' },
  { value: 'TWD', name: 'New Taiwan Dollar' },
  { value: 'TZS', name: 'Tanzanian Shilling' },
  { value: 'UAH', name: 'Ukrainian Hryvnia' },
  { value: 'UGX', name: 'Ugandan Shilling' },
  { value: 'USD', name: 'United States Dollar' },
  { value: 'UYU', name: 'Uruguayan Peso' },
  { value: 'UZS', name: 'Uzbekistani Som' },
  { value: 'VND', name: 'Vietnamese Đồng' },
  { value: 'XAF', name: 'Central African CFA Franc' },
  { value: 'XOF', name: 'West African CFA Franc' },
  { value: 'XPF', name: 'CFP Franc' },
  { value: 'YER', name: 'Yemeni Rial' },
  { value: 'ZAR', name: 'South African Rand' },
  { value: 'ZMW', name: 'Zambian Kwacha' }
];

const machineList = [
  {
    name: 'CTR MAX Series - 13 kh/s',
    hashrate: 13000,
    power: 0
  },
  {
    name: 'AMD Ryzen™ 9 7950X3D',
    hashrate: 25000,
    power: 600
  }
];

const allCurrencies = [
  ...topCurrencies.map(c => ({ ...c, code: c.value })),
  ...otherCurrencies.map(c => ({ ...c, code: c.value })),
];

// Type guard for profitabilityCalculation result
function isProfitabilityResult(obj: any): obj is { revenue: number; xcbPrice: number; rewardXCB: number } {
  return obj && typeof obj === 'object' && 'revenue' in obj && 'xcbPrice' in obj;
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
  const [result, setResult] = useState<null | { profit: number; xcbPrice: number; rewardXCB: number }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputWarning, setInputWarning] = useState<string | null>(null);

  // Helper function to determine color based on value
  const getValueColor = (value: number): string => {
    if (value > 0) return 'var(--ifm-color-success)';
    if (value < 0) return 'var(--ifm-color-danger)';
    return 'white';
  };

  // Alphabetically sorted machine list
  const sortedMachines = [...machineList].sort((a, b) => a.name.localeCompare(b.name));

  // Handle machine template selection
  useEffect(() => {
    if (selectedMachine) {
      const machine = machineList.find(m => m.name === selectedMachine);
      if (machine) {
        setHashrate(machine.hashrate.toString());
        // Always set power if it's defined, even if it's 0
        if (typeof machine.power === 'number') {
          setElectricityConsumption(machine.power.toString());
        }
      }
    } else {
      // Clear all fields when "None" is selected
      setHashrate('');
      setElectricityConsumption('');
      setExtraExpenses('');
    }
  }, [selectedMachine, machineList]);

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
      // Allow negative values for electricity cost
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
          const profitAfterExpenses = res.revenue - (res.electricityCost || 0) - extraExpensesNum;
          const rewardXCB = Number.isFinite(res.rewardXCB) ? res.rewardXCB : 0;
          setResult({
            profit: profitAfterExpenses,
            xcbPrice: res.xcbPrice,
            rewardXCB
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
    return () => { cancelled = true; };
  }, [hashrate, electricityCost, electricityConsumption, extraExpenses, currency, siteConfig]);

  return (
    <div className={styles.calculatorRoot}>
      <Text variant="heading2" color="white" weight="semiBold">
        Profit Calculator
      </Text>
      <Spacer variant="sm" />
      <form className={styles.calculatorForm} onSubmit={e => e.preventDefault()}>
        <div className={styles.inputGroup}>
          <label htmlFor="currency">
            Currency
          </label>
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
              {otherCurrencies.map((curr) => (
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
          <div style={{ textAlign: 'right', marginTop: '4px' }}>
            <a
              href="https://github.com/catchthatrabbit/ctr-web/issues/new?template=template_proposal.yml"
              target="_blank"
              rel="noopener"
              style={{
                fontSize: 'var(--small-font-size)',
                color: 'var(--ifm-color-primary)'
              }}
            >
              Propose new template
            </a>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>
              Hashrate (h/s)
            <InputText
              type="number"
              min="1"
              step="any"
              value={hashrate}
              onChange={e => setHashrate(e.target.value)}
              placeholder="Enter hashrate in h/s"
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
              onChange={e => setElectricityCost(e.target.value)}
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
              onChange={e => setElectricityConsumption(e.target.value)}
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
              onChange={e => setExtraExpenses(e.target.value)}
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
            <span style={{ marginRight: '0.5em' }}>Estimated Monthly Profit:</span>
            <Text variant="body" weight="semiBold" style={{ color: getValueColor(result.profit) }}>
              {`${new ExchNumberFormat(undefined, {
                style: 'currency',
                currency: currency
              }).format(result.profit)}`}
            </Text>
          </div>
          <div className={styles.resultItem}>
            <span style={{ marginRight: '0.5em' }}>Reward in XCB (brutto):</span>
            <Text variant="body" weight="semiBold" style={{ color: getValueColor(result.rewardXCB) }}>
              {`${new ExchNumberFormat(undefined, {
                style: 'currency',
                currency: 'XCB'
              }).format(result.rewardXCB)}`}
            </Text>
          </div>
          {result.profit < 0 && (
            <div className={styles.resultItem}>
              Not profitable? <a href={customFields.URLS.BUY_LINK} target="_blank" rel="noopener" style={{ color: 'var(--ifm-color-primary)' }}>Buy XCB instead</a>
            </div>
          )}
          <div className={styles.resultItem}>
            <Text variant="smallBody" color="subheadingColor">
              {`XCB Price: ${new ExchNumberFormat(undefined, {
                style: 'currency',
                currency: currency
              }).format(result.xcbPrice)}`}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;

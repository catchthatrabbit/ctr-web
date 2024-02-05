import { SingleColumnPanel } from "@site/src/components/Molecules/SingleColumnPanel";
import { REGIONS } from "@site/src/constants/regions";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { GetStartedTitle, PoolTitle } from "@site/src/components/Molecules/PictureTitles";
import { Panel, PanelContent, Title } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import styles from './styles.module.css';
import { KBD } from "@site/src/components/Atoms/KBD";
import { InputText } from "@site/src/components/Atoms/InputText";
import { useRef } from "react";
import { Button } from "../../Atoms/Button";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { Search } from "@site/src/components/Molecules/Search";
import { TwoColumnsPanel } from "@site/src/components/Molecules/TwoColumnsPanel";
import { useFetchSettings } from "@site/src/hooks/useSettings";
import { STANDARD_REGIONS_API_VALUES } from "@site/src/Api/types";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { convertSettingsResponse2SettingsInfo } from "./utils";

interface IStartMining {
    defaultRegion?: STANDARD_REGIONS_API_VALUES
    onSetWalletAddress: (walletAddress:string) => void
    onChangeRegion?: (region:STANDARD_REGIONS_API_VALUES) => void
}

const StartMining = ({defaultRegion, onSetWalletAddress, onChangeRegion}:IStartMining) => {

    const inputStartMiningRef = useRef<HTMLInputElement>();

    const handleOnFocus = () =>{
        inputStartMiningRef.current.select();
    }

    const {region, handleSearch} = 
    useHeaders({defaultRegion, onSetWalletAddress, onChangeRegion});

    const {data:fetchSettings} = useFetchSettings(region);

    return (
        <div className="container">
            <Spacer variant='xLarge' />
            <PoolTitle />
            <Spacer variant="large" />
            {Object.keys(REGIONS).map(REGION_KEY => (
                <>
                    <SingleColumnPanel title={REGIONS[REGION_KEY].summary} data={[
                        {label:"Server", value:REGIONS[REGION_KEY].url},
                        {label:"Port", value:"8008"},
                        {label:"Username", value:"<your wallet address>.<worker name>"},
                        {label:"Password", value:"<empty>"},
                    ]}/>
                    <Spacer variant="large" />
                </>
            ))}
            <GetStartedTitle />
            <Spacer variant="large" />
            <Panel titleSize="md" title="Step 1: Get a Wallet">
                <PanelContent>
                    <Text size="sm" variant="values"> Please, download the Core Wallet, where you can securely store your rewards. </Text>
                    <Spacer variant="small" />
                    <br />
                    <Text variant="values" size="sm">You can download</Text>
                    <Text variant="link" size="sm">&nbsp; go-core client &nbsp;</Text>
                    <Text variant="values" >or use</Text>
                    <Text variant="link">&nbsp; generator of ICAN wallets.</Text>
                    <br />
                    <Spacer/>
                    <KBD>
                        clear && history -c
                    </KBD>
                    <Spacer />
                    <Text size="sm" variant="values">Always remember to backup your private key! Clear your terminal session and history if needed:</Text>
                    <br />
                    <Text size="sm" variant="values">No Private key = No Coins!</Text>
                    <br />
                    <div className={clsx(styles.lineFlex, styles.alignItemsCenter)}><Text size="sm">Go-core command:</Text><Spacer direction="horizontal" /><KBD>chmod -x gocore && ./gocore account new</KBD></div>
                    <Spacer />
                    <div className={clsx(styles.lineFlex, styles.alignItemsCenter)}><Text>Wallet Generator command:</Text><Spacer direction="horizontal" /> <KBD>chmod -x wallet-generator && ./wallet-generator</KBD></div>
                    <Spacer variant="xLarge" />
                    <Title size="md" title="Step 2: Download & Configure Verification software">
                        <Spacer variant="large" />
                        <Text variant="values" size="sm">You can automatically download and configure software with just one command</Text>
                        <Spacer variant="small" />
                        <Text variant="values" size="sm">Or you can download the software and set it up.</Text>
                        <br />
                        <Text variant="values" size="sm">You can choose from the following software:</Text>
                    </Title>
                    <Spacer variant="large" />
                    <div className={clsx("col col--7",styles.coreMiner)}>
                        <Panel title="CoreMiner">
                            <div className={styles.panelContent}>
                                <Text variant="values">Fast & Open-source miner with excellent hardware support & 0% fees.</Text>
                                <Spacer variant="small"/>
                                <Text variant="values">OS: Ubuntu, Raspbian</Text>
                                <br />
                                <Text variant="values">CPUs: AMD, Intel, ARM</Text>
                                <br />
                                <Text variant="values">Fee: 0%</Text>
                                <Spacer />
                                <Text variant="values">Command to configure the software:</Text>
                                <InputText ref={inputStartMiningRef} className={styles.input} onFocus={handleOnFocus}
                                value="bash <(curl -s https://raw.githubusercontent.com/catchthatrabbit/coreminer/master/mine.sh)" />
                                <Spacer variant="large" />
                                <div className={clsx(styles.lineFlex, styles.justifyContentCenter)}>
                                    <Link to="https://github.com/catchthatrabbit/coreminer/releases">
                                        <Button value="Download Release" ></Button>
                                    </Link>
                                </div>
                            </div>
                        </Panel>
                    </div>
                    <Spacer variant="xxLarge" />
                    <Title size="md" title="Step 3: Choose your server">
                        <Text size="sm" variant="values">
                            We have Geo-locations to choose from:
                        </Text>
                        <Spacer variant="large" />
                        <div className={styles.lineFlex}>
                            {Object.keys(REGIONS).map((REGION_KEY, index) => (
                                <>
                                    <Button key={index} className={styles.buttonConfig}
                                    href={`#${REGIONS[REGION_KEY].value}`} value={REGIONS[REGION_KEY].summary} />
                                    <Spacer direction="horizontal"  />
                                </>
                            ))}
                        </div>
                    </Title>
                    <Spacer variant="large" />
                    <Title size="md" title="Step 4: Go To Dashboard">
                        <Text size="sm" variant="values">To access the Dashboard, type your address below.</Text>
                        <Spacer variant="large" />
                        <div className={clsx(styles.marginAuto,"col col--11")}><Search onSearch={handleSearch} /></div>

                    </Title>
                </PanelContent>
            </Panel>
            <Spacer variant="large" />
            <TwoColumnsPanel data={{title:'Pool details', data:convertSettingsResponse2SettingsInfo(fetchSettings)}} />
            <Spacer variant="xLarge" />
        </div>
    )

}


export default StartMining;
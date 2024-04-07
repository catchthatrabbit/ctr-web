import React from "react";
import styles from "./styles.module.css";
import StartMiningTitle from "@site/src/components/Molecules/PictureTitles/StartMiningTitle";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "../../Atoms/Spacer";
import { Button } from "../../Atoms/Button";

interface IStartMining{
}

const StartMining = () => {
    return(
        <div className={styles.startMining}>
            <div className={styles.startMiningContent}>
                <StartMiningTitle />
                <Spacer variant="xl" />
                <Text variant="heading2">
                    Let's jump into it
                </Text>
                <Spacer variant="xl" />
                <Button className={styles.button} value="Start mining" href="/start-mining"/>
            </div>
        </div>
    )
}

export default StartMining;
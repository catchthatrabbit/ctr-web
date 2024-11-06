import React from "react";
import styles from "./styles.module.css"; // Ensure this import is correct
import { Text } from "@site/src/components/Atoms/Text"; // Ensure this import is correct
import { Search } from "@site/src/components/Molecules/Search"; // Ensure this import is correct
import { Spacer } from "@site/src/components/Atoms/Spacer"; // Ensure this import is correct

interface Step {
  number: number;
  title: string;
  text: string;
  link: string;
  linkText: string;
  image?: string;
  showSearch?: boolean;
}

interface StepsProps {
  steps: Step[];
}

const stepsData: Step[] = [
  {
    number: 1,
    title: "Download CorePass",
    text: "Download CorePass mobile app, wallet where you can securely store your rewards.",
    link: "#",
    linkText: "Learn more",
    image: "https://via.placeholder.com/150",
  },
  {
    number: 2,
    title: "Step 2 Title",
    text: "This is the text for step 2.",
    link: "#",
    linkText: "Learn more",
    showSearch: true,
  },
  {
    number: 3,
    title: "Step 3 Title",
    text: "This is the text for step 3.",
    link: "#",
    linkText: "Learn more",
  },
];

const Steps: React.FC = () => {
  return (
    <div className={styles.stepsContainer}>
      {stepsData.map((step) => (
        <div key={step.number} className={`flex flex-column ${styles.step}`}>
          <h2 className={styles.title}>
            {step.number}. {step.title}
          </h2>
          <Text
            variant="body"
            weight="semiBold"
            color="white"
            style={{ margin: "8px 0px 0 22px" }}
          >
            {step.text}
          </Text>
          <Spacer variant="md" />
          <a href={step.link} className={styles.link}>
            <Text
              variant="smallBody"
              color="primary"
              weight="bold"
              style={{ margin: "8px 0px 0 22px" }}
            >
              {step.linkText}
            </Text>
          </a>
          {step.image && (
            <img src={step.image} alt={step.title} className={styles.image} />
          )}
          {step.showSearch && <Search />}
        </div>
      ))}
    </div>
  );
};

export default Steps;

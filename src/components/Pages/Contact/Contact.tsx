import { ContactTitle } from "@site/src/components/Molecules/PictureTitles";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { EmailPanel } from "@site/src/components/Molecules/EmailPanel";
import { useControls } from "./controls";

const Contact = () => {
  const {
    maintainersCommercialDescription,
    maintainersCommercialEmail,
    maintainersSecurityDescription,
    maintainersSecurityEmail,
    maintainersSupportDescription,
    maintainersSupportEmail,
  } = useControls();

  return (
    <>
      <Spacer variant="xxxxl" />
      <ContactTitle />
      <Spacer variant="lg" />
      <EmailPanel
        title="Support"
        emailAddress={maintainersSupportEmail}
        text={maintainersSupportDescription}
      />
      <Spacer variant="lg" />
      <EmailPanel
        title="Security"
        emailAddress={maintainersSecurityEmail}
        text={maintainersSecurityDescription}
      />
      <Spacer variant="lg" />
      <EmailPanel
        title="Commercial"
        emailAddress={maintainersCommercialEmail}
        text={maintainersCommercialDescription}
      />
      <Spacer variant="xl" />
    </>
  );
};

export default Contact;

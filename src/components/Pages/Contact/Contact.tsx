import { ContactTitle } from "@site/src/components/Molecules/PictureTitles";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import {EmailPanel} from "@site/src/components/Molecules/EmailPanel";

const Contact = () => {

    return (
        <div className="container">
            <Spacer variant="xxxxl" />
            <ContactTitle />
            <Spacer variant="lg" />
            <EmailPanel title="Support" emailAddress="support@catchthatrabbit.com" 
            text="If you have any questions about our pool, you can contact us freely through this email."  />
            <Spacer variant="lg" />
            <EmailPanel title="Security" emailAddress="security@catchthatrabbit.com" 
            text="Any bug or any other security issue reports are highly and greatly appreciated."  />
            <Spacer variant="lg" />
            <EmailPanel title="Commercial" emailAddress="contact@catchthatrabbit.com" 
            text="Please, feel free to email us with any legal and commercial questions."  />
            <Spacer variant="xl" />
        </div>
    )

}

export default Contact;
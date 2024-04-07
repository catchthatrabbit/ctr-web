import { TextFormat } from "@site/src/utils/textFormat";
import { Header } from "../../Templates/Header";
import { List } from "@site/src/components/Templates/List";
import { convertPaymentsResponse2PaymentInfo } from "./utils";
import { PaymentsTitle } from "@site/src/components/Molecules/PictureTitles";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";


interface IPayments extends IAnyPageAndWallet{};

const Payments = ({defaultRegion, onSetWalletAddress, onChangeRegion}:IPayments) => {

    const {dataTableColumns, fetchedPaymentsList, fetchedPaymentsState, handleChangeRegion, handlePageChange, 
        handleSearch, isLoadingPaymentState, isLoadingPaymentList} = 
    useControls({defaultRegion, onSetWalletAddress, onChangeRegion});

    return (
        <>
            <Spacer variant='xxxxl' />
            <Header onChangeRegion={handleChangeRegion} isLoading={isLoadingPaymentState}
            pageTitleComponent={<PaymentsTitle />}
            boardItems={
                [
                    {   
                        desc:"Sent payments", value: TextFormat.getNumberText(fetchedPaymentsState?.paymentsTotal).text, 
                        prefix:"", 
                        suffix:""
                    }
                ]
            } 
            onSearch={handleSearch} />
            <div className="container">
                <List isLoading={isLoadingPaymentList} data={convertPaymentsResponse2PaymentInfo(fetchedPaymentsList)} 
                dataTableColumns={dataTableColumns} 
                onPageChange={handlePageChange} total={fetchedPaymentsList?.paymentsTotal}/>
            </div>
        </>
    )

}

export default Payments;
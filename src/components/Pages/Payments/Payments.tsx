import { TextFormat } from "@site/src/utils/textFormat";
import { Header } from "../../Templates/Header";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { useFetchPayments, useFetchPaymentsState } from "@site/src/hooks/usePayments";
import { usePaginate } from "@site/src/hooks/usePaginate";
import { List } from "@site/src/components/Templates/List";
import { useMemo } from "react";
import { convertPaymentsResponse2PaymentInfo } from "./utils";
import { STANDARD_REGIONS_API_VALUES } from "@site/src/Api/types";
import { TRANSACTION_DETAILS_URL } from "@site/src/constants/urls";
import { PaymentsTitle } from "@site/src/components/Molecules/PictureTitles";
import { Spacer } from "@site/src/components/Atoms/Spacer";


interface IPayments{
    defaultRegion?: STANDARD_REGIONS_API_VALUES
    onSetWalletAddress: (walletAddress:string) => void
    onChangeRegion?: (region:STANDARD_REGIONS_API_VALUES) => void
}

const Payments = ({defaultRegion, onSetWalletAddress, onChangeRegion}:IPayments) => {

    const {handleChangeRegion, handleSearch, region, setWalletAddress} = useHeaders({defaultRegion, onSetWalletAddress, onChangeRegion});
    const {currentPageNumber, handlePageChange} = usePaginate();

    const {data:fetchedPaymentsState} = useFetchPaymentsState(region);
    const {data:fetchedPaymentsList} = useFetchPayments(region, 10, currentPageNumber);

    const dataTableColumns = useMemo(() => [
        {value:'timestamp', label: 'Time'}, 
        {value:'amount', label: 'Amount', alignToCenter:true}, 
        {value:'address', label: 'Address', alignToCenter:true,isPrimary:true, fn: setWalletAddress},
        {value:'tx', label: 'Tx id', alignToCenter:true, isPrimary:true, href:TRANSACTION_DETAILS_URL }
    ], [])

    return (
        <>
            <Header onChangeRegion={handleChangeRegion} 
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
            <List data={convertPaymentsResponse2PaymentInfo(fetchedPaymentsList)} dataTableColumns={dataTableColumns} 
            onPageChange={handlePageChange} total={fetchedPaymentsList?.paymentsTotal}/>
        </>
    )

}

export default Payments;
import { IDataTable } from "@site/src/components/Atoms/DataTable"
import { EXTERNAL_URL } from "@site/src/constants/links"
import { EXTERNAL_URL_ENUM } from "@site/src/enums/externalUrls.enum"

export const workersTableColumn = [
    {
        value:'rabbit',
        label:'Rabbit',
    },
    {
        value:'hr',
        label: 'Hashrate ~30m',
        alignToCenter:true
    },
    {
        value:'hr2',
        label: 'Hashrate ~3h',
        alignToCenter:true
    },
    {
        value:'lastBeat',
        label: 'Last share',
        alignToCenter:true
    },
    {
        value:'offline',
        label: 'Status',
        alignToCenter:true
    }
] as IDataTable['columns']

export const paymentPayoutTableColumns = [
    {
        label:"Time",
        value:"timestamp",
        alignToCenter:true
    },
    {
        label:"Tx id",
        value:"tx",
        isPrimary:true,
        alignToCenter:true,
        href: EXTERNAL_URL[EXTERNAL_URL_ENUM.TRANSACTION_DETAILS]
    },
    {
        label:"Amount",
        value:"amount",
        alignToCenter:true
    }

] as IDataTable['columns']
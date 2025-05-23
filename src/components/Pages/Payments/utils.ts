import { PAYMENTS_RESPONSE } from '@site/src/Api/payments/types';
import { UNITS } from '@site/src/constants/units';
import { summarizedText } from '@site/src/utils/summarizedText';
import { convertNumber2Currency } from '@site/src/utils/convertNumber2Currency';
import { convertTime2Date } from '@site/src/utils/convertTime2Date';

export const convertPaymentsResponse2PaymentInfo = (
  paymentResponse: PAYMENTS_RESPONSE
): Array<{
  address: string;
  address_summarized: string;
  amount: string;
  timestamp: string;
  tx: string;
  tx_summarized: string;
}> => {
  if (!paymentResponse) return [];

  return paymentResponse?.payments?.map((payment) => ({
    address: payment.address,
    address_summarized: summarizedText(payment.address, 10, 39),
    amount: convertNumber2Currency((payment?.amount || 0) / UNITS.NUCLE),
    timestamp: convertTime2Date(payment?.timestamp),
    tx: payment.tx,
    tx_summarized: summarizedText(payment.tx, 10, payment.tx.length - 6),
  }));
};

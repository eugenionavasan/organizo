import { CardElement } from '@stripe/react-stripe-js';
import { FormSelect } from './formSelect';

interface PaymentSectionProps {
  paymentOption: 'now' | 'later';
  setPaymentOption: (option: 'now' | 'later') => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ paymentOption, setPaymentOption }) => (
  <>
    <FormSelect
      label="Payment Option"
      value={paymentOption}
      onChange={(e) => setPaymentOption(e.target.value as 'now' | 'later')}
      options={[
        { value: 'now', label: 'Pay Now' },
        { value: 'later', label: 'Pay on Service Day' },
      ]}
      required
    />
    {paymentOption === 'now' && (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Card Details</label>
        <CardElement className="mt-1 p-2 border rounded" />
      </div>
    )}
  </>
);
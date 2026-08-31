import { useState } from 'react';
import { Check, CreditCard, LockKeyhole, PackageCheck, Wallet } from 'lucide-react';

const steps = ['Cart', 'Delivery', 'Payment', 'Confirm'];
const orderItems = [
  { name: 'Cedar & Amber Eau de Parfum', price: 7800 },
  { name: 'Silk Matte Lip Color', price: 2450 },
  { name: 'Botanical Repair Oil', price: 4100 },
];
const subtotal = orderItems.reduce((total, item) => total + item.price, 0);
const shipping = 450;

export default function PaymentPage() {
  const [method, setMethod] = useState('card');
  const [confirmed, setConfirmed] = useState(false);
  const [cardErrors, setCardErrors] = useState({});
  const [isCardValid, setIsCardValid] = useState(false);

  const handleConfirmPayment = () => {
    if (method === 'card') {
      if (!isCardValid) {
        return;
      }
    }
    setConfirmed(true);
  };

  return (
    <main className="min-h-screen flex-1 bg-[#f6f3ee] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-dashed border-[#d8cdbd] pb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8780c]">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#28231d] sm:text-4xl">Payment</h1>
          <p className="mt-2 text-sm text-[#81796d]">Monitor revenue, successful transactions, and payment statuses.</p>
        </div>

        <div className="mx-auto mt-9 flex max-w-3xl items-start">
          {steps.map((step, index) => {
            const active = index <= 2 || confirmed;
            return (
              <div key={step} className="flex flex-1 items-start last:flex-none">
                <div className="flex flex-col items-center">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${active ? 'bg-[#c9a227] text-[#28231d]' : 'bg-[#e3e1dc] text-[#aaa69e]'} ${index === 2 && !confirmed ? 'bg-black text-white' : ''}`}>
                    {confirmed && index === 3 ? <Check size={17} /> : index + 1}
                  </span>
                  <span className={`mt-2 text-xs ${index === 2 && !confirmed ? 'font-semibold text-[#28231d]' : 'text-[#9a948a]'}`}>{step}</span>
                </div>
                {index < steps.length - 1 && <span className={`mt-4 h-0.5 min-w-8 flex-1 ${index < 2 || confirmed ? 'bg-[#c9a227]' : 'bg-[#d8d5cf]'}`} />}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px]">
          <section className="rounded-lg border border-[#d8d5cf] bg-white p-6 shadow-sm sm:p-8">
            {confirmed ? (
              <Confirmation />
            ) : (
              <>
                <h2 className="text-center font-serif text-xl text-[#28231d]">Payment Method</h2>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  <MethodButton active={method === 'card'} onClick={() => setMethod('card')} icon={<CreditCard size={19} />} label="Credit / Debit Card" />
                  <MethodButton active={method === 'paypal'} onClick={() => setMethod('paypal')} icon={<Wallet size={19} />} label="PayPal" />
                  <MethodButton active={method === 'cash'} onClick={() => setMethod('cash')} icon={<PackageCheck size={19} />} label="Cash on Delivery" />
                </div>

                <div className="mt-8">
                  {method === 'card' && <CardForm onValidationChange={setIsCardValid} onErrorsChange={setCardErrors} />}
                  {method === 'paypal' && <InfoPanel title="PayPal" text="You will be redirected to PayPal to complete your payment securely." />}
                  {method === 'cash' && <InfoPanel title="Cash on Delivery" text="Pay with cash when your order arrives. Please have the exact amount ready for the delivery rider. A LKR 400 COD fee applies." />}
                </div>
                <button 
                  onClick={handleConfirmPayment} 
                  disabled={method === 'card' && !isCardValid}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-bold uppercase tracking-wide transition ${
                    method === 'card' && !isCardValid
                      ? 'bg-[#d8cdbd] text-[#aaa69e] cursor-not-allowed'
                      : 'bg-[#c9a227] text-[#28231d] hover:bg-[#b48e1e]'
                  }`}
                >
                  Confirm Payment - LKR {(subtotal + shipping + (method === 'cash' ? 400 : 0)).toLocaleString()}
                </button>
              </>
            )}
          </section>

          <aside className="h-fit overflow-hidden rounded-lg border border-[#d8d5cf] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="font-serif text-lg text-[#28231d]">Order Summary</h2>
              <div className="mt-5 space-y-4">
                {orderItems.map((item) => <div key={item.name} className="flex justify-between gap-4 text-xs text-[#6c675e]"><span>{item.name}</span><span className="shrink-0">LKR {item.price.toLocaleString()}</span></div>)}
              </div>
            </div>
            <div className="border-t border-[#e7e0d5] px-6 py-5 text-xs text-[#6c675e]">
              <div className="flex justify-between"><span>Subtotal</span><span>LKR {subtotal.toLocaleString()}</span></div>
              <div className="mt-2 flex justify-between"><span>Shipping</span><span>LKR {shipping.toLocaleString()}</span></div>
              {method === 'cash' && <div className="mt-2 flex justify-between"><span>COD fee</span><span>LKR 400</span></div>}
            </div>
            <div className="border-t border-[#d8d5cf] px-6 py-5"><div className="flex justify-between font-semibold text-[#28231d]"><span>Total</span><span>LKR {(subtotal + shipping + (method === 'cash' ? 400 : 0)).toLocaleString()}</span></div></div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function MethodButton({ active, onClick, icon, label }) {
  return <button onClick={onClick} className={`flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border px-2 text-center text-[10px] font-semibold transition ${active ? 'border-[#e4b936] bg-[#fff8e7] text-[#a8780c] ring-1 ring-[#f1d274]' : 'border-transparent bg-[#f7f7f6] text-[#716b61] hover:border-[#d8cdbd]'}`} aria-pressed={active}>{icon}{label}</button>;
}

function CardForm() {
  return <div className="space-y-5"><label className="block text-xs font-semibold uppercase tracking-wide text-[#6c675e]">Card number<input className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="4242 4242 4242 4242" /></label><label className="block text-xs font-semibold uppercase tracking-wide text-[#6c675e]">Cardholder name<input className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="Nadun" /></label><div className="grid grid-cols-2 gap-4"><label className="text-xs font-semibold uppercase tracking-wide text-[#6c675e]">Expiry date<input className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="MM / YY" /></label><label className="text-xs font-semibold uppercase tracking-wide text-[#6c675e]">CVV<input className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="***" /></label></div><p className="flex items-center gap-2 rounded-md border border-[#e7e0d5] px-3 py-3 text-xs text-[#9a948a]"><LockKeyhole size={13} /> Your payment info is encrypted and secure via Stripe.</p></div>;
}

function InfoPanel({ title, text }) {
  return <div className="rounded-md bg-[#f7f7f6] px-8 py-10 text-center"><p className="font-serif text-lg text-[#28231d]">{title}</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6c675e]">{text}</p></div>;
}

function Confirmation() {
  return <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2ead8] text-[#a8780c]"><Check size={30} /></span><h2 className="mt-6 text-2xl text-[#28231d]">Payment confirmed</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#81796d]">Thank you, Nadun. Your House of Salaga order is being prepared with care.</p><p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8780c]">Order #DL-1048</p></div>;
}

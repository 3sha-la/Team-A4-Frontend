import { useEffect, useMemo, useState } from 'react';
import { Check, CreditCard, LockKeyhole, PackageCheck, Wallet } from 'lucide-react';
import { apiFetch, getStoredUser } from '../lib/api';
import { normalizeCartItem } from '../lib/normalizers';

const steps = ['Cart', 'Delivery', 'Payment', 'Confirm'];
const shipping = 450;

export default function PaymentPage() {
  const [method, setMethod] = useState('card');
  const [confirmed, setConfirmed] = useState(false);
  const [cardErrors, setCardErrors] = useState({});
  const [isCardValid, setIsCardValid] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const currentUser = getStoredUser();

  useEffect(() => {
    let active = true;
    apiFetch('/cart', { auth: true })
      .then((data) => {
        if (active) setOrderItems((data.cart?.items || []).map(normalizeCartItem));
      })
      .catch(() => {
        if (active) setOrderItems([]);
      });
    return () => {
      active = false;
    };
  }, []);

  const subtotal = useMemo(
    () => orderItems.reduce((total, item) => total + item.price * item.qty, 0),
    [orderItems],
  );

  const handleConfirmPayment = async () => {
    if (method === 'card' && !isCardValid) return;
    if (orderItems.length === 0) return;

    setSubmitting(true);
    try {
      const extras = JSON.parse(localStorage.getItem('hos_profile_extras') || '{}');
      const billing = extras.billing || {};
      const codFee = method === 'cash' ? 400 : 0;
      const totalPrice = subtotal + shipping + codFee;

      const shippingAddress = {
        address: billing.address || '',
        city: billing.city || '',
        postalCode: billing.postalCode || '',
        phone: extras.phone || '',
      };

      await apiFetch('/checkout', {
        method: 'POST',
        auth: true,
        body: {
          cartItems: orderItems.map((item) => ({
            product: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.qty,
          })),
          totalAmount: totalPrice,
          shippingAddress,
        },
      });

      const orderData = await apiFetch('/orders', {
        method: 'POST',
        auth: true,
        body: {
          orderItems: orderItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item.productId,
          })),
          shippingAddress,
          paymentMethod:
            method === 'cash' ? 'Cash on Delivery' : method === 'paypal' ? 'PayPal' : 'Card',
          itemsPrice: subtotal,
          shippingPrice: shipping + codFee,
          totalPrice,
        },
      });

      const createdOrder = orderData.data;
      if (createdOrder?._id) {
        await apiFetch(`/orders/${createdOrder._id}/confirm`, {
          method: 'POST',
          auth: true,
          body: {},
        });

        const deliveryAddress = [billing.address, billing.city, billing.postalCode, billing.country]
          .filter(Boolean)
          .join(', ');
        if (deliveryAddress) {
          await apiFetch('/delivery', {
            method: 'POST',
            auth: true,
            body: { orderId: createdOrder._id, address: deliveryAddress },
          }).catch(() => null);
        }

        setOrderId(createdOrder._id);
      }

      await Promise.all(
        orderItems.map((item) =>
          apiFetch(`/cart/remove/${item.productId}`, {
            method: 'DELETE',
            auth: true,
          }).catch(() => null),
        ),
      );

      setConfirmed(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
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
              <Confirmation name={currentUser?.name} orderId={orderId} />
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
                  disabled={submitting || orderItems.length === 0 || (method === 'card' && !isCardValid)}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-bold uppercase tracking-wide transition ${
                    submitting || orderItems.length === 0 || (method === 'card' && !isCardValid)
                      ? 'bg-[#d8cdbd] text-[#aaa69e] cursor-not-allowed'
                      : 'bg-[#c9a227] text-[#28231d] hover:bg-[#b48e1e]'
                  }`}
                >
                  Confirm Payment - LKR {(subtotal + shipping + (method === 'cash' ? 400 : 0)).toLocaleString()}
                </button>
                {Object.keys(cardErrors).length > 0 && <span className="sr-only">Card form has validation errors.</span>}
              </>
            )}
          </section>

          <aside className="h-fit overflow-hidden rounded-lg border border-[#d8d5cf] bg-white shadow-sm">
            <div className="p-6">
              <h2 className="font-serif text-lg text-[#28231d]">Order Summary</h2>
              <div className="mt-5 space-y-4">
                {orderItems.map((item) => <div key={item.productId} className="flex justify-between gap-4 text-xs text-[#6c675e]"><span>{item.name}</span><span className="shrink-0">LKR {(item.price * item.qty).toLocaleString()}</span></div>)}
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

function CardForm({ onValidationChange, onErrorsChange }) {
  const [values, setValues] = useState({ number: '', name: '', expiry: '', cvv: '' });

  useEffect(() => {
    const errors = {};
    const digits = values.number.replace(/\s/g, '');
    if (digits && !/^\d{16}$/.test(digits)) errors.number = true;
    if (values.expiry && !/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(values.expiry)) errors.expiry = true;
    if (values.cvv && !/^\d{3,4}$/.test(values.cvv)) errors.cvv = true;
    if (values.name && values.name.trim().length < 2) errors.name = true;

    const complete = Boolean(values.number && values.name && values.expiry && values.cvv);
    const valid = complete && Object.keys(errors).length === 0;
    onValidationChange?.(valid);
    onErrorsChange?.(errors);
  }, [values, onValidationChange, onErrorsChange]);

  const change = (field) => (event) => setValues((prev) => ({ ...prev, [field]: event.target.value }));

  return <div className="space-y-5"><label className="block text-xs font-semibold uppercase tracking-wide text-[#6c675e]">Card number<input value={values.number} onChange={change('number')} className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="4242 4242 4242 4242" /></label><label className="block text-xs font-semibold uppercase tracking-wide text-[#6c675e]">Cardholder name<input value={values.name} onChange={change('name')} className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="Nadun" /></label><div className="grid grid-cols-2 gap-4"><label className="text-xs font-semibold uppercase tracking-wide text-[#6c675e]">Expiry date<input value={values.expiry} onChange={change('expiry')} className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="MM / YY" /></label><label className="text-xs font-semibold uppercase tracking-wide text-[#6c675e]">CVV<input value={values.cvv} onChange={change('cvv')} className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm outline-none focus:border-[#c9a227]" placeholder="***" /></label></div><p className="flex items-center gap-2 rounded-md border border-[#e7e0d5] px-3 py-3 text-xs text-[#9a948a]"><LockKeyhole size={13} /> Your payment info is encrypted and secure via Stripe.</p></div>;
}

function InfoPanel({ title, text }) {
  return <div className="rounded-md bg-[#f7f7f6] px-8 py-10 text-center"><p className="font-serif text-lg text-[#28231d]">{title}</p><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6c675e]">{text}</p></div>;
}

function Confirmation({ name, orderId }) {
  return <div className="flex min-h-[390px] flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f2ead8] text-[#a8780c]"><Check size={30} /></span><h2 className="mt-6 text-2xl text-[#28231d]">Payment confirmed</h2><p className="mt-3 max-w-sm text-sm leading-6 text-[#81796d]">Thank you, {name || 'Customer'}. Your House of Salaga order is being prepared with care.</p><p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8780c]">Order #{orderId ? orderId.slice(-8).toUpperCase() : 'PENDING'}</p></div>;
}

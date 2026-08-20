import { useState } from 'react';
import { Check, MapPin, Package, Pencil, ShieldCheck, UserRound } from 'lucide-react';

const tabs = [
  { key: 'profile', label: 'Personal details', icon: UserRound },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'orders', label: 'Order history', icon: Package },
];

export default function UserManagement({ initialTab = 'profile' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [saved, setSaved] = useState(false);

  return (
    <main className="min-h-screen flex-1 bg-[#f6f3ee] px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-[#d8cdbd] pb-6"><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a8780c]">Account centre</p><h1 className="mt-2 text-3xl font-semibold text-[#28231d] sm:text-4xl">User Management</h1><p className="mt-2 text-sm text-[#81796d]">Manage your House of Salaga profile, delivery details, and orders.</p></div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
          <nav className="space-y-1" aria-label="Account sections">{tabs.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => setActiveTab(key)} className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-semibold transition ${activeTab === key ? 'bg-[#28231d] text-white' : 'text-[#6c675e] hover:bg-white'}`}><Icon size={16} />{label}</button>)}</nav>
          <section className="rounded-lg border border-[#d8d5cf] bg-white p-6 shadow-sm sm:p-8">
            {activeTab === 'profile' && <ProfileForm saved={saved} onSave={() => setSaved(true)} />}
            {activeTab === 'addresses' && <Addresses />}
            {activeTab === 'orders' && <Orders />}
          </section>
        </div>
      </div>
    </main>
  );
}

function ProfileForm({ saved, onSave }) {
  return <><div className="flex items-start justify-between border-b border-[#e7e0d5] pb-5"><div><h2 className="font-serif text-xl text-[#28231d]">Personal details</h2><p className="mt-1 text-sm text-[#81796d]">Keep your contact information up to date.</p></div><span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a227] text-lg font-semibold text-[#28231d]">N</span></div><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="First name" value="Nadun" /><Field label="Last name" value="" /><Field label="Email address" value="nadun@email.com" type="email" /><Field label="Phone number" value="+94 77 123 4567" /></div><div className="mt-7 flex items-center justify-between border-t border-[#e7e0d5] pt-6"><span className={`flex items-center gap-2 text-xs ${saved ? 'text-green-700' : 'text-[#9a948a]'}`}>{saved && <Check size={14} />} {saved ? 'Changes saved' : 'Last updated today'}</span><button onClick={onSave} className="flex items-center gap-2 rounded-md bg-[#c9a227] px-5 py-3 text-xs font-bold text-[#28231d] hover:bg-[#b48e1e]"><Pencil size={14} />Save changes</button></div></>;
}

function Field({ label, value, type = 'text' }) { return <label className="text-xs font-semibold uppercase tracking-wide text-[#6c675e]">{label}<input type={type} defaultValue={value} className="mt-2 w-full rounded-md border border-[#dedbd5] px-3 py-3 text-sm font-normal normal-case tracking-normal text-[#28231d] outline-none focus:border-[#c9a227]" /></label>; }
function Addresses() { return <><div className="flex items-start justify-between border-b border-[#e7e0d5] pb-5"><div><h2 className="font-serif text-xl text-[#28231d]">Saved addresses</h2><p className="mt-1 text-sm text-[#81796d]">Choose where your next order should arrive.</p></div><button className="rounded-md border border-[#c9a227] px-4 py-2 text-xs font-semibold text-[#a8780c]">Add address</button></div><div className="mt-7 grid gap-4 sm:grid-cols-2"><AddressCard title="Home" text="Nadun\n24 Flower Road\nColombo 07, Sri Lanka" /><AddressCard title="Studio" text="Nadun\n18 Galle Road\nColombo 03, Sri Lanka" /></div></>; }
function AddressCard({ title, text }) { return <div className="rounded-md border border-[#e7e0d5] p-5"><div className="flex items-center justify-between"><h3 className="font-serif text-lg">{title}</h3><button aria-label={`Edit ${title} address`} className="text-[#a8780c]"><Pencil size={15} /></button></div><p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#6c675e]">{text}</p><span className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-green-700"><ShieldCheck size={13} /> Default address</span></div>; }
function Orders() { return <><h2 className="font-serif text-xl text-[#28231d]">Order history</h2><p className="mt-1 text-sm text-[#81796d]">A record of your House of Salaga purchases.</p><div className="mt-7 divide-y divide-[#e7e0d5] border-y border-[#e7e0d5]"><Order number="#DL-1048" date="20 Aug 2026" status="Processing" total="14,350" /><Order number="#DL-1031" date="04 Aug 2026" status="Delivered" total="7,800" /></div></>; }
function Order({ number, date, status, total }) { return <div className="flex flex-wrap items-center justify-between gap-4 py-5"><div><p className="font-semibold text-[#28231d]">{number}</p><p className="mt-1 text-xs text-[#9a948a]">Placed {date}</p></div><span className="rounded-full bg-[#f2ead8] px-3 py-1 text-xs font-semibold text-[#a8780c]">{status}</span><p className="text-sm font-semibold text-[#28231d]">LKR {total}</p><button className="text-xs font-semibold text-[#a8780c]">View details</button></div>; }

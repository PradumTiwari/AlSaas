import Link from "next/link";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const plans: PriceType[] = [
  {
    name: 'Basic',
    price: 9,
    description: 'Perfect for occasional use',
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    id: 'basic',
    paymentLink: '#',
    priceId: '',
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      '24/7 priority support',
    ],
    id: 'pro',
    paymentLink: '#',
    priceId: '',
  },
];

const PricingCard = ({ name, price, description, items, id, paymentLink }: PriceType) => {
  return (
    <div className="relative w-full max-w-lg border rounded-xl p-6 shadow-md transition transform hover:scale-105 hover:border-blue-600 hover:shadow-xl duration-300 ease-in-out">
      <div className="mb-4">
        <p className="text-2xl font-semibold">{name}</p>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="mb-4">
        <p className="text-3xl font-bold">${price}</p>
      </div>
      <div className="mb-4">
        <ul className="list-disc list-inside space-y-2">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <Link href={paymentLink}>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">Pricing</h2>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

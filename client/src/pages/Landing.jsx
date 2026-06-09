import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const faqs = [
  ['Is SahayaK a donation app?', 'No. It is for free time and skill donation through volunteer assistance.'],
  ['Who can ask for help?', 'Elderly citizens, disabled individuals, low digital literacy users, NGOs, and community members.'],
  ['What kind of help is supported?', 'Government documents, portals, forms, cards, certificates, and public-service workflows.']
];

export default function Landing() {
  return (
    <div className="bg-background">
      <Navbar />
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-semibold text-amber-200">Hyperlocal Volunteer Assistance Platform</p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">SahayaK</h1>
            <p className="mt-4 text-lg text-blue-50">Connect nearby volunteers with people who need help using government services and documentation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="rounded-md bg-white px-5 py-3 font-bold text-primary" to="/register">Get Help</Link>
              <Link className="rounded-md bg-accent px-5 py-3 font-bold text-slate-900" to="/register">Become Volunteer</Link>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {['Aadhaar Update', 'PAN Card', 'Ration Card', 'Disability Pension', 'Scholarship', 'Senior Citizen Card'].map((item) => (
                <div className="rounded-md bg-white/95 p-4 font-semibold text-slate-900" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-7xl space-y-14 px-4 py-14">
        <section className="grid gap-4 md:grid-cols-3">
          {['Nearby Matching', 'Free Assistance', 'Trusted Help Score'].map((title) => (
            <article className="card" key={title}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-2 text-slate-600">Simple, accessible workflows designed for community service and practical support.</p>
            </article>
          ))}
        </section>
        <section>
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {['Seeker creates a request', 'Volunteer accepts nearby task', 'Proof is uploaded and help score increases'].map((step, index) => (
              <div className="card" key={step}><span className="text-2xl font-bold text-primary">{index + 1}</span><p className="mt-2 font-semibold">{step}</p></div>
            ))}
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-4">
          {['500+ requests', '120 volunteers', '16 categories', '3 languages'].map((stat) => <div className="card text-center text-2xl font-bold text-primary" key={stat}>{stat}</div>)}
        </section>
        <section>
          <h2 className="text-3xl font-bold">Success Stories</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {['A student helped a senior update Aadhaar details.', 'A volunteer guided a widow allowance application.', 'An NGO coordinated certificate support for families.'].map((story) => <p className="card" key={story}>{story}</p>)}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold">FAQ</h2>
          <div className="mt-4 space-y-3">
            {faqs.map(([q, a]) => <details className="card" key={q}><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-2 text-slate-600">{a}</p></details>)}
          </div>
        </section>
        <section className="card">
          <h2 className="text-3xl font-bold">Contact</h2>
          <form className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="input" aria-label="Name" placeholder="Name" />
            <input className="input" aria-label="Email" placeholder="Email" />
            <textarea className="input md:col-span-2" aria-label="Message" placeholder="Message" rows="4" />
            <button className="btn-primary md:w-fit">Send Message</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

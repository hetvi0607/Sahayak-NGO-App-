import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { miscService } from '../services/miscService.js';

const questions = [
  ['q1', 'Do you know elderly people who struggle with online services?'],
  ['q2', 'Have you paid someone to fill government forms?'],
  ['q3', 'Do you face issues using government portals?'],
  ['q4', 'Would volunteer assistance help?'],
  ['q5', 'Would Gujarati language support help?']
];

export default function Survey() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (values) => {
    const payload = Object.fromEntries(Object.entries(values).map(([k, v]) => questions.some(([q]) => q === k) ? [k, v === 'true'] : [k, v]));
    await miscService.survey(payload);
    toast.success('Survey submitted');
    reset();
  };
  return (
    <div className="bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <form className="card space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold">Societal Internship Survey</h1>
          {questions.map(([key, label]) => (
            <fieldset className="rounded-md border p-3" key={key}>
              <legend className="font-medium">{label}</legend>
              <label className="mr-4"><input type="radio" value="true" {...register(key, { required: true })} /> Yes</label>
              <label><input type="radio" value="false" {...register(key, { required: true })} /> No</label>
            </fieldset>
          ))}
          <input className="input" placeholder="City" {...register('city')} />
          <textarea className="input" placeholder="Comments" rows="4" {...register('comments')} />
          <button className="btn-primary">Submit Survey</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

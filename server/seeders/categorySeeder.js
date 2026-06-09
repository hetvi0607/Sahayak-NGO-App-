import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';

dotenv.config();

const categories = [
  'Aadhaar Update',
  'PAN Card',
  'Senior Citizen Card',
  'Disability Pension',
  'Scholarship',
  'Health Insurance',
  'Property Tax',
  'Birth Certificate',
  'Death Certificate',
  'Ration Card',
  'Widow Allowance',
  'Domicile Certificate',
  'Caste Certificate',
  'Electricity Connection',
  'Water Connection',
  'Jan Dhan Account'
];

await connectDB();
await Category.deleteMany({});
await Category.insertMany(categories.map((name) => ({ name, description: `Volunteer help for ${name}` })));
console.log('SahayaK categories seeded');
process.exit(0);

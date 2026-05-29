import dns from 'dns';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Submission } from '../models/Submission.js';

dotenv.config();
dns.setServers(['8.8.8.8', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const FIRST_NAMES = [
  'Aarav', 'Priya', 'Rohan', 'Meera', 'Karthik', 'Ananya', 'Vikram', 'Sneha',
  'Arjun', 'Divya', 'Rahul', 'Kavya', 'Aditya', 'Isha', 'Nikhil', 'Pooja',
  'Sanjay', 'Neha', 'Manish', 'Ritu', 'Deepak', 'Shreya', 'Varun', 'Tanvi',
  'Harsh', 'Nidhi', 'Gaurav', 'Simran', 'Akash', 'Lakshmi',
];

const LAST_NAMES = [
  'Sharma', 'Patel', 'Reddy', 'Iyer', 'Gupta', 'Singh', 'Nair', 'Menon',
  'Kapoor', 'Desai', 'Joshi', 'Malhotra', 'Chopra', 'Verma', 'Rao', 'Pillai',
  'Kulkarni', 'Banerjee', 'Das', 'Mehta',
];

const COMPANIES = [
  'TechNova Solutions', 'GreenLeaf Retail', 'Skyline Logistics', 'FinEdge Capital',
  'HealthFirst Clinics', 'UrbanBuild Developers', 'CloudPeak IT', 'AquaPure Foods',
  'BrightMind EdTech', 'SwiftMove Couriers', 'Zenith Motors', 'Nova Pharma',
  'PixelCraft Studio', 'Summit Hotels', 'AgriGrow Farms', 'BlueWave Media',
  'IronForge Manufacturing', 'SolarGrid Energy', 'LegalEase Partners', 'FitLife Gym',
  '', 'Freelancer', 'Startup (Stealth)', 'Xenura Demo Co',
];

const BUDGETS = ['below-5', '5-15', '15-50', '50-plus', ''];
const STATUSES = ['new', 'read', 'replied'];
const SOURCES = ['popup', 'contact'];

const MESSAGES = [
  'Interested in a new company website with CMS integration.',
  'Need a mobile app for inventory tracking and sales reporting.',
  'Looking for digital marketing and SEO for our product launch.',
  'We want to migrate our legacy system to a modern cloud stack.',
  'Requesting a quote for e-commerce platform development.',
  'Need UI/UX redesign for our customer portal.',
  'Exploring AI chatbot integration for customer support.',
  'Want a landing page and lead capture funnel for our campaign.',
  'Require ongoing maintenance and feature updates for our web app.',
  'Planning a full brand refresh including website and social assets.',
  'Need integration between CRM and our existing ERP system.',
  'Interested in performance audit and speed optimization.',
  'Looking for a partner for MVP development in 8–10 weeks.',
  'We need multilingual website support for three regions.',
  'Requesting proposal for data analytics dashboard.',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithinDays(days) {
  const now = Date.now();
  const offset = Math.floor(Math.random() * days * 24 * 60 * 60 * 1000);
  return new Date(now - offset);
}

function buildLead(i) {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const name = `${first} ${last}`;
  const slug = name.toLowerCase().replace(/\s+/g, '.');
  const company = pick(COMPANIES);

  return {
    name,
    email: `${slug}${i}@demo-leads.test`,
    phone: `9${String(100000000 + i).slice(0, 9)}`,
    company,
    budget: pick(BUDGETS),
    message: pick(MESSAGES),
    source: pick(SOURCES),
    status: pick(STATUSES),
    submittedAt: randomDateWithinDays(45),
  };
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const deleted = await Submission.deleteMany({});
  console.log(`Cleared ${deleted.deletedCount} existing lead(s).`);

  const leads = Array.from({ length: 50 }, (_, i) => buildLead(i + 1));
  const inserted = await Submission.insertMany(leads);
  console.log(`Inserted ${inserted.length} demo leads.`);

  const byStatus = await Submission.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  console.log('Status breakdown:', Object.fromEntries(byStatus.map((s) => [s._id, s.count])));

  await mongoose.disconnect();
  console.log('Done. Refresh the admin dashboard.');
}

main().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});

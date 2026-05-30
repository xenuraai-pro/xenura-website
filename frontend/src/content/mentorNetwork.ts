export type MentorLocation = {
  country: string;
  city: string;
  lat: number;
  lng: number;
  region: string;
};

export const MENTOR_NETWORK_HEADLINE = 'Global Mentor Network';
export const MENTOR_NETWORK_LEAD =
  'Our mentors and advisors span 20 countries worldwide, delivering hands-on guidance across AI, data, cloud, product engineering, and business transformation.';
export const MENTOR_NETWORK_INTRO =
  'Locations include India (New Delhi), United States (Washington, D.C.), United Kingdom (London), Singapore, Malaysia (Kuala Lumpur), Sri Lanka (Sri Jayawardenepura Kotte), South Africa (Pretoria), Canada (Ottawa), Australia (Canberra), Russia (Moscow), France (Paris), Germany (Berlin), Netherlands (Amsterdam), United Arab Emirates (Abu Dhabi), Japan (Tokyo), China (Beijing), South Korea (Seoul), New Zealand (Wellington), Sweden (Stockholm), and Switzerland (Bern).';

export const MENTOR_REGION_ORDER = [
  'Asia Pacific',
  'Europe',
  'North America',
  'Middle East',
  'Africa',
] as const;

export const MENTOR_EXPERTISE = [
  'AI & Machine Learning',
  'Data Analytics',
  'Cloud Computing',
  'Digital Experience',
  'Product Engineering',
  'Business Transformation',
] as const;

export const MENTOR_LOCATIONS: MentorLocation[] = [
  { country: 'India', city: 'New Delhi', lat: 28.6139, lng: 77.209, region: 'Asia Pacific' },
  { country: 'United States', city: 'Washington, D.C.', lat: 38.9072, lng: -77.0369, region: 'North America' },
  { country: 'United Kingdom', city: 'London', lat: 51.5074, lng: -0.1278, region: 'Europe' },
  { country: 'Singapore', city: 'Singapore', lat: 1.3521, lng: 103.8198, region: 'Asia Pacific' },
  { country: 'Malaysia', city: 'Kuala Lumpur', lat: 3.139, lng: 101.6869, region: 'Asia Pacific' },
  { country: 'Sri Lanka', city: 'Sri Jayawardenepura Kotte', lat: 6.8947, lng: 79.9025, region: 'Asia Pacific' },
  { country: 'South Africa', city: 'Pretoria', lat: -25.7479, lng: 28.2293, region: 'Africa' },
  { country: 'Canada', city: 'Ottawa', lat: 45.4215, lng: -75.6972, region: 'North America' },
  { country: 'Australia', city: 'Canberra', lat: -35.2809, lng: 149.13, region: 'Asia Pacific' },
  { country: 'Russia', city: 'Moscow', lat: 55.7558, lng: 37.6173, region: 'Europe' },
  { country: 'France', city: 'Paris', lat: 48.8566, lng: 2.3522, region: 'Europe' },
  { country: 'Germany', city: 'Berlin', lat: 52.52, lng: 13.405, region: 'Europe' },
  { country: 'Netherlands', city: 'Amsterdam', lat: 52.3676, lng: 4.9041, region: 'Europe' },
  { country: 'United Arab Emirates', city: 'Abu Dhabi', lat: 24.4539, lng: 54.3773, region: 'Middle East' },
  { country: 'Japan', city: 'Tokyo', lat: 35.6762, lng: 139.6503, region: 'Asia Pacific' },
  { country: 'China', city: 'Beijing', lat: 39.9042, lng: 116.4074, region: 'Asia Pacific' },
  { country: 'South Korea', city: 'Seoul', lat: 37.5665, lng: 126.978, region: 'Asia Pacific' },
  { country: 'New Zealand', city: 'Wellington', lat: -41.2865, lng: 174.7762, region: 'Asia Pacific' },
  { country: 'Sweden', city: 'Stockholm', lat: 59.3293, lng: 18.0686, region: 'Europe' },
  { country: 'Switzerland', city: 'Bern', lat: 46.948, lng: 7.4474, region: 'Europe' },
];

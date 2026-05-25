import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pzzzeovvbrqgeehzmxvf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6enplb3Z2YnJxZ2VlaHpteHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTQ4NzEsImV4cCI6MjA5NDY3MDg3MX0.C0SR_2EtgkoTD3vdpJ38YN_1lr1C3HsOQchZXQo-jgU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const TESTIMONIALS = [
  {
    name: 'Ramesh Patel',
    review: 'R.K. Electricals renovated our old commercial showroom. Exceptional safety standards, modular boards are beautifully aligned, and all wiring passes building security checks.',
    rating: 5,
    location: 'Ghatkopar, Mumbai',
    is_active: true
  },
  {
    name: 'Dr. Aditi Sharma',
    review: 'Kirit Bhai and his crew installed all the high-end dental clinic machinery and LED panels. Clean work, zero fluctuation issues. Very prompt service!',
    rating: 5,
    location: 'Bandra West, Mumbai',
    is_active: true
  },
  {
    name: 'Manish Malhotra',
    review: 'Complete smart home automation and lighting installation done for our residential villa. The finishing is premium. The crew is extremely professional.',
    rating: 5,
    location: 'Juhu, Mumbai',
    is_active: true
  },
  {
    name: 'Sunita Rao',
    review: 'We have been using their AMC service for our residential society lift panels and pump room wiring. Since 3 years, not a single major breakdown. Reliable team.',
    rating: 5,
    location: 'Borivali West, Mumbai',
    is_active: true
  },
  {
    name: 'Rajesh Shah',
    review: 'Concealed wiring, main distribution board upgrade, and premium switches setup. Excellent planning, transparent rates, and they cleaned up the site after work.',
    rating: 5,
    location: 'Kandivali East, Mumbai',
    is_active: true
  },
  {
    name: 'Vikram Malhotra',
    review: 'Best electrical contractors in Mumbai. Handled our full warehouse lighting setup on time. Passed all security audits with flying colors.',
    rating: 5,
    location: 'Andheri East, Mumbai',
    is_active: true
  }
]

async function run() {
  console.log('Inserting testimonials...')
  const { data, error } = await supabase.from('testimonials').insert(TESTIMONIALS).select()
  if (error) {
    console.error('Error inserting:', error)
  } else {
    console.log('Successfully inserted testimonials:', data)
  }
}

run()

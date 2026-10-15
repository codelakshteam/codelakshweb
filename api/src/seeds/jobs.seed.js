// Initial documents for the `jobs` collection. Inserted by slug on server start (never overwrites edits made in the
// database); change live roles in the database or via POST /api/jobs with the admin token. Mirrors lib/careers.js.
module.exports = [
  {
    slug: 'sales-intern',
    title: 'Sales Intern',
    department: 'Sales & Growth',
    type: 'Unpaid internship',
    employmentType: 'INTERN',
    location: 'Pan India (work from your own city)',
    duration: '3 months',
    openings: '10',
    status: 'open',
    summary:
      'An unpaid, remote-friendly internship open across India. Learn how to sell software: introduce CodeLaksh ERP to shops, distributors, restaurants and hotels in your own city, run demos and build real sales experience.',
    responsibilities: [
      'Meet or call shop owners, distributors, restaurants and hotels and understand how they bill and keep stock today.',
      'Run short live demos of CodeLaksh ERP (billing, inventory, purchases, accounts) with our team behind you.',
      'Follow up on every lead and keep a simple daily record of calls, demos and outcomes.',
      'Help new customers get started with set-up and answer first questions.',
      'Share what customers ask for so our team can improve the product.',
    ],
    requirements: [
      'Good communication in Marathi, Hindi or English, spoken and written.',
      'Comfortable talking to business owners in person and on the phone.',
      'Own smartphone with internet; a laptop is a plus. This is an unpaid internship, so it suits students and people building experience.',
      'Honest, punctual and happy to learn. Students and fresh graduates are welcome.',
      'Interest in sales, business or technology. Prior experience is not required.',
    ],
    benefits: [
      'Hands-on training on CodeLaksh ERP and how to sell it.',
      'Real selling experience you can show on your CV, from first call to closed deal.',
      'Mentoring from the founders and an internship certificate on completion.',
      'Flexible hours and work from your own city anywhere in India.',
    ],
  },
];

// Open roles. The same content is seeded into the `jobs` collection of the codelaksh database by api/jobs.seed.js.
// Keep the two in sync when a role changes (the website renders from this file so the pages stay static and indexable).

export const careers = [
  {
    slug: 'sales-intern',
    title: 'Sales Intern',
    department: 'Sales & Growth',
    type: 'Unpaid internship',
    employmentType: 'INTERN',
    location: 'Pan India (work from your own city)',
    duration: '3 months',
    openings: '10',
    summary:
      'An unpaid, remote-friendly internship open across India. Learn how to sell software: introduce CodeLaksh ERP to shops, distributors, restaurants and hotels in your own city, run demos and build real sales experience.',
    about:
      'CodeLaksh is a software company based in Chhatrapati Sambhajinagar (Aurangabad), working since 2022. We build custom software and mobile apps, and our own products: CodeLaksh ERP for GST billing, inventory and accounts, and Kidodom, a baby and kids brand app.',
    role:
      'You will be the first point of contact for small and mid-size businesses who are curious about moving to ERP software. You do not need to know software. We train you on the product, and you bring the conversations.',
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
    process: ['Apply with the form on this page', 'Short call with our team', 'Demo pitch exercise (we teach you first)', 'Start with training'],
  },
];

export const getCareer = (slug) => careers.find((c) => c.slug === slug);

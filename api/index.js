// CodeLaksh API entry point. Structure (MVC):
//   src/config       environment + database connection
//   src/models       Mongoose schemas (Sale, Job)
//   src/controllers  request handling
//   src/routes       URL -> controller mapping
//   src/middleware   auth, rate limit, errors
//   src/services     MSG91 mailer, local fallback store
//   src/utils        small helpers
//   src/seeds        initial documents
const env = require('./src/config/env');
const db = require('./src/config/db');
const app = require('./src/app');
const Job = require('./src/models/Job');

db.connect(() => Job.seedDefaults().catch((err) => console.error('[jobs] seed failed:', err.message)));

app.listen(env.port, () => {
  console.log(`CodeLaksh API listening on port ${env.port}`);
});

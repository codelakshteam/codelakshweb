const industries = [
  'Retail, supermarkets and kirana stores',
  'Distributors and wholesalers',
  'Restaurants, cafes and hotels',
  'Medical stores',
  'Bakeries, sweet marts and cake shops',
  'Salons and service businesses',
  'Growing companies replacing spreadsheets',
];

const technologies = [
  ['Web', 'React, Next.js, Node.js, Python, TypeScript'],
  ['Mobile', 'Android, iOS and cross-platform apps'],
  ['AI and ML', 'AI chatbots, language models, predictive analytics, custom models'],
  ['Cloud', 'AWS, Azure and Google Cloud'],
];

const reasons = [
  ['We build and run our own products', 'CodeLaksh ERP and Kidodom are live, so we know the full life of software, not just the launch.'],
  ['Clear scope and estimates', 'You get a milestone plan and a written estimate before development starts, and see working software in stages.'],
  ['One team, many skills', 'Web, mobile, AI, cloud and marketing under one roof means fewer hand-offs and fewer gaps.'],
  ['Local team, India-wide reach', 'Based in Aurangabad, working with businesses across India, with support after launch.'],
];

export default function Capabilities() {
  return (
    <section className="erp-section erp-alt capabilities" id="why-codelaksh">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Why CodeLaksh</span>
          <h2 className="section-title">
            Built for <span className="highlight">Indian businesses</span>
          </h2>
        </div>
        <div className="pg-benefits">
          {reasons.map(([title, text]) => (
            <div className="pg-benefit" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="pg-two cap-two">
          <div>
            <h3 className="pg-h2">Industries we serve</h3>
            <ul className="pg-list">
              {industries.map((item) => (
                <li key={item}>
                  <i className="fas fa-check" aria-hidden="true"></i> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="pg-h2">Technology we work with</h3>
            <dl className="pg-tech">
              {technologies.map(([group, items]) => (
                <div key={group}>
                  <dt>{group}</dt>
                  <dd>{items}</dd>
                </div>
              ))}
            </dl>
            <p className="pg-prose-p">
              Based in <a href="/locations/aurangabad">Aurangabad (Chhatrapati Sambhajinagar)</a>, Maharashtra, serving
              businesses across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

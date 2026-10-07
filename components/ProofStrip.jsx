const items = [
  { icon: 'fab fa-google-play', text: 'CodeLaksh ERP live on Google Play' },
  { icon: 'fas fa-gift', text: '7-day free trial on ERP' },
  { icon: 'fas fa-file-invoice', text: 'GST-ready billing' },
  { icon: 'fas fa-location-dot', text: 'Made in India' },
];

export default function ProofStrip() {
  return (
    <section className="proof" aria-label="Highlights">
      <div className="container">
        {items.map((item) => (
          <div className="proof-item" key={item.text}>
            <i className={item.icon} aria-hidden="true"></i> {item.text}
          </div>
        ))}
      </div>
    </section>
  );
}

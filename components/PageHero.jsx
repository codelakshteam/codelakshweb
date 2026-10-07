import Breadcrumbs from '@/components/Breadcrumbs';

// Shared top block for inner pages: breadcrumb trail, the page's single H1 and a short lead paragraph.
export default function PageHero({ crumbs, label, children, h1, lead }) {
  return (
    <section className="pg-hero">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        {label && <span className="section-subtitle">{label}</span>}
        <h1 className="pg-title">{h1}</h1>
        {lead && <p className="pg-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

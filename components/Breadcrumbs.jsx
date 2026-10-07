// Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is added by each page through breadcrumbSchema().
export default function Breadcrumbs({ items }) {
  return (
    <nav className="pg-crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            {index < items.length - 1 ? <a href={item.href}>{item.name}</a> : <span aria-current="page">{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

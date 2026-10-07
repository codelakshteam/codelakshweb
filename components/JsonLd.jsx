// Server-rendered JSON-LD block. Pass one schema node or an array; they are wrapped in a single @graph.
export default function JsonLd({ nodes }) {
  const graph = Array.isArray(nodes) ? nodes : [nodes];
  const data = { '@context': 'https://schema.org', '@graph': graph };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

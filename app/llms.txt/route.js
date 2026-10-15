import { SITE, absoluteUrl } from '@/lib/seo';
import { services } from '@/lib/services';
import { projects } from '@/lib/projects';

export const dynamic = 'force-static';

// llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI assistants. Built from the same data files
// as the pages and the sitemap, so it cannot drift from them.
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.name} is a software development company in ${SITE.city} (${SITE.cityAlt}), ${SITE.region}, India, with a second branch in Hadapsar, Pune. It builds custom software, web and mobile apps, AI and machine learning, ERP, e-commerce, cloud and digital marketing solutions, and ships its own products: CodeLaksh ERP and Kidodom.`,
    '',
    `Founded ${SITE.foundingYear} by ${SITE.founders.map((f) => f.name).join(' and ')}. Contact: ${SITE.email}, ${SITE.phone}. Hours: Monday to Saturday, ${SITE.hours.opens} to ${SITE.hours.closes} IST.`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.description}`),
    '',
    '## Products and case studies',
    ...projects.map((p) => `- [${p.name}](${absoluteUrl(`/portfolio/${p.slug}`)}): ${p.summary}`),
    `- [CodeLaksh ERP product page](${absoluteUrl('/erp')}): GST billing, inventory, accounting and payments software with published plans.`,
    '',
    '## Company',
    `- [About](${absoluteUrl('/about')}): who CodeLaksh is and how it works.`,
    `- [Technology](${absoluteUrl('/technology')}): languages, frameworks, cloud and AI providers used.`,
    `- [Portfolio](${absoluteUrl('/portfolio')}): products and case studies.`,
    `- [Chhatrapati Sambhajinagar location](${absoluteUrl('/locations/chhatrapati-sambhajinagar')}): office in ${SITE.city}.`,
    `- [Contact](${absoluteUrl('/contact')}): how to reach the team.`,
    '',
    '## Optional',
    `- [Sitemap](${absoluteUrl('/sitemap.xml')})`,
    `- [Privacy](${absoluteUrl('/privacy')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

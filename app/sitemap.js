import { CONTENT_UPDATED, absoluteUrl } from '@/lib/seo';
import { services } from '@/lib/services';
import { projects } from '@/lib/projects';

export const dynamic = 'force-static';

// Only canonical, indexable pages. Add a new page here (or to lib/services.js / lib/projects.js) and it is listed.
export default function sitemap() {
  const lastModified = new Date(CONTENT_UPDATED);
  const entry = (path, changeFrequency, priority) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });

  return [
    entry('/', 'weekly', 1),
    entry('/services', 'monthly', 0.9),
    ...services.map((service) => entry(`/services/${service.slug}`, 'monthly', 0.8)),
    entry('/erp', 'monthly', 0.9),
    entry('/about', 'monthly', 0.7),
    entry('/technology', 'monthly', 0.6),
    entry('/portfolio', 'monthly', 0.7),
    ...projects.map((project) => entry(`/portfolio/${project.slug}`, 'monthly', 0.6)),
    entry('/locations/aurangabad', 'monthly', 0.6),
    entry('/contact', 'monthly', 0.7),
    entry('/privacy', 'yearly', 0.3),
  ];
}

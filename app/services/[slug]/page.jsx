import { notFound } from 'next/navigation';
import ServicePage from '@/components/ServicePage';
import { pageMetadata } from '@/lib/seo';
import { services, getService } from '@/lib/services';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }) {
  const service = getService(params.slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.description, path: `/services/${service.slug}` });
}

export default function Page({ params }) {
  const service = getService(params.slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}

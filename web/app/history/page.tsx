import { client } from '../../sanity/client';
import { PortableText } from '@portabletext/react';
import { MarketingLayout } from '../../components/layout/marketing-layout';
import { Container } from '@chakra-ui/react';

async function getSiteSettings() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    historicalProjectSummary
  }`);
  return settings;
}

export default async function ProjectHistoryPage() {
  const settings = await getSiteSettings();

  return (
    <MarketingLayout>
      <Container maxW="container.xl" py="20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Project History
          </h1>
        </div>
        <div className="max-w-3xl mx-auto">
          {Array.isArray(settings?.historicalProjectSummary) && settings.historicalProjectSummary.length > 0 ? (
            <div className="prose prose-lg max-w-none text-gray-400 leading-relaxed">
              <PortableText value={settings.historicalProjectSummary} />
            </div>
          ) : (
            <p className="text-lg text-gray-400">No project history available.</p>
          )}
        </div>
      </Container>
    </MarketingLayout>
  );
}
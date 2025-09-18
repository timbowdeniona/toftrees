import { MetadataRoute } from 'next'
import { client } from '../sanity/client'

type Grave = {
  _id: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const graves: Grave[] = await client.fetch(`*[_type == "grave"]{_id}`);

  const graveRoutes = graves.map((grave) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/graves/${grave._id}`,
    lastModified: new Date(),
  }));

  const staticRoutes = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/graves`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/history`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/map`,
      lastModified: new Date(),
    },
  ];

  return [...staticRoutes, ...graveRoutes];
}
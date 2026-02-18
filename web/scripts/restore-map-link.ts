
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or NEXT_PUBLIC_SANITY_API_TOKEN')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
})

async function restoreMapLink() {
    try {
        console.log('Fetching siteSettings...')
        const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`)

        if (!siteSettings) {
            console.error('No siteSettings document found.')
            return
        }

        console.log('Current navigationLinks:', siteSettings.navigationBar?.navigationLinks)

        const mapLink = {
            _key: 'map-link-' + Date.now(),
            linkText: 'Map',
            linkUrl: '/map',
        }

        const currentLinks = siteSettings.navigationBar?.navigationLinks || []
        const existingMapLink = currentLinks.find((link: any) => link.linkUrl === '/map')

        if (existingMapLink) {
            console.log('Map link already exists.')
        } else {
            console.log('Adding Map link...')
            await client
                .patch(siteSettings._id)
                .setIfMissing({ 'navigationBar.navigationLinks': [] })
                .insert('after', 'navigationBar.navigationLinks[-1]', [mapLink])
                .commit()
            console.log('Map link added successfully.')
        }

    } catch (error) {
        console.error('Error restoring map link:', error)
    }
}

restoreMapLink()

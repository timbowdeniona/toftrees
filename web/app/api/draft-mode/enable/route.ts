import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Parse query string parameters
  const secret = request.nextUrl.searchParams.get('sanity-preview-secret')
  const redirectParams = request.nextUrl.searchParams.get('redirect') || '/'

  // Check the secret and next parameters
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    console.error('Invalid Sanity preview secret. Received:', secret)
    return new Response('Invalid secret', { status: 401 })
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  redirect(redirectParams)
}

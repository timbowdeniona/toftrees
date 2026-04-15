import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { client } from '../../../../sanity/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'

export async function GET(request: Request) {
  const token = process.env.SANITY_API_READ_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN;
  console.log("Draft Mode Enable Route Hit!");
  console.log("Token available?", !!token);
  
  const clientWithToken = client.withConfig({ token });
  
  try {
    const { isValid, redirectTo = '/' } = await validatePreviewUrl(clientWithToken, request.url)
    console.log("Secret validation isValid:", isValid, " redirectTo:", redirectTo);
    
    // Unconditionally enable for debugging if there is a secret
    const url = new URL(request.url);
    if (url.searchParams.has('sanity-preview-secret')) {
      const draft = await draftMode()
      draft.enable()
      console.log("Draft mode enabled manually as fallback/test.");
      return redirect(redirectTo)
    }
    
    if (!isValid) {
      return new Response('Invalid secret - custom fallback', { status: 401 })
    }
    
    const draft = await draftMode()
    draft.enable()
    return redirect(redirectTo)
  } catch (error) {
    console.error("Error during validatePreviewUrl:", error);
    return new Response('Server Error', { status: 500 })
  }
}

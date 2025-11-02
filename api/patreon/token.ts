import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function: Exchange Patreon OAuth code for access token
 * 
 * This endpoint is called by the frontend after the user returns from Patreon.
 * It securely exchanges the authorization code for an access token using the client secret.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers - adjust origin for production
  res.setHeader('Access-Control-Allow-Origin', 'https://gomodoro.drewgo.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, redirect_uri } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // Get credentials from environment variables (set in Vercel dashboard)
    const clientId = process.env.PATREON_CLIENT_ID;
    const clientSecret = process.env.PATREON_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Missing Patreon credentials in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://www.patreon.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirect_uri || 'https://gomodoro.drewgo.com/patreon/callback',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Patreon token exchange failed:', errorText);
      return res.status(tokenResponse.status).json({ 
        error: 'Failed to exchange token',
        details: errorText 
      });
    }

    const tokenData = await tokenResponse.json();

    // Get user identity from Patreon
    const identityResponse = await fetch('https://www.patreon.com/api/oauth2/v2/identity?fields%5Buser%5D=email,first_name,full_name', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (!identityResponse.ok) {
      console.error('Failed to fetch user identity');
      return res.status(500).json({ error: 'Failed to fetch user data' });
    }

    const userData = await identityResponse.json();

    // Return tokens and user data to frontend
    // NOTE: In production, you should store tokens server-side and return a session token
    return res.status(200).json({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
      user: userData.data,
    });

  } catch (error) {
    console.error('Error in token exchange:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// /api/rebuild.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Replace APP_ID with your DigitalOcean App ID
    const appId = process.env.wriality;
    const apiToken = process.env.DIGITALOCEAN_API_TOKEN;

    const response = await axios.post(
      `https://api.digitalocean.com/v2/apps/${appId}/deployments`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiToken}`,
        },
      }
    );

    if (response.status === 201) {
      res.status(200).json({ message: 'Rebuild triggered successfully' });
    } else {
      res.status(500).json({ error: 'Failed to trigger rebuild' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to trigger rebuild' });
  }
}

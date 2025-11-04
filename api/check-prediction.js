// Replicate prediction status checker
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Missing prediction id' });
    }

    if (!process.env.REPLICATE_API_KEY) {
      return res.status(500).json({ error: 'Replicate API key not configured' });
    }

    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${id}`,
      {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Replicate API error:', errorText);
      return res.status(response.status).json({ 
        error: 'Replicate API error',
        details: errorText 
      });
    }

    const prediction = await response.json();
    return res.status(200).json(prediction);

  } catch (error) {
    console.error('Check prediction error:', error);
    return res.status(500).json({ 
      error: 'Failed to check prediction status',
      details: error.message 
    });
  }
}

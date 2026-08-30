export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // req.body should already be parsed by Vercel if it's sent as application/json
        const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        
        // Append the secret access key from environment variables
        payload.access_key = process.env.WEB3FORMS_ACCESS_KEY;

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.status === 200) {
            return res.status(200).json(result);
        } else {
            return res.status(response.status).json(result);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

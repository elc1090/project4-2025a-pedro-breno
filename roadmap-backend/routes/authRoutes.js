const express = require('express');
const router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

router.get('/sign-in/social', (req, res) => {
  const { provider, callbackURL } = req.query;

  if (provider !== 'google') {
    return res.status(400).send('Provider não suportado');
  }

  const redirectUri = `${req.protocol}://${req.get('host')}${callbackURL}`;

  const params = querystring.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  res.redirect(googleAuthUrl);
});

router.get('/callback/google', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Código de autorização não recebido');
  }

  try {
    const redirectUri = `${req.protocol}://${req.get('host')}/auth/callback/google`;
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      querystring.stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { id_token, access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const user = userInfoResponse.data;

    console.log('Usuário autenticado via Google:', user);

    res.redirect('/roadmaps');
  } catch (error) {
    console.error('Erro no callback do Google:', error.response?.data || error.message);
    res.status(500).send('Erro ao autenticar com o Google');
  }
});

module.exports = router;

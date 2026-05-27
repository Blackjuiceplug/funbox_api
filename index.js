const express = require('express');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  keyGenerator: (req, res) => req.headers['cf-connecting-ip'] || req.ip,
  message: { 
    status: "error", 
    message: "Rate limit exceeded. Please try again later." 
  }
});

app.use(limiter);

// Normalized Data Loader
const dataCache = {};
const dataFiles = {
  reasons: 'reasons.json',
  roasts: 'roasts.json',
  compliments: 'compliments.json',
  dadJokes: 'dadjokes.json',
  pickupLines: 'pickuplines.json',
  advice: 'advice.json',
  insults: 'insults.json',
  quotes: 'quotes.json',
  wyrQuestions: 'wyr.json',
  truths: 'truths.json',
  dares: 'dares.json',
  memeTemplates: 'memetemplates.json',
  neverHaveIEver: 'neverhaveiever.json'
};

function loadData() {
  Object.keys(dataFiles).forEach(key => {
    try {
      const filePath = path.join(__dirname, 'data', dataFiles[key]);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      dataCache[key] = content;
    } catch (err) {
      console.error(`Error loading ${dataFiles[key]}:`, err);
      dataCache[key] = [];
    }
  });
}

loadData();

function getRandomItem(key) {
  const array = dataCache[key];
  if (!array || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

function normalize(item) {
  if (!item) return "No data available";
  if (typeof item === 'string') return item;
  return item.text || item.content || item.value || JSON.stringify(item);
}

function personalize(text, name) {
  return text.replace(/{name}/g, name);
}

function sendResponse(res, data) {
  res.json({
    status: "success",
    timestamp: new Date().toISOString(),
    data: data
  });
}

const v1 = express.Router();

v1.get('/no', (req, res) => {
  sendResponse(res, { reason: normalize(getRandomItem('reasons')) });
});

v1.get('/roast', (req, res) => {
  sendResponse(res, { roast: normalize(getRandomItem('roasts')) });
});

v1.get('/roast/:name', (req, res) => {
  const roast = personalize(normalize(getRandomItem('roasts')), req.params.name);
  sendResponse(res, { roast, target: req.params.name });
});

v1.get('/compliment', (req, res) => {
  sendResponse(res, { compliment: normalize(getRandomItem('compliments')) });
});

v1.get('/compliment/:name', (req, res) => {
  const compliment = personalize(normalize(getRandomItem('compliments')), req.params.name);
  sendResponse(res, { compliment, recipient: req.params.name });
});

v1.get('/dadjoke', (req, res) => {
  sendResponse(res, { joke: normalize(getRandomItem('dadJokes')) });
});

v1.get('/pickupline', (req, res) => {
  sendResponse(res, { line: normalize(getRandomItem('pickupLines')) });
});

v1.get('/advice', (req, res) => {
  sendResponse(res, { advice: normalize(getRandomItem('advice')) });
});

v1.get('/insult', (req, res) => {
  const data = dataCache['insults'];
  if (!data || !data.templates) return sendResponse(res, { insult: "Error generating insult" });
  
  const template = getRandomItem('insults').templates[Math.floor(Math.random() * data.templates.length)];
  const insult = template
    .replace('{adjective}', data.adjectives[Math.floor(Math.random() * data.adjectives.length)])
    .replace('{noun}', data.nouns[Math.floor(Math.random() * data.nouns.length)])
    .replace('{verb}', data.verbs[Math.floor(Math.random() * data.verbs.length)]);
  sendResponse(res, { insult });
});

v1.get('/quote', (req, res) => {
  const item = getRandomItem('quotes');
  sendResponse(res, { 
    quote: normalize(item), 
    author: item.author || 'Unknown' 
  });
});

v1.get('/wyr', (req, res) => {
  const wyr = getRandomItem('wyrQuestions');
  sendResponse(res, { 
    optionA: wyr.optionA || wyr.a || 'Option A', 
    optionB: wyr.optionB || wyr.b || 'Option B' 
  });
});

v1.get('/truth', (req, res) => {
  sendResponse(res, { question: normalize(getRandomItem('truths')) });
});

v1.get('/dare', (req, res) => {
  sendResponse(res, { challenge: normalize(getRandomItem('dares')) });
});

v1.get('/memeidea', (req, res) => {
  const template = getRandomItem('memeTemplates');
  const idea = getRandomItem('memeTemplates').ideas[Math.floor(Math.random() * template.ideas.length)];
  sendResponse(res, { 
    template: template.name || 'Unknown', 
    idea: normalize(idea) 
  });
});

v1.get('/neverhaveiever', (req, res) => {
  sendResponse(res, { statement: `Never have I ever ${normalize(getRandomItem('neverHaveIEver'))}` });
});

v1.get('/random', (req, res) => {
  const endpoints = ['no', 'roast', 'compliment', 'dadjoke', 'advice', 'quote'];
  const target = endpoints[Math.floor(Math.random() * endpoints.length)];
  
  // Use internal routing to a simplified version of these
  const results = {
    no: { type: 'rejection', value: normalize(getRandomItem('reasons')) },
    roast: { type: 'roast', value: normalize(getRandomItem('roasts')) },
    compliment: { type: 'compliment', value: normalize(getRandomItem('compliments')) },
    dadjoke: { type: 'dadjoke', value: normalize(getRandomItem('dadJokes')) },
    advice: { type: 'advice', value: normalize(getRandomItem('advice')) },
    quote: { type: 'quote', value: normalize(getRandomItem('quotes')) }
  };
  sendResponse(res, results[target]);
});

v1.get('/', (req, res) => {
  res.json({
    version: "1.1.0",
    name: "Funbox API Service",
    endpoints: [
      { method: 'GET', path: '/api/v1/no', description: 'Rejection reason' },
      { method: 'GET', path: '/api/v1/roast', description: 'Random roast' },
      { method: 'GET', path: '/api/v1/roast/:name', description: 'Targeted roast' },
      { method: 'GET', path: '/api/v1/compliment', description: 'Random compliment' },
      { method: 'GET', path: '/api/v1/compliment/:name', description: 'Targeted compliment' },
      { method: 'GET', path: '/api/v1/dadjoke', description: 'Dad joke' },
      { method: 'GET', path: '/api/v1/pickupline', description: 'Pickup line' },
      { method: 'GET', path: '/api/v1/advice', description: 'Life advice' },
      { method: 'GET', path: '/api/v1/insult', description: 'Creative insult' },
      { method: 'GET', path: '/api/v1/quote', description: 'Inspirational quote' },
      { method: 'GET', path: '/api/v1/wyr', description: 'Would you rather' },
      { method: 'GET', path: '/api/v1/truth', description: 'Truth question' },
      { method: 'GET', path: '/api/v1/dare', description: 'Dare challenge' },
      { method: 'GET', path: '/api/v1/memeidea', description: 'Meme template idea' },
      { method: 'GET', path: '/api/v1/neverhaveiever', description: 'Never have I ever' },
      { method: 'GET', path: '/api/v1/random', description: 'Randomized response' }
    ]
  });
});

app.use('/api/v1', v1);

app.get('/api', (req, res) => {
  res.json({
    message: "Funbox API Service",
    versions: { v1: "/api/v1", current: "v1" },
    web_interface: "/"
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', (req, res) => {
  res.status(404).json({ status: "error", message: "Endpoint not found" });
});

app.use((req, res) => {
  if (req.accepts('html')) {
    res.redirect('/');
  } else {
    res.status(404).json({ status: "error", message: "Not found" });
  }
});

app.listen(PORT, () => {
  console.log(`
  ⚡ Funbox API v1.1.0 Online
  📍 Port: ${PORT}
  🌐 http://localhost:${PORT}
  `);
});

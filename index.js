const express = require('express');
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static('public'));

// Rate limiter: 120 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  keyGenerator: (req, res) => req.headers['cf-connecting-ip'] || req.ip,
  message: { error: "Too many requests, please try again later. (120 reqs/min/IP)" }
});

app.use(limiter);

// Load all data files from data folder
const reasons = JSON.parse(fs.readFileSync('./data/reasons.json', 'utf-8'));
const roasts = JSON.parse(fs.readFileSync('./data/roasts.json', 'utf-8'));
const compliments = JSON.parse(fs.readFileSync('./data/compliments.json', 'utf-8'));
const dadJokes = JSON.parse(fs.readFileSync('./data/dadjokes.json', 'utf-8'));
const pickupLines = JSON.parse(fs.readFileSync('./data/pickuplines.json', 'utf-8'));
const advice = JSON.parse(fs.readFileSync('./data/advice.json', 'utf-8'));
const insults = JSON.parse(fs.readFileSync('./data/insults.json', 'utf-8'));
const quotes = JSON.parse(fs.readFileSync('./data/quotes.json', 'utf-8'));
const wyrQuestions = JSON.parse(fs.readFileSync('./data/wyr.json', 'utf-8'));
const truths = JSON.parse(fs.readFileSync('./data/truths.json', 'utf-8'));
const dares = JSON.parse(fs.readFileSync('./data/dares.json', 'utf-8'));
const memeTemplates = JSON.parse(fs.readFileSync('./data/memetemplates.json', 'utf-8'));
const neverHaveIEver = JSON.parse(fs.readFileSync('./data/neverhaveiever.json', 'utf-8'));

// Helper functions
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function personalize(text, name) {
  return text.replace(/{name}/g, name);
}

// ========== API v1 ENDPOINTS ==========
const v1 = express.Router();

// 1. REJECTION SERVICE
v1.get('/no', (req, res) => {
  res.json({ reason: getRandomItem(reasons) });
});

// 2. ROAST SERVICE
v1.get('/roast', (req, res) => {
  res.json({ roast: getRandomItem(roasts) });
});

v1.get('/roast/:name', (req, res) => {
  const roast = personalize(getRandomItem(roasts), req.params.name);
  res.json({ roast, target: req.params.name });
});

// 3. COMPLIMENT SERVICE
v1.get('/compliment', (req, res) => {
  res.json({ compliment: getRandomItem(compliments) });
});

v1.get('/compliment/:name', (req, res) => {
  const compliment = personalize(getRandomItem(compliments), req.params.name);
  res.json({ compliment, recipient: req.params.name });
});

// 4. DAD JOKES SERVICE
v1.get('/dadjoke', (req, res) => {
  const joke = getRandomItem(dadJokes);
  // Handle both object and string formats
  const jokeText = joke.text || joke;
  res.json({ joke: jokeText });
});

// 5. PICKUP LINES SERVICE
v1.get('/pickupline', (req, res) => {
  const line = getRandomItem(pickupLines);
  const lineText = line.text || line;
  res.json({ line: lineText });
});

// 6. ADVICE SERVICE
v1.get('/advice', (req, res) => {
  const adviceItem = getRandomItem(advice);
  const adviceText = adviceItem.text || adviceItem;
  res.json({ advice: adviceText });
});

// 7. INSULT SERVICE
v1.get('/insult', (req, res) => {
  const template = getRandomItem(insults.templates);
  const insult = template
    .replace('{adjective}', getRandomItem(insults.adjectives))
    .replace('{noun}', getRandomItem(insults.nouns))
    .replace('{verb}', getRandomItem(insults.verbs));
  res.json({ insult });
});

// 8. QUOTE SERVICE
v1.get('/quote', (req, res) => {
  const quote = getRandomItem(quotes);
  const quoteText = quote.text || quote;
  const quoteAuthor = quote.author || 'Unknown';
  res.json({ quote: quoteText, author: quoteAuthor });
});

// 9. WOULD YOU RATHER SERVICE
v1.get('/wyr', (req, res) => {
  const wyr = getRandomItem(wyrQuestions);
  const optionA = wyr.optionA || wyr.a || 'Option A';
  const optionB = wyr.optionB || wyr.b || 'Option B';
  res.json({ optionA, optionB });
});

// 10. TRUTH OR DARE SERVICE
v1.get('/truth', (req, res) => {
  const truth = getRandomItem(truths);
  const question = truth.text || truth;
  res.json({ question });
});

v1.get('/dare', (req, res) => {
  const dare = getRandomItem(dares);
  const challenge = dare.text || dare;
  res.json({ challenge });
});

// 11. MEME IDEA SERVICE
v1.get('/memeidea', (req, res) => {
  const template = getRandomItem(memeTemplates);
  const idea = getRandomItem(template.ideas);
  const templateName = template.name || 'Unknown Template';
  const ideaText = idea.text || idea;
  res.json({ template: templateName, idea: ideaText });
});

// 12. NEVER HAVE I EVER SERVICE
v1.get('/neverhaveiever', (req, res) => {
  const statement = getRandomItem(neverHaveIEver);
  const statementText = statement.text || statement;
  res.json({ statement: `Never have I ever ${statementText}` });
});

// RANDOM SERVICE (COMBO)
v1.get('/random', (req, res) => {
  const services = [
    () => ({ type: 'rejection', reason: getRandomItem(reasons) }),
    () => ({ type: 'roast', roast: getRandomItem(roasts) }),
    () => ({ type: 'compliment', compliment: getRandomItem(compliments) }),
    () => ({ 
      type: 'dadjoke', 
      joke: getRandomItem(dadJokes).text || getRandomItem(dadJokes) 
    }),
    () => ({ 
      type: 'quote', 
      quote: getRandomItem(quotes).text || getRandomItem(quotes),
      author: getRandomItem(quotes).author || 'Unknown'
    }),
    () => ({ 
      type: 'advice', 
      advice: getRandomItem(advice).text || getRandomItem(advice) 
    })
  ];
  const randomService = getRandomItem(services);
  res.json(randomService());
});

// API v1 DOCS ENDPOINT
v1.get('/', (req, res) => {
  res.json({
    version: "1.0.0",
    name: "Fun API Service",
    endpoints: [
      { method: 'GET', path: '/api/v1/no', description: 'Get a random rejection reason' },
      { method: 'GET', path: '/api/v1/roast', description: 'Get roasted' },
      { method: 'GET', path: '/api/v1/roast/:name', description: 'Roast someone specific' },
      { method: 'GET', path: '/api/v1/compliment', description: 'Get a compliment' },
      { method: 'GET', path: '/api/v1/compliment/:name', description: 'Compliment someone specific' },
      { method: 'GET', path: '/api/v1/dadjoke', description: 'Get a dad joke' },
      { method: 'GET', path: '/api/v1/pickupline', description: 'Get a pickup line' },
      { method: 'GET', path: '/api/v1/advice', description: 'Get life advice' },
      { method: 'GET', path: '/api/v1/insult', description: 'Get a creative insult' },
      { method: 'GET', path: '/api/v1/quote', description: 'Get an inspirational quote' },
      { method: 'GET', path: '/api/v1/wyr', description: 'Would you rather question' },
      { method: 'GET', path: '/api/v1/truth', description: 'Truth question' },
      { method: 'GET', path: '/api/v1/dare', description: 'Dare challenge' },
      { method: 'GET', path: '/api/v1/memeidea', description: 'Meme template idea' },
      { method: 'GET', path: '/api/v1/neverhaveiever', description: 'Never have I ever statement' },
      { method: 'GET', path: '/api/v1/random', description: 'Random from all services' }
    ],
    limits: "120 requests per minute per IP",
    docs: "Visit / for web interface"
  });
});

// Mount v1 router
app.use('/api/v1', v1);

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: "Fun API Service",
    versions: {
      v1: "/api/v1",
      current: "v1",
      deprecated: []
    },
    web_interface: "/"
  });
});

// Serve HTML UI at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    message: "Try /api/v1 for available endpoints",
    current_version: "/api/v1"
  });
});

// Catch-all 404
app.use((req, res) => {
  if (req.accepts('html')) {
    res.redirect('/');
  } else {
    res.status(404).json({
      error: "Not found",
      message: "Try /api/v1 for API or / for web interface"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
  🚀 Fun API Service launched!
  📍 Port: ${PORT}
  🌐 Web UI: http://localhost:${PORT}
  🔌 API v1: http://localhost:${PORT}/api/v1
  📚 API Docs: http://localhost:${PORT}/api/v1
  ⚡ Rate limit: 120/min per IP
  `);
});
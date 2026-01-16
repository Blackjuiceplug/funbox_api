# 🎲 FunBox API

<p align="center">
  <img src="./assets/funbox.png" width="200" alt="FunBox API Logo"/>
</p>

<p align="center">
  <strong>Your all-in-one entertainment API</strong><br>
  Random jokes, quotes, roasts, pickup lines, and more — all in one simple, fun API.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D%2022.14.0-brightgreen" alt="Node Version"/>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-welcome-orange" alt="PRs Welcome"/>
</p>

---

## 🎯 What is FunBox?

FunBox API is a lightweight, no-nonsense REST API that delivers random entertaining content for your apps, bots, websites, or just for fun. Whether you need a dad joke, a motivational quote, a savage roast, or a truth-or-dare question, FunBox has you covered.

**Perfect for:**
- Discord/Slack bots
- Fun landing pages
- Mobile apps
- Creative projects
- Breaking the ice
- Learning API integration

---

## 🚀 Quick Start

### Base URL  && TEST

```
https://funbox-api.onrender.com
```

### Available Endpoints

All endpoints return JSON and support CORS. **Rate limit: 120 requests per minute per IP**

| Endpoint | Description | Example Response |
|----------|-------------|------------------|
| `GET /api/v1/no` | Random rejection reason | `{"reason": "Mercury is in retrograde"}` |
| `GET /api/v1/advice` | Random life advice | `{"advice": "Trust your instincts"}` |
| `GET /api/v1/compliment` | Random compliment | `{"compliment": "You're incredibly thoughtful"}` |
| `GET /api/v1/compliment/:name` | Personalized compliment | `{"compliment": "John, you're amazing!", "recipient": "John"}` |
| `GET /api/v1/dadjoke` | Random dad joke | `{"joke": "Why don't eggs tell jokes? They'd crack up!"}` |
| `GET /api/v1/pickupline` | Random pickup line | `{"line": "Are you a magician? Because..."}` |
| `GET /api/v1/roast` | Random roast | `{"roast": "You're about as useful as a screen door on a submarine"}` |
| `GET /api/v1/roast/:name` | Personalized roast | `{"roast": "Hey John...", "target": "John"}` |
| `GET /api/v1/insult` | Creative insult | `{"insult": "You absolute buffoon of a walnut"}` |
| `GET /api/v1/quote` | Inspirational quote | `{"quote": "Be yourself...", "author": "Oscar Wilde"}` |
| `GET /api/v1/wyr` | Would You Rather | `{"optionA": "Have the ability to fly", "optionB": "Be invisible"}` |
| `GET /api/v1/truth` | Truth question | `{"question": "What's your biggest fear?"}` |
| `GET /api/v1/dare` | Dare challenge | `{"challenge": "Do 10 pushups right now"}` |
| `GET /api/v1/memeidea` | Meme template idea | `{"template": "Drake", "idea": "Top: Bad idea, Bottom: Good idea"}` |
| `GET /api/v1/neverhaveiever` | Never Have I Ever | `{"statement": "Never have I ever skipped breakfast"}` |
| `GET /api/v1/random` | Random from all categories | `{"type": "dadjoke", "joke": "..."}` |

### 🔄 Example Request

```bash
curl http://localhost:3000/api/v1/dadjoke
```

### ✅ Example Response

```json
{
  "joke": "What do you call a bear with no teeth? A gummy bear!"
}
```

---

## 🛠️ Installation & Self-Hosting

### Prerequisites

- Node.js v22.14.0 or higher
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/Blackjuiceplug/funbox_api.git
cd funbox_api
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the server**
```bash
npm start
```

The API will be available at `http://localhost:3000`

4. **Custom port** (optional)
```bash
PORT=5000 npm start
```

---

## 📁 Project Structure

```
funbox_api/
├── assets/              # Images and static assets
│   ├── funbox.png
│   └── imgs/
├── data/                # JSON data files for each endpoint
│   ├── advice.json
│   ├── compliments.json
│   ├── dadjokes.json
│   ├── dares.json
│   ├── insults.json
│   ├── memetemplates.json
│   ├── neverhaveiever.json
│   ├── pickuplines.json
│   ├── quotes.json
│   ├── reasons.json
│   ├── roasts.json
│   ├── truths.json
│   └── wyr.json
├── public/              # Static files
│   └── index.html
├── index.js             # Main Express server
├── package.json
├── Dockerfile           # Docker configuration
└── README.md
```

---

## 🐳 Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t funbox-api .

# Run the container
docker run -p 3000:3000 funbox-api
```

Or use Docker Compose (create a `docker-compose.yml`):

```yaml
version: '3.8'
services:
  funbox:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

---

## 🎨 Usage Examples

### JavaScript (Fetch)
```javascript
fetch('http://localhost:3000/api/v1/dadjoke')
  .then(res => res.json())
  .then(data => console.log(data.joke));
```

### Python
```python
import requests

response = requests.get('http://localhost:3000/api/v1/quote')
data = response.json()
print(f"{data['quote']} - {data['author']}")
```

### cURL
```bash
# Get a roast
curl http://localhost:3000/api/v1/roast

# Roast someone specific
curl http://localhost:3000/api/v1/roast/Bob

# Get a random response from any category
curl http://localhost:3000/api/v1/random
```

### Node.js with Axios
```javascript
const axios = require('axios');

async function getJoke() {
  const { data } = await axios.get('http://localhost:3000/api/v1/dadjoke');
  console.log(data.joke);
}
```

### Discord Bot Example
```javascript
const fetch = require('node-fetch');

client.on('messageCreate', async message => {
  if (message.content === '!joke') {
    const res = await fetch('http://localhost:3000/api/v1/dadjoke');
    const { joke } = await res.json();
    message.channel.send(joke);
  }
  
  if (message.content.startsWith('!roast')) {
    const name = message.content.split(' ')[1] || 'you';
    const res = await fetch(`http://localhost:3000/api/v1/roast/${name}`);
    const { roast } = await res.json();
    message.channel.send(roast);
  }
});
```

---

## 🔧 API Features

- ✅ **CORS enabled** - Use from any domain
- ✅ **Rate limiting** - 120 requests per minute per IP
- ✅ **Lightweight** - Fast response times
- ✅ **No authentication required** - Simple and open
- ✅ **JSON responses** - Easy to parse
- ✅ **Extensive content library** - Thousands of entries
- ✅ **Versioned API** - `/api/v1` for future compatibility
- ✅ **Personalization** - Name support on compliments and roasts
- ✅ **Web interface** - Visit `/` for interactive documentation
- ✅ **Cloudflare ready** - Supports `cf-connecting-ip` header
- ✅ **Docker support** - Easy containerized deployment

---

## 📡 API Information Endpoints

### Get API version info
```bash
curl http://localhost:3000/api
```

Response:
```json
{
  "message": "Fun API Service",
  "versions": {
    "v1": "/api/v1",
    "current": "v1",
    "deprecated": []
  },
  "web_interface": "/"
}
```

### Get all available endpoints
```bash
curl http://localhost:3000/api/v1
```

Returns a complete list of endpoints with descriptions and rate limit info.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add more content** - Submit PRs with new jokes, quotes, etc.
2. **Improve documentation** - Help make this README better
3. **Report bugs** - Open issues for any problems
4. **Suggest features** - Share your ideas

### Adding Content

To add new content to any category:

1. Open the corresponding file in `/data/` (e.g., `dadjokes.json`)
2. Add your content following the existing format
3. Submit a pull request

---

## 📊 Data Format Examples

### Dad Jokes (`dadjokes.json`)
```json
[
  "Why did the scarecrow win an award? He was outstanding in his field!",
  {
    "text": "What do you call a fake noodle? An impasta!"
  }
]
```

### Quotes (`quotes.json`)
```json
[
  {
    "text": "The only way to do great work is to love what you do",
    "author": "Steve Jobs"
  },
  {
    "text": "Innovation distinguishes between a leader and a follower",
    "author": "Steve Jobs"
  }
]
```

### Would You Rather (`wyr.json`)
```json
[
  {
    "optionA": "Have the ability to fly",
    "optionB": "Be invisible whenever you want"
  }
]
```

### Insults (`insults.json`)
```json
{
  "templates": [
    "You {adjective} {noun}!",
    "If brains were {noun}, you couldn't {verb}"
  ],
  "adjectives": ["absolute", "complete", "total"],
  "nouns": ["buffoon", "walnut", "potato"],
  "verbs": ["fill a teaspoon", "power a light bulb"]
}
```

### Meme Templates (`memetemplates.json`)
```json
[
  {
    "name": "Drake Hotline Bling",
    "ideas": [
      {
        "text": "Top: Doing homework | Bottom: Procrastinating"
      },
      "Top: Going to bed early | Bottom: Scrolling at 3 AM"
    ]
  }
]
```

### Simple Lists (reasons, roasts, compliments, etc.)
```json
[
  "Your reason/roast/compliment here",
  "Another one here",
  "And another..."
]
```

### Personalization Support

Some endpoints support `{name}` placeholders for personalization:

```json
[
  "{name}, you're absolutely amazing!",
  "Hey {name}, you light up every room you enter!"
]
```

Use the `/:name` parameter in the endpoint:
```bash
curl http://localhost:3000/api/v1/compliment/Sarah
# Returns: {"compliment": "Sarah, you're absolutely amazing!", "recipient": "Sarah"}
```

---

## 🌟 Projects Using FunBox

**Using FunBox in your project?** Open a PR to be featured here!

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 👤 Author

Created with ❤️ and humor by [Blackjuiceplug](https://github.com/Blackjuiceplug)

---

## 🙏 Acknowledgments

- Inspired by various fun APIs around the web
- Built with Express.js
- Community contributions welcome

---

<p align="center">
  Made with Node.js and a sense of humor 😄
</p>

<p align="center">
  <a href="#-quick-start">Get Started</a> •
  <a href="#%EF%B8%8F-installation--self-hosting">Install</a> •
  <a href="#-contributing">Contribute</a>
</p>

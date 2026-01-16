🎲 FunBox API
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

🎯 What is FunBox?
FunBox API is a lightweight, no-nonsense REST API that delivers random entertaining content for your apps, bots, websites, or just for fun. Whether you need a dad joke, a motivational quote, a savage roast, or a truth-or-dare question, FunBox has you covered.
Perfect for:

Discord/Slack bots
Fun landing pages
Mobile apps
Creative projects
Breaking the ice
Learning API integration


🚀 Quick Start
Base URL
http://localhost:3000/api/v1
Available Endpoints
All endpoints return JSON and support CORS. Rate limit: 120 requests per minute per IP
EndpointDescriptionExample ResponseGET /api/v1/noRandom rejection reason{"reason": "Mercury is in retrograde"}GET /api/v1/adviceRandom life advice{"advice": "Trust your instincts"}GET /api/v1/complimentRandom compliment{"compliment": "You're incredibly thoughtful"}GET /api/v1/compliment/:namePersonalized compliment{"compliment": "John, you're amazing!", "recipient": "John"}GET /api/v1/dadjokeRandom dad joke{"joke": "Why don't eggs tell jokes? They'd crack up!"}GET /api/v1/pickuplineRandom pickup line{"line": "Are you a magician? Because..."}GET /api/v1/roastRandom roast{"roast": "You're about as useful as a screen door on a submarine"}GET /api/v1/roast/:namePersonalized roast{"roast": "Hey John...", "target": "John"}GET /api/v1/insultCreative insult{"insult": "You absolute buffoon of a walnut"}GET /api/v1/quoteInspirational quote{"quote": "Be yourself...", "author": "Oscar Wilde"}GET /api/v1/wyrWould You Rather{"optionA": "Have the ability to fly", "optionB": "Be invisible"}GET /api/v1/truthTruth question{"question": "What's your biggest fear?"}GET /api/v1/dareDare challenge{"challenge": "Do 10 pushups right now"}GET /api/v1/memeideaMeme template idea{"template": "Drake", "idea": "Top: Bad idea, Bottom: Good idea"}GET /api/v1/neverhaveieverNever Have I Ever{"statement": "Never have I ever skipped breakfast"}GET /api/v1/randomRandom from all categories{"type": "dadjoke", "joke": "..."}
🔄 Example Request
bashcurl http://localhost:3000/api/v1/dadjoke
✅ Example Response
json{
  "joke": "What do you call a bear with no teeth? A gummy bear!"
}

🛠️ Installation & Self-Hosting
Prerequisites

Node.js v22.14.0 or higher
npm or yarn

Setup

Clone the repository

bashgit clone https://github.com/Blackjuicepug/funbox_api.git
cd funbox_api

Install dependencies

bashnpm install

Start the server

bashnpm start
The API will be available at http://localhost:3000

Custom port (optional)

bashPORT=5000 npm start

📁 Project Structure
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

🐳 Docker Deployment
Build and run with Docker:
bash# Build the image
docker build -t funbox-api .

# Run the container
docker run -p 3000:3000 funbox-api
Or use Docker Compose (create a docker-compose.yml):
yamlversion: '3.8'
services:
  funbox:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
Then run:
bashdocker-compose up -d

🎨 Usage Examples
JavaScript (Fetch)
javascriptfetch('http://localhost:3000/api/v1/dadjoke')
  .then(res => res.json())
  .then(data => console.log(data.joke));
Python
pythonimport requests

response = requests.get('http://localhost:3000/api/v1/quote')
data = response.json()
print(f"{data['quote']} - {data['author']}")
cURL
bash# Get a roast
curl http://localhost:3000/api/v1/roast

# Roast someone specific
curl http://localhost:3000/api/v1/roast/Bob

# Get a random response from any category
curl http://localhost:3000/api/v1/random
Node.js with Axios
javascriptconst axios = require('axios');

async function getJoke() {
  const { data } = await axios.get('http://localhost:3000/api/v1/dadjoke');
  console.log(data.joke);
}
Discord Bot Example
javascriptconst fetch = require('node-fetch');

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

🔧 API Features

✅ CORS enabled - Use from any domain
✅ Rate limiting - 120 requests per minute per IP
✅ Lightweight - Fast response times
✅ No authentication required - Simple and open
✅ JSON responses - Easy to parse
✅ Extensive content library - Thousands of entries
✅ Versioned API - /api/v1 for future compatibility
✅ Personalization - Name support on compliments and roasts
✅ Web interface - Visit / for interactive documentation
✅ Cloudflare ready - Supports cf-connecting-ip header
✅ Docker support - Easy containerized deployment


📡 API Information Endpoints
Get API version info
bashcurl http://localhost:3000/api
Response:
json{
  "message": "Fun API Service",
  "versions": {
    "v1": "/api/v1",
    "current": "v1",
    "deprecated": []
  },
  "web_interface": "/"
}
Get all available endpoints
bashcurl http://localhost:3000/api/v1
Returns a complete list of endpoints with descriptions and rate limit info.

🤝 Contributing
Contributions are welcome! Here's how you can help:

Add more content - Submit PRs with new jokes, quotes, etc.
Improve documentation - Help make this README better
Report bugs - Open issues for any problems
Suggest features - Share your ideas

Adding Content
To add new content to any category:

Open the corresponding file in /data/ (e.g., dadjokes.json)
Add your content following the existing format
Submit a pull request


📊 Data Format Examples
Dad Jokes (dadjokes.json)
json[
  "Why did the scarecrow win an award? He was outstanding in his field!",
  {
    "text": "What do you call a fake noodle? An impasta!"
  }
]
Quotes (quotes.json)
json[
  {
    "text": "The only way to do great work is to love what you do",
    "author": "Steve Jobs"
  },
  {
    "text": "Innovation distinguishes between a leader and a follower",
    "author": "Steve Jobs"
  }
]
Would You Rather (wyr.json)
json[
  {
    "optionA": "Have the ability to fly",
    "optionB": "Be invisible whenever you want"
  }
]
Insults (insults.json)
json{
  "templates": [
    "You {adjective} {noun}!",
    "If brains were {noun}, you couldn't {verb}"
  ],
  "adjectives": ["absolute", "complete", "total"],
  "nouns": ["buffoon", "walnut", "potato"],
  "verbs": ["fill a teaspoon", "power a light bulb"]
}
Meme Templates (memetemplates.json)
json[
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
Simple Lists (reasons, roasts, compliments, etc.)
json[
  "Your reason/roast/compliment here",
  "Another one here",
  "And another..."
]
Personalization Support
Some endpoints support {name} placeholders for personalization:
json[
  "{name}, you're absolutely amazing!",
  "Hey {name}, you light up every room you enter!"
]
Use the /:name parameter in the endpoint:
bashcurl http://localhost:3000/api/v1/compliment/Sarah
# Returns: {"compliment": "Sarah, you're absolutely amazing!", "recipient": "Sarah"}

🌟 Projects Using FunBox
Using FunBox in your project? Open a PR to be featured here!

📄 License
MIT License - See LICENSE file for details

👤 Author
Created with ❤️ and humor by Blackjuicepug

🙏 Acknowledgments

Inspired by various fun APIs around the web
Built with Express.js
Community contributions welcome


<p align="center">
  Made with Node.js and a sense of humor 😄
</p>
<p align="center">
  <a href="#-quick-start">Get Started</a> •
  <a href="#%EF%B8%8F-installation--self-hosting">Install</a> •
  <a href="#-contributing">Contribute</a>
</p>
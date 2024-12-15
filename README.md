# Avinor AI Assistant

A React-based conversational AI interface that enables voice interactions through the ElevenLabs API, designed to match Avinor's brand identity. The application features a conversation component with message transcript display, audio visualization, and backend API integration.

## Features

- Voice-based AI interactions using ElevenLabs API
- Real-time audio visualization
- Message transcript system
- Responsive design with Avinor branding
- Error handling and user notifications
- Banking calculations integration

## Tech Stack

- Frontend:
  - React with TypeScript
  - TailwindCSS for styling
  - ShadcnUI components
  - ElevenLabs API integration

- Backend:
  - Express.js server
  - RESTful API endpoints
  - Error handling middleware

## Prerequisites

- Node.js 20 or higher
- NPM or Yarn
- ElevenLabs API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/avinor-ai-assistant.git
cd avinor-ai-assistant
```

2. Install dependencies:
```bash
npm install
cd client && npm install
```

3. Create a `.env` file in the root directory and add your ElevenLabs API key:
```env
ELEVENLABS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── pages/        # Page components
├── server/                # Backend Express server
│   ├── routes/           # API routes
│   └── middleware/       # Express middleware
└── package.json          # Project dependencies
```

## Docker Support

The project includes Docker support for containerized deployment. Build and run using:

```bash
docker build -t avinor-ai-assistant .
docker run -p 8080:8080 avinor-ai-assistant
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

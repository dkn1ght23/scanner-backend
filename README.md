# Backend Setup Guide

## Project Overview
A Node.js/Express backend with OWASP ZAP security scanning and Gemini AI integration.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (v9+)
- Java Runtime Environment (JRE 11+)
- [OWASP ZAP](https://www.zaproxy.org/download/) (v2.14+)
- Gemini API key (from Google AI Studio)
- ZAP API key (auto-generated on first run)

## Installation

### 1. Clone the Repository

```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Install Dependencies

```bash
npm install
# or if using yarn
yarn install
```

### 3. Install OWASP ZAP

Download and install OWASP ZAP from the [official website](https://www.zaproxy.org/download/).

#### Get the ZAP API Key

1. Open OWASP ZAP.
2. Navigate to `Tools` > `Options`.
3. Under `API` settings, locate the API key.
4. Copy and save the API key for later use.

### 4. Run OWASP ZAP

#### On Windows:

```powershell
cd "installation_path"
zap.bat -daemon -port 8080
```

#### On macOS:

```bash
/Applications/ZAP.app/Contents/MacOS/ZAP -daemon
```

### 5. Get the Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Navigate to `API Keys`.
4. Generate a new API key and save it securely.

### 6. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
GEMINI_API_KEY=<your_gemini_api_key>
ZAP_API_KEY=<your_zap_api_key>
```

### 7. Run the Server

To start the backend server, run:

```bash
npm start
```

Or using Nodemon for automatic restarts during development:

```bash
npm run dev
```


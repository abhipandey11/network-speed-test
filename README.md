# Network Speed Test Web App

A full-stack web application that measures internet speed including **ping, download speed, and upload speed** with a live speedometer and real-time graph visualization.

## Live Demo

Frontend: https://your-vercel-url.vercel.app
Backend API: https://network-speed-test-wez6.onrender.com

## Features

* Real-time **internet speed measurement**
* Animated **speedometer gauge**
* Live **speed graph visualization**
* **Ping latency measurement**
* Download and upload speed testing
* Multiple test runs with averaged results
* Stores results in **MongoDB database**
* Fully deployed cloud architecture

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* Chart.js
* JustGage (Speedometer)

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## Project Structure

```
network-speed-test
│
├── client
│   ├── index.html
│   └── script.js
│
├── server
│   ├── server.js
│   └── package.json
│
└── README.md
```

## How the Speed Test Works

1. **Ping Test**
   Measures network latency using a lightweight API request.

2. **Download Test**
   Streams data from the server and calculates speed in real time.

3. **Upload Test**
   Uploads generated data to the server to calculate upload speed.

4. **Speed Visualization**
   Results are displayed using a speedometer gauge and live graph.

## Installation (Local Setup)

Clone the repository:

```
git clone https://github.com/abhipandey11/network-speed-test.git
```

Install backend dependencies:

```
cd server
npm install
```

Start the server:

```
node server.js
```

Open the frontend:

```
client/index.html
```

## Deployment

Frontend deployed using **Vercel**
Backend deployed using **Render**
Database hosted on **MongoDB Atlas**

## Author

Developed as a networking and full-stack project demonstrating real-time data streaming and visualization.

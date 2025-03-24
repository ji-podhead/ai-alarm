import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import mediasoup from 'mediasoup'
import express from 'express'
import http from 'http'

function App() {
  const [count, setCount] = useState(0)
const app = express();
const server = http.createServer(app);
let worker;
let router;

async function createWorker() {
  worker = await mediasoup.createWorker();
  router = await worker.createRouter({ mediaCodecs: mediasoup.getDefaultRouterOptions().mediaCodecs });
  console.log('Mediasoup Worker und Router erstellt');
}

app.use(express.json());

app.post('/create-transport', async (req, res) => {
  const transport = await router.createWebRtcTransport({
    listenIps: [{ ip: '127.0.0.1', announcedIp: null }],
    enableUdp: true,
    enableTcp: true,
  });
  res.json({
    id: transport.id,
    iceParameters: transport.iceParameters,
    iceCandidates: transport.iceCandidates,
    dtlsParameters: transport.dtlsParameters,
  });
});

server.listen(3000, () => {
  console.log('Mediasoup-Server läuft auf http://localhost:3000');
  createWorker();
});
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

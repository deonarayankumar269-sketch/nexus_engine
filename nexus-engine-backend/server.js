const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const cors = require('cors');
const Snippet = require('./models/Snippet');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nexusengine');

app.get('/api/snippets/:title', async (req, res) => {
    try {
        const snippets = await Snippet.find({ title: req.params.title }).sort({ updatedAt: -1 });
        res.json(snippets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/snippets/commit', async (req, res) => {
    try {
        const { title, branch, code, author } = req.body;
        const commitHash = Math.random().toString(36).substring(2, 9);
        const newSnippet = new Snippet({ title, branch, code, commitHash, author });
        await newSnippet.save();
        res.status(201).json({ message: 'Commit successful', commitHash, branch });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/sandbox/execute', async (req, res) => {
    const { code } = req.body;

    const workerScript = `
        const { parentPort } = require('worker_threads');
        try {
            const start = performance.now();
            const result = eval(\`(function() { \${parentPort.code || code} })()\`);
            const end = performance.now();
            parentPort.postMessage({
                success: true,
                executionTimeMs: (end - start).toFixed(4),
                memoryUsageMb: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
                output: result
            });
        } catch (error) {
            parentPort.postMessage({ success: false, error: error.message });
        }
    `;

    const worker = new Worker(workerScript, { eval: true });
    worker.code = code;

    const timeout = setTimeout(() => {
        worker.terminate();
        res.status(408).json({ error: 'Sandbox Execution Timeout: CPU time limit exceeded.' });
    }, 3000);

    worker.on('message', (message) => {
        clearTimeout(timeout);
        res.json(message);
    });

    worker.on('error', (err) => {
        clearTimeout(timeout);
        res.status(500).json({ error: err.message });
    });
});

io.on('connection', (socket) => {
    socket.on('code-change', (data) => {
        socket.broadcast.emit('code-update', data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
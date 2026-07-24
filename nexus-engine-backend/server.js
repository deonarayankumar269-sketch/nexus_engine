const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const cors = require('cors');
const Snippet = require('./models/Snippet');

const app = express();
const server = http.createServer(app);

// Live frontend URL (Render) aur localhost dono ko allow karne ke liye
const allowedOrigins = [
    "https://nexus-engine-1.onrender.com",
    "http://localhost:5173",
    "http://localhost:3000"
];

const io = new Server(server, {
    cors: { 
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === 'production') {
                return callback(new Error('CORS policy violation'), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST"] 
    }
});

app.use(express.json());
app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV === 'production') {
            return callback(new Error('CORS policy violation'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nexusengine')
    .then(() => console.log('[MongoDB] Connected successfully'))
    .catch(err => console.error('[MongoDB Connection Error]:', err));

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
        parentPort.on('message', (codeToRun) => {
            try {
                const start = performance.now();
                const result = eval(\`(function() { \${codeToRun} })()\`);
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
        });
    `;

    const worker = new Worker(workerScript, { eval: true });

    const timeout = setTimeout(() => {
        worker.terminate();
        res.status(408).json({ error: 'Sandbox Execution Timeout: CPU time limit exceeded.' });
    }, 3000);

    worker.on('message', (message) => {
        clearTimeout(timeout);
        res.json(message);
        worker.terminate();
    });

    worker.on('error', (err) => {
        clearTimeout(timeout);
        res.status(500).json({ error: err.message });
        worker.terminate();
    });

    // Send code to worker thread
    worker.postMessage(code);
});

io.on('connection', (socket) => {
    socket.on('code-change', (data) => {
        socket.broadcast.emit('code-update', data);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`[NEXUS_BACKEND] Server running on port ${PORT}`);
});
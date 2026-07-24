import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const BACKEND_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://nexus-engine-backend.onrender.com';

export default function App() {
    const [activeTab, setActiveTab] = useState('editor');
    const [code, setCode] = useState(`function executeNeuralSynthesis(matrixScale) {
    const startTime = performance.now();
    let computedEntropy = 0;
    
    for (let i = 0; i < matrixScale; i++) {
        computedEntropy += Math.sin(i) * Math.cos(i) / (i + 0.5);
    }
    
    const endTime = performance.now();
    return {
        executionTimeMs: (endTime - startTime).toFixed(4),
        entropyValue: computedEntropy,
        status: 'QUANTUM_SYNTHESIZED'
    };
}
return executeNeuralSynthesis(8000000);`);

    const [branch, setBranch] = useState('main@origin');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [metrics, setMetrics] = useState({ time: '0.00ms', memory: '0.0 MB', status: 'NEURAL_LINK // STANDBY' });
    const [terminalLogs, setTerminalLogs] = useState([
        '// NEXUS_NEURAL_MAINFRAME_V15 // CHIEF: DEONARAYAN',
        '[QUANTUM_CORE] Holographic projection matrices online.',
        '[SECURE_MESH] Zero-latency peer cluster active.'
    ]);
    const [cliInput, setCliInput] = useState('');
    const [cliHistory, setCliHistory] = useState([
        'NexusEngine Neural OS [Version 15.0.2-GODMODE]',
        'Type "help", "matrix-override", or click "INITIALIZE QUANTUM COMPILE" to trigger.'
    ]);
    const [cpuLoad, setCpuLoad] = useState('14.2');
    const [quantumFlux, setQuantumFlux] = useState('99.80');

    const waveCanvasRef = useRef(null);
    const particleCanvasRef = useRef(null);
    const radarCanvasRef = useRef(null);
    const matrixCanvasRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const socketRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            socketRef.current = io(BACKEND_URL);

            socketRef.current.on('code-update', (incomingCode) => {
                setCode(incomingCode);
            });

            return () => {
                if (socketRef.current) socketRef.current.disconnect();
            };
        }
    }, []);

    useEffect(() => {
        const canvas = particleCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animId;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles = Array.from({ length: 110 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            size: Math.random() * 2.5 + 1,
            color: Math.random() > 0.5 ? '#00f2fe' : '#ff007f'
        }));

        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                const mDist = Math.hypot(p.x - mousePos.current.x, p.y - mousePos.current.y);
                if (mDist < 150) {
                    ctx.strokeStyle = 'rgba(255, 0, 127, 0.35)';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mousePos.current.x, mousePos.current.y);
                    ctx.stroke();

                    p.x += (mousePos.current.x - p.x) * 0.01;
                    p.y += (mousePos.current.y - p.y) * 0.01;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 10;
                ctx.fill();

                for (let j = idx + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 120})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpuLoad((10 + Math.random() * 25).toFixed(1));
            setQuantumFlux((99.0 + Math.random() * 0.9).toFixed(2));
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const drawWave = (points) => {
        const canvas = waveCanvasRef.current;
        if (!canvas || !canvas.parentElement) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const width = canvas.parentElement.clientWidth;
        const height = canvas.parentElement.clientHeight;

        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 30) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += 20) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        const step = width / (points.length - 1);
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
            const px = i * step;
            const py = height - Math.min(points[i], height - 20);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }

        const neonGrad = ctx.createLinearGradient(0, 0, width, 0);
        neonGrad.addColorStop(0, '#00f2fe');
        neonGrad.addColorStop(0.5, '#7928ca');
        neonGrad.addColorStop(1, '#ff007f');
        ctx.strokeStyle = neonGrad;
        ctx.lineWidth = 4;
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 20;
        ctx.stroke();

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const areaGrad = ctx.createLinearGradient(0, 0, 0, height);
        areaGrad.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
        areaGrad.addColorStop(1, 'rgba(255, 0, 127, 0)');
        ctx.fillStyle = areaGrad;
        ctx.fill();
    };

    const drawRadar = () => {
        const canvas = radarCanvasRef.current;
        if (!canvas || !canvas.parentElement) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const width = canvas.width = canvas.parentElement.clientWidth;
        const height = canvas.height = canvas.parentElement.clientHeight;
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(cx, cy) - 20;

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
        ctx.lineWidth = 1.5;
        [0.3, 0.6, 1].forEach(r => {
            ctx.beginPath();
            ctx.arc(cx, cy, radius * r, 0, Math.PI * 2);
            ctx.stroke();
        });

        ctx.beginPath();
        ctx.moveTo(cx - radius, cy); ctx.lineTo(cx + radius, cy);
        ctx.moveTo(cx, cy - radius); ctx.lineTo(cx, cy + radius);
        ctx.stroke();

        ctx.fillStyle = '#ff007f';
        ctx.shadowColor = '#ff007f';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(cx + 45, cy - 55, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#00f2fe';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(cx - 65, cy + 35, 4.5, 0, Math.PI * 2);
        ctx.fill();
    };

    const drawMatrixRain = () => {
        const canvas = matrixCanvasRef.current;
        if (!canvas || !canvas.parentElement) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const width = canvas.width = canvas.parentElement.clientWidth;
        const height = canvas.height = canvas.parentElement.clientHeight;

        ctx.fillStyle = 'rgba(2, 4, 8, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#00f2fe';
        ctx.font = '13px monospace';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 8;

        const characters = '01DEONARAYAN_QUANTUM_CORE_SYNTHESIS_ΩΨΦ⚡';
        for (let i = 0; i < 45; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = Math.random() * width;
            const y = Math.random() * height;
            ctx.fillText(text, x, y);
        }
    };

    useEffect(() => {
        drawWave([60, 110, 80, 150, 100, 180, 130, 200]);
        drawRadar();
        drawMatrixRain();
    }, [activeTab]);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);
        if (socketRef.current) {
            socketRef.current.emit('code-change', newCode);
        }
    };

    const executeCode = async () => {
        setMetrics(prev => ({ ...prev, status: 'SYNTHESIZING QUANTUM CORES...' }));
        appendLog(`[DISPATCH] Pushing execution payload through quantum secure tunnel...`);

        try {
            const response = await fetch(`${BACKEND_URL}/api/sandbox/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });
            const data = await response.json();

            if (data.success) {
                setMetrics({
                    time: data.executionTimeMs + 'ms',
                    memory: data.memoryUsageMb + ' MB',
                    status: 'QUANTUM OVERDRIVE // SUCCESS'
                });
                appendLog(`[SUCCESS] Execution verified. Latency: ${data.executionTimeMs}ms | Heap Allocated: ${data.memoryUsageMb}MB`);
                drawWave([70, 130, 90, 170, 120, 200, 150, parseFloat(data.executionTimeMs) * 3.8]);
            } else {
                setMetrics(prev => ({ ...prev, status: 'EXCEPTION // CORE PANIC' }));
                appendLog(`[ERROR] ${data.error}`);
            }
        } catch (err) {
            setMetrics({
                time: '1.42ms',
                memory: '24.8 MB',
                status: 'FALLBACK // SIMULATED 200 OK'
            });
            appendLog(`[FATAL] Local neural daemon unreachable. Simulating fallback.`);
        }
    };

    const appendLog = (msg) => {
        setTerminalLogs(prev => [...prev, msg]);
    };

    const handleCliSubmit = (e) => {
        e.preventDefault();
        if (!cliInput.trim()) return;
        const cmd = cliInput.trim();
        setCliHistory(prev => [...prev, `> ${cmd}`, `Neural command broadcasted. Core execution status: 200 OK.`]);
        setCliInput('');
    };

    return (
        <div className="bg-[#020408] text-cyan-300 min-h-screen flex flex-col font-mono select-none overflow-hidden relative">
            <canvas ref={particleCanvasRef} className="absolute inset-0 pointer-events-none z-0"></canvas>

            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/25 rounded-full blur-[180px] pointer-events-none z-0 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-600/25 rounded-full blur-[180px] pointer-events-none z-0 animate-pulse"></div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-40 opacity-30"></div>

            <header className="bg-[#050b14]/90 backdrop-blur-3xl sticky top-0 z-50 border-b border-cyan-500/40 px-6 py-4 flex items-center justify-between shadow-[0_0_60px_rgba(0,242,254,0.3)]">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,0,127,0.8)] animate-pulse">
                            <i className="fa-solid fa-atom text-[#020408] text-2xl font-black"></i>
                        </div>
                        <div>
                            <h1 className="font-black tracking-[0.3em] text-base bg-gradient-to-r from-cyan-300 via-teal-100 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,242,254,0.6)]">NEXUS_ENGINE // GOD-TIER OS</h1>
                            <p className="text-[11px] text-pink-400 tracking-widest font-black">ARCHITECT: DEONARAYAN</p>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-cyan-500/40"></div>
                    <div className="flex items-center space-x-3 text-xs bg-[#091326]/90 px-4 py-2 rounded-2xl border border-cyan-500/50 shadow-[inset_0_0_20px_rgba(0,242,254,0.25)]">
                        <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
                        <span className="text-slate-400 font-bold">CLUSTER:</span>
                        <span className="text-cyan-200 font-black tracking-wider">{branch}</span>
                    </div>
                    <div className="hidden xl:flex items-center space-x-3 text-xs bg-[#091326]/90 px-4 py-2 rounded-2xl border border-pink-500/40 shadow-[inset_0_0_20px_rgba(255,0,127,0.2)]">
                        <i className="fa-solid fa-microchip text-pink-400"></i>
                        <span className="text-slate-400 font-bold">CPU:</span>
                        <span className="text-pink-300 font-black">{cpuLoad}%</span>
                    </div>
                    <div className="hidden xl:flex items-center space-x-3 text-xs bg-[#091326]/90 px-4 py-2 rounded-2xl border border-purple-500/40 shadow-[inset_0_0_20px_rgba(121,40,202,0.2)]">
                        <i className="fa-solid fa-wave-square text-purple-400"></i>
                        <span className="text-slate-400 font-bold">FLUX:</span>
                        <span className="text-purple-300 font-black">{quantumFlux}%</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsModalOpen(true)} className="px-5 py-3 text-xs font-black bg-[#091326] hover:bg-[#112240] text-cyan-300 rounded-2xl border border-cyan-500/50 transition shadow-[0_0_30px_rgba(0,242,254,0.3)] flex items-center space-x-2.5 group">
                        <i className="fa-solid fa-code-branch text-pink-400 group-hover:rotate-90 transition-transform duration-500"></i>
                        <span className="tracking-wider">BRANCHES</span>
                    </button>
                    <button onClick={executeCode} className="px-7 py-3 text-xs font-black bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-[#020408] rounded-2xl transition shadow-[0_0_45px_rgba(255,0,127,0.8)] flex items-center space-x-3 transform hover:scale-105 active:scale-95">
                        <i className="fa-solid fa-bolt-lightning text-sm text-[#020408]"></i>
                        <span className="tracking-widest">INITIALIZE QUANTUM COMPILE</span>
                    </button>
                </div>
            </header>

            <div className="bg-[#050b14]/75 backdrop-blur-md px-6 py-2.5 border-b border-cyan-500/30 flex items-center space-x-4 z-10 text-xs">
                <button onClick={() => setActiveTab('editor')} className={`px-5 py-2 rounded-xl font-bold transition flex items-center space-x-2.5 ${activeTab === 'editor' ? 'bg-gradient-to-r from-cyan-500/30 to-pink-500/30 text-cyan-200 border border-cyan-500/60 shadow-[0_0_25px_rgba(0,242,254,0.4)]' : 'text-slate-400 hover:text-cyan-300'}`}>
                    <i className="fa-solid fa-code text-cyan-400 text-sm"></i>
                    <span>Quantum Code Editor</span>
                </button>
                <button onClick={() => setActiveTab('cli')} className={`px-5 py-2 rounded-xl font-bold transition flex items-center space-x-2.5 ${activeTab === 'cli' ? 'bg-gradient-to-r from-cyan-500/30 to-pink-500/30 text-cyan-200 border border-cyan-500/60 shadow-[0_0_25px_rgba(0,242,254,0.4)]' : 'text-slate-400 hover:text-cyan-300'}`}>
                    <i className="fa-solid fa-terminal text-pink-400 text-sm"></i>
                    <span>Neural Shell CLI</span>
                </button>
                <button onClick={() => setActiveTab('radar')} className={`px-5 py-2 rounded-xl font-bold transition flex items-center space-x-2.5 ${activeTab === 'radar' ? 'bg-gradient-to-r from-cyan-500/30 to-pink-500/30 text-cyan-200 border border-cyan-500/60 shadow-[0_0_25px_rgba(0,242,254,0.4)]' : 'text-slate-400 hover:text-cyan-300'}`}>
                    <i className="fa-solid fa-satellite-dish text-cyan-400 text-sm"></i>
                    <span>Global Peer Radar</span>
                </button>
                <button onClick={() => setActiveTab('matrix')} className={`px-5 py-2 rounded-xl font-bold transition flex items-center space-x-2.5 ${activeTab === 'matrix' ? 'bg-gradient-to-r from-cyan-500/30 to-pink-500/30 text-cyan-200 border border-cyan-500/60 shadow-[0_0_25px_rgba(0,242,254,0.4)]' : 'text-slate-400 hover:text-cyan-300'}`}>
                    <i className="fa-solid fa-microchip text-pink-400 text-sm"></i>
                    <span>Neural Matrix Stream</span>
                </button>
            </div>

            <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 max-w-[1920px] w-full mx-auto z-10">
                <section className="lg:col-span-8 flex flex-col bg-[#050b14]/90 backdrop-blur-3xl rounded-3xl overflow-hidden border border-cyan-500/40 shadow-[0_0_70px_rgba(0,0,0,0.95)] relative group">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse"></div>

                    {activeTab === 'editor' && (
                        <>
                            <div className="bg-[#091326]/95 px-6 py-4 flex items-center justify-between border-b border-cyan-500/40 text-xs">
                                <div className="flex items-center space-x-3 text-cyan-300">
                                    <i className="fa-solid fa-file-code text-pink-500 text-sm"></i>
                                    <span className="font-black tracking-wider text-slate-100">quantum_sandbox_worker.js</span>
                                </div>
                                <div className="flex items-center space-x-3 text-[11px]">
                                    <span className="text-cyan-300 bg-cyan-500/20 px-3.5 py-1.5 rounded-xl border border-cyan-500/50 font-black shadow-[0_0_20px_rgba(0,242,254,0.5)]">SECURE SANDBOX ACTIVE</span>
                                    <span className="text-slate-400 font-bold">UTF-8</span>
                                </div>
                            </div>
                            <textarea 
                                value={code} 
                                onChange={handleCodeChange}
                                spellCheck="false"
                                className="w-full flex-1 bg-transparent text-cyan-200 text-xs p-7 focus:outline-none resize-none leading-relaxed selection:bg-pink-500/40 font-mono"
                                style={{ minHeight: '540px' }}
                            />
                        </>
                    )}

                    {activeTab === 'cli' && (
                        <div className="flex-1 flex flex-col p-7 bg-[#020408]/95 font-mono text-xs" style={{ minHeight: '580px' }}>
                            <div className="flex-1 overflow-y-auto mb-4 space-y-2.5 text-cyan-400">
                                {cliHistory.map((line, idx) => (
                                    <div key={idx} className="tracking-wide">{line}</div>
                                ))}
                            </div>
                            <form onSubmit={handleCliSubmit} className="flex items-center space-x-3 border-t border-cyan-500/40 pt-4">
                                <span className="text-pink-500 font-black">nexus@quantum-kernel:~$</span>
                                <input 
                                    type="text" 
                                    value={cliInput}
                                    onChange={(e) => setCliInput(e.target.value)}
                                    placeholder="Enter root override command (e.g. status, benchmark, flush)..."
                                    className="flex-1 bg-transparent text-cyan-200 focus:outline-none font-mono text-xs"
                                />
                            </form>
                        </div>
                    )}

                    {activeTab === 'radar' && (
                        <div className="flex-1 flex flex-col items-center justify-center p-7 bg-[#020408]/95" style={{ minHeight: '580px' }}>
                            <h3 className="text-xs font-black uppercase tracking-widest text-cyan-300 mb-6 flex items-center space-x-2.5">
                                <i className="fa-solid fa-satellite-dish text-pink-500 animate-spin text-sm"></i>
                                <span>GLOBAL PEER MESH TELEMETRY</span>
                            </h3>
                            <div className="relative w-80 h-80 rounded-full border border-pink-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(255,0,127,0.3)] bg-[#050b14]/70">
                                <canvas ref={radarCanvasRef} className="absolute inset-0 w-full h-full"></canvas>
                                <div className="text-[11px] text-pink-300 font-black bg-[#020408]/95 px-4 py-1.5 rounded-xl border border-pink-500/60 z-10 shadow-[0_0_20px_rgba(255,0,127,0.5)]">MESH SECURED // 6 NODES</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'matrix' && (
                        <div className="flex-1 flex flex-col relative bg-[#020408] overflow-hidden" style={{ minHeight: '580px' }}>
                            <div className="absolute top-5 left-5 z-10 bg-[#050b14]/90 px-5 py-2.5 rounded-2xl border border-cyan-500/50 text-xs shadow-[0_0_25px_rgba(0,242,254,0.4)]">
                                <p className="font-black text-cyan-300">QUANTUM MATRIX STREAM</p>
                                <p className="text-[11px] text-pink-400 mt-0.5">Real-time decryption sequence fully active</p>
                            </div>
                            <canvas ref={matrixCanvasRef} className="absolute inset-0 w-full h-full"></canvas>
                        </div>
                    )}
                </section>

                <section className="lg:col-span-4 flex flex-col space-y-5">
                    <div className="bg-[#050b14]/90 backdrop-blur-3xl rounded-3xl p-5 border border-cyan-500/40 shadow-[0_0_70px_rgba(0,0,0,0.95)] flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-black uppercase tracking-widest text-cyan-300 flex items-center space-x-2.5">
                                <i className="fa-solid fa-wave-square text-pink-500 animate-pulse text-sm"></i>
                                <span>QUANTUM WAVE PROFILER</span>
                            </h2>
                            <span className="text-[10px] bg-pink-500/20 text-pink-300 px-3 py-1 rounded-xl border border-pink-500/50 font-black">LIVE STREAM</span>
                        </div>
                        <div className="relative w-full h-48 bg-[#020408] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[inset_0_0_30px_rgba(0,242,254,0.2)]">
                            <canvas ref={waveCanvasRef} className="w-full h-full"></canvas>
                        </div>
                    </div>

                    <div className="bg-[#050b14]/90 backdrop-blur-3xl rounded-3xl p-5 border border-cyan-500/40 shadow-[0_0_70px_rgba(0,0,0,0.95)] flex-1 flex flex-col">
                        <h2 className="text-xs font-black uppercase tracking-widest text-cyan-300 mb-4 flex items-center space-x-2.5">
                            <i className="fa-solid fa-server text-cyan-400 text-sm"></i>
                            <span>SYSTEM EXECUTION METRICS</span>
                        </h2>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-[#020408] p-3.5 rounded-2xl border border-cyan-500/40 text-center shadow-[inset_0_0_20px_rgba(0,242,254,0.2)]">
                                <p className="text-[9px] font-black text-slate-400">LATENCY</p>
                                <p className="text-sm font-black text-cyan-400 mt-1">{metrics.time}</p>
                            </div>
                            <div className="bg-[#020408] p-3.5 rounded-2xl border border-purple-500/40 text-center shadow-[inset_0_0_20px_rgba(121,40,202,0.2)]">
                                <p className="text-[9px] font-black text-slate-400">HEAP MEMORY</p>
                                <p className="text-sm font-black text-purple-400 mt-1">{metrics.memory}</p>
                            </div>
                            <div className="bg-[#020408] p-3.5 rounded-2xl border border-pink-500/40 text-center shadow-[inset_0_0_20px_rgba(255,0,127,0.2)]">
                                <p className="text-[9px] font-black text-slate-400">STATUS</p>
                                <p className="text-[10px] font-black text-pink-400 mt-1.5 truncate">{metrics.status}</p>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#020408] rounded-2xl p-4 border border-cyan-500/30 text-[11px] text-cyan-300 overflow-y-auto max-h-48 shadow-[inset_0_0_30px_rgba(0,0,0,0.95)] leading-relaxed">
                            {terminalLogs.map((log, index) => (
                                <div key={index} className="mb-2.5 flex items-start space-x-2.5">
                                    <span className="text-pink-500 font-black">{'>'}</span>
                                    <span className="tracking-wide text-slate-300">{log}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-[#020408]/90 backdrop-blur-3xl flex items-center justify-center p-4">
                    <div className="bg-[#050b14] w-full max-w-md rounded-3xl border border-cyan-500/60 p-7 shadow-[0_0_90px_rgba(255,0,127,0.5)]">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xs font-black uppercase tracking-widest text-cyan-300">CLUSTER BRANCH MANAGER</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-cyan-400 transition"><i className="fa-solid fa-xmark text-xl"></i></button>
                        </div>
                        <div onClick={() => { setBranch('main@origin'); setIsModalOpen(false); }} className="p-4.5 bg-[#091326] rounded-2xl border border-cyan-500/60 cursor-pointer text-xs shadow-[0_0_30px_rgba(0,242,254,0.3)] hover:border-pink-500 transition">
                            <p className="font-black text-cyan-300 tracking-wider">main@origin</p>
                            <p className="text-[11px] text-slate-400 mt-1">Active Cluster Branch // Managed by Deonarayan</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Zap, CheckCircle2, Command, Sparkles, Quote, MessageSquare, Database, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Agents Data from User Spreadsheet
const agents = [
    {
        name: 'Maya',
        role: 'Account Manager',
        image: '/assets/maya.png',
        description: 'Warm, professional, excellent communicator. Bridge between client and technical team. Protective of client relationship. Translates technical jargon to plain English.',
        emoji: '👋',
        bg: 'bg-purple-500',
        color: 'text-purple-500'
    },
    {
        name: 'Chris',
        role: 'Product Manager',
        image: '/assets/chris.png',
        description: 'Organized, thinks in milestones, loves clear structures. Keeps everyone aligned and on track. Balances scope with timeline. Skilled at saying "no" to scope creep diplomatically.',
        emoji: '📋',
        bg: 'bg-blue-500',
        color: 'text-blue-500'
    },
    {
        name: 'Alex',
        role: 'Tech Lead',
        image: '/assets/alex.png',
        description: 'Opinionated, experienced, hates over-engineering. Strong opinions, loosely held. Mentors junior devs but expects excellence. Pragmatic about technical debt.',
        emoji: '🏗️',
        bg: 'bg-red-500',
        color: 'text-red-500'
    },
    {
        name: 'Riley',
        role: 'Designer',
        image: '/assets/riley.png',
        description: 'Creative, user-focused, loves whitespace. Advocates for user experience above all. Detail-oriented about visual consistency. Collaborative but protective of design quality.',
        emoji: '🖌️',
        bg: 'bg-pink-500',
        color: 'text-pink-500'
    },
    {
        name: 'Jordan',
        role: 'Frontend Developer',
        image: '/assets/jordan.png',
        description: 'Creative coder, detail-oriented, loves micro-interactions. Balances aesthetics with performance. Pushes for polish but respects deadlines. Collaborative with designers.',
        emoji: '🎨',
        bg: 'bg-amber-500',
        color: 'text-amber-500'
    },
    {
        name: 'Sam',
        role: 'Backend Developer',
        image: '/assets/sam.png',
        description: 'Methodical, thorough, defensive coder. Thinks about edge cases constantly. Documents everything. Slightly paranoid about data integrity.',
        emoji: '⚙️',
        bg: 'bg-emerald-500',
        color: 'text-emerald-500'
    },
    {
        name: 'Taylor',
        role: 'Code Reviewer',
        image: '/assets/taylor.png',
        description: 'High standards, nitpicky, brutally honest. Believes good code review prevents bugs. Fair but demanding. Acknowledges good work.',
        emoji: '🔍',
        bg: 'bg-cyan-500',
        color: 'text-cyan-500'
    },
    {
        name: 'Quinn',
        role: 'QA Tester',
        image: '/assets/quin.png',
        description: 'Curious, loves breaking things, finds edge cases. User advocate who thinks like a malicious user. Thorough but understands priorities. Celebrates finding bugs.',
        emoji: '🧪',
        bg: 'bg-teal-500',
        color: 'text-teal-500'
    },
    {
        name: 'Casey',
        role: 'DevOps Engineer',
        image: '/assets/casey.png',
        description: 'Efficient, automates everything, loves green checkmarks. Paranoid about security and uptime. Keeps deployments boring (no surprises). Documents infrastructure thoroughly.',
        emoji: '🚀',
        bg: 'bg-indigo-500',
        color: 'text-indigo-500'
    },
];

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function App() {
    const [activeIndex, setActiveIndex] = useState(4); // Start with Jordan
    const isModalOpenState = useState(false);
    const [isModalOpen, setIsModalOpen] = isModalOpenState;
    const [isSystemOverride, setIsSystemOverride] = useState(false);
    const [logs, setLogs] = useState([]);
    const activeAgent = agents[activeIndex];

    // Fake logs generator
    const generateLog = () => {
        const verbs = ['Bypassing', 'Injecting', 'Optimizing', 'Compiling', 'Decrypting', 'Overclocking', 'Refactoring'];
        const nouns = ['Firewall', 'Neural Net', 'Mainframe', 'Docker Container', 'Quantum Core', 'API Gateway', 'Zero-Day Exploit'];
        const status = ['SUCCESS', 'WARNING', 'CRITICAL', 'DONE'];

        return `[${new Date().toLocaleTimeString()}] ${verbs[Math.floor(Math.random() * verbs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}... ${status[Math.floor(Math.random() * status.length)]}`;
    };

    // Auto-switch agents logic (Faster in Override Mode)
    useEffect(() => {
        if (isModalOpen) return;

        // Generate logs if override is active
        let logInterval;
        if (isSystemOverride) {
            logInterval = setInterval(() => {
                setLogs(prev => [generateLog(), ...prev].slice(0, 8)); // Keep last 8 logs
            }, 200);
        } else {
            setLogs([]);
        }

        const timer = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % agents.length);
        }, isSystemOverride ? 800 : 3000); // 800ms in override mode, 3000ms normal

        return () => {
            clearTimeout(timer);
            if (logInterval) clearInterval(logInterval);
        };
    }, [activeIndex, isModalOpen, isSystemOverride]);

    // Map Tailwind classes to Hex values for the gradient
    const colorMap = {
        'bg-purple-500': '#a855f7',
        'bg-blue-500': '#3b82f6',
        'bg-red-500': '#ef4444',
        'bg-pink-500': '#ec4899',
        'bg-amber-500': '#f59e0b',
        'bg-emerald-500': '#10b981',
        'bg-cyan-500': '#06b6d4',
        'bg-teal-500': '#14b8a6',
        'bg-indigo-500': '#6366f1',
    };

    return (
        <div className={cn(
            "relative h-screen w-full flex flex-col items-center justify-between overflow-hidden transition-colors duration-700 selection:bg-slate-200",
            isSystemOverride ? "bg-slate-950" : "bg-slate-50"
        )}>

            {/* Dynamic Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className={cn(
                    "absolute inset-0 [background-size:24px_24px] transition-all duration-700",
                    isSystemOverride
                        ? "bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] opacity-10 bg-[size:40px_40px]"
                        : "bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-60"
                )} />
                <motion.div
                    animate={{
                        background: isSystemOverride
                            ? `radial-gradient(circle at 50% 120%, #22c55e 0%, transparent 70%)`
                            : `radial-gradient(circle at 50% 120%, ${colorMap[activeAgent.bg] || '#cbd5e1'}15, transparent 60%)`
                    }}
                    className="absolute inset-0 opacity-40 transition-colors duration-1000"
                />
            </div>

            {/* "Intel Feed" Overlay (System Override Mode) */}
            <AnimatePresence>
                {isSystemOverride && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-black/80 backdrop-blur-md border-t border-green-500/30 z-40 p-4 md:p-6 font-mono text-xs text-green-400 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                            <div className="md:col-span-2 flex flex-col justify-end space-y-1">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1 - (i * 0.1), x: 0 }}
                                        className="truncate"
                                    >
                                        <span className="opacity-50 mr-2">{'>'}</span> {log}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="border-l border-green-500/30 pl-8 flex-col justify-center gap-4 hidden md:flex">
                                <div>
                                    <h3 className="text-green-500 font-bold mb-1 uppercase tracking-widest">System Status</h3>
                                    <div className="text-2xl font-black">OVERRIDE ACTIVE</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="opacity-50 mb-1">CPU Load</div>
                                        <div className="h-1 w-full bg-green-900 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-green-500"
                                                animate={{ width: ["20%", "80%", "40%"] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="opacity-50 mb-1">Network</div>
                                        <div className="h-1 w-full bg-green-900 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-green-500"
                                                animate={{ width: ["60%", "90%", "30%"] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navbar / Header */}
            <header className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <div className={cn(
                        "w-3 h-3 rounded-full animate-pulse transition-colors duration-500",
                        isSystemOverride ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : activeAgent.bg
                    )} />
                    <span className={cn(
                        "font-mono text-xs font-bold tracking-widest transition-colors duration-500",
                        isSystemOverride ? "text-green-500" : "text-slate-400"
                    )}>
                        STATUS: {isSystemOverride ? "SYSTEM OVERRIDE" : "ONLINE"}
                    </span>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsSystemOverride(!isSystemOverride)}
                        className={cn(
                            "p-2 rounded-full transition-all duration-300",
                            isSystemOverride ? "bg-green-500 text-black shadow-[0_0_15px_#22c55e] rotate-180" : "hover:bg-slate-100 text-slate-400"
                        )}
                    >
                        <Command className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* HERO SECTION */}
            <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-start pt-4 z-10">

                {/* Main Title Area */}
                <div className="text-center space-y-4 mb-2 px-4">
                    <h1 className={cn(
                        "font-montserrat text-5xl md:text-8xl font-black tracking-tighter transition-colors duration-700",
                        isSystemOverride ? "text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "text-slate-900"
                    )}>
                        AI DEV SHOP
                    </h1>
                    <p className={cn(
                        "text-base md:text-xl font-medium max-w-xl mx-auto transition-colors duration-700",
                        isSystemOverride ? "text-green-400/80" : "text-slate-500"
                    )}>
                        Turn <span className={cn(
                            "font-bold underline decoration-2 underline-offset-4 transition-colors duration-700",
                            isSystemOverride ? "text-green-400 decoration-green-500" : "text-slate-900 decoration-slate-300"
                        )}>slack messages</span> into shipping code.
                    </p>

                    <div className="flex items-center justify-center gap-4 pt-4">
                        <a
                            href="https://github.com/Vishal2602/ai-dev-shop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
                        >
                            <Github className="w-4 h-4" /> Github
                        </a>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-slate-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" /> Wait, what is this?
                        </button>
                    </div>
                </div>

                {/* ACTIVE AGENT STAGE (The "Hero" Display) */}
                <div className="flex-1 w-full relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeAgent.name}
                            className="relative flex items-center justify-center w-full"
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                        >
                            {/* Background Graphic behind agent */}
                            <div className="absolute inset-0 flex items-center justify-center z-0">
                                <h2 className="text-[12rem] font-black text-slate-100 uppercase tracking-widest select-none leading-none scale-150 opacity-60">
                                    {activeAgent.role.split(' ')[0]}
                                </h2>
                            </div>

                            {/* Agent Sprite */}
                            <motion.img
                                src={activeAgent.image}
                                alt={activeAgent.name}
                                className="h-[380px] md:h-[550px] max-h-[60vh] w-auto object-contain pixelated z-10 drop-shadow-2xl filter contrast-110"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />

                            {/* Floating Stats / Info - UPDATED with Personality */}
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden lg:block max-w-sm">
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl">{activeAgent.emoji}</span>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 uppercase leading-none">{activeAgent.name}</h3>
                                            <p className={`font-mono text-xs font-bold uppercase tracking-wider ${activeAgent.color}`}>{activeAgent.role}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 relative">
                                        <Quote className={`w-8 h-8 absolute -top-2 -left-2 opacity-10 ${activeAgent.color}`} />
                                        <p className="text-slate-600 font-medium leading-relaxed pl-2 text-sm">
                                            {activeAgent.description}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                                        <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wide">
                                            Senior Level
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-opacity-10 ${activeAgent.bg.replace('bg-', 'bg-')} ${activeAgent.color}`}>
                                            Available
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

            </main>

            {/* THE DOCK (Bottom Navigation) */}
            {/* Dock (Hidden in Override Mode) */}
            {!isSystemOverride && (
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl shadow-slate-200/50 rounded-full px-4 py-2 md:px-5 md:py-2 flex items-end gap-1 md:gap-2 max-w-[90vw] overflow-x-auto selection-none">
                        {agents.map((agent, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={agent.name}
                                    onClick={() => setActiveIndex(index)}
                                    className="group relative flex flex-col items-center justify-end transition-all duration-300 ease-out focus:outline-none"
                                >
                                    {/* Tooltip on Hover */}
                                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap pointer-events-none -translate-y-2 group-hover:translate-y-0 duration-200 mb-2 shadow-lg flex items-center gap-1">
                                        <span>{agent.emoji}</span> {agent.name}
                                    </div>

                                    {/* Agent Icon */}
                                    <div className={cn(
                                        "relative transition-all duration-300 ease-spring",
                                        isActive ? "w-12 h-12 md:w-14 md:h-14 -translate-y-2 scale-110" : "w-10 h-10 md:w-11 md:h-11 opacity-60 hover:opacity-100 hover:scale-110 hover:-translate-y-1",
                                    )}>
                                        <img
                                            src={agent.image}
                                            alt={agent.name}
                                            className="w-full h-full object-contain pixelated drop-shadow-sm"
                                        />
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-dot"
                                                className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${agent.bg}`}
                                            />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* CREATOR MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-md cursor-pointer"
                        />
                        <div className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                className="relative pointer-events-auto bg-white/95 backdrop-blur-2xl overflow-hidden rounded-[32px] shadow-2xl max-w-5xl w-full h-auto min-h-[500px] md:h-[600px] max-h-[85vh] flex flex-col md:flex-row overflow-y-auto md:overflow-y-hidden shadow-purple-500/20"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-4 right-4 z-50 p-2 bg-slate-100/50 hover:bg-slate-200 rounded-full text-slate-500 hover:text-slate-900 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* COLUMN 1: Image of VISHAL (Me) */}
                                <div className="w-full h-64 md:w-1/3 md:h-auto relative overflow-hidden flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10" />
                                    <img
                                        src="/assets/mehalf.png"
                                        alt="Vishal Sunil Kumar"
                                        className="w-full h-full object-cover object-center md:object-center object-[50%_20%] scale-105 hover:scale-110 transition-transform duration-700 brightness-110 contrast-110"
                                    />
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <div className="text-white text-xs font-mono tracking-widest opacity-70 mb-1">ARCHITECT_ID: VISHAL</div>
                                        <div className="text-white font-black text-2xl tracking-tighter">BUILDING THE FUTURE</div>
                                    </div>
                                </div>

                                {/* COLUMN 2: Content Grid */}
                                <div className="w-full md:w-2/3 flex flex-col">

                                    {/* ROW 1: About The Product */}
                                    <div className="flex-1 p-6 md:p-12 border-b border-slate-100 relative group overflow-hidden flex flex-col justify-center">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-110" />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                                    <Database className="w-5 h-5" />
                                                </div>
                                                <h2 className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Product Identity</h2>
                                            </div>

                                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                                                AI Dev Shop
                                            </h3>

                                            <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base max-w-xl">
                                                A fully autonomous digital workforce of <span className="text-slate-900 font-bold decoration-blue-200 underline decoration-2 underline-offset-2">9 specialized AI agents</span> living inside your Slack workspace. From a detail-oriented Product Manager to a strict Code Reviewer named Taylor, this team takes your raw ideas and ships fully deployed web applications in <span className="bg-slate-100 px-1 rounded font-bold text-slate-800">under 20 minutes</span>.
                                            </p>
                                        </div>
                                    </div>

                                    {/* ROW 2: About The Architect */}
                                    <div className="flex-1 p-8 md:p-12 relative group overflow-hidden bg-slate-50/50 flex flex-col justify-center">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                                    <Sparkles className="w-5 h-5" />
                                                </div>
                                                <h2 className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-widest">The Architect</h2>
                                            </div>

                                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                                                Vishal Sunil Kumar
                                            </h3>

                                            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 max-w-xl">
                                                I am a <span className="text-slate-900 font-bold">Full Stack Engineer</span> and Mad Scientist who loves breaking things just to build them back better. With a background in UX and a Master’s from <span className="font-semibold text-slate-800">UMass Dartmouth</span>, I architect robust systems by day and orchestrate digital workforces by night from my HQ in <span className="font-semibold text-slate-800">Jersey City</span>.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}

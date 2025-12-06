'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Article } from '@/data/articles';
import { cn } from '@/lib/utils';
import { ArrowRight, Clock, Check, Moon, Sun } from 'lucide-react';
// Simplified step type
type Step = 'theme' | 'start' | 'reading' | 'finished';
type Theme = 'light' | 'dark';

interface ExperimentProps {
    article: Article;
    content: string;
}

export default function ExperimentFlow({ article, content }: ExperimentProps) {
    const [step, setStep] = useState<Step>('theme');
    const [theme, setTheme] = useState<Theme>('light');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    // Handle Start
    const handleStart = () => {
        setStartTime(Date.now());
        setStep('reading');
        window.scrollTo(0, 0);
    };

    // Handle Stop
    const handleStop = () => {
        setEndTime(Date.now());
        setStep('finished');
    };

    // Render Theme Selection
    if (step === 'theme') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
                <h2 className="text-3xl font-bold mb-8">Choose your reading theme</h2>
                <div className="flex gap-6">
                    <button
                        onClick={() => { setTheme('light'); setStep('start'); }}
                        className="flex flex-col items-center gap-4 p-8 border border-border rounded-2xl hover:bg-muted/50 transition-all hover:scale-105"
                    >
                        <div className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                            <span className="text-2xl">☀️</span>
                        </div>
                        <span className="text-lg font-medium">Light Mode</span>
                    </button>

                    <button
                        onClick={() => { setTheme('dark'); setStep('start'); }}
                        className="flex flex-col items-center gap-4 p-8 border border-border rounded-2xl bg-gray-900 hover:bg-gray-800 transition-all hover:scale-105"
                    >
                        <div className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                            <span className="text-2xl">🌙</span>
                        </div>
                        <span className="text-lg font-medium text-white">Dark Mode</span>
                    </button>
                </div>
            </div>
        );
    }

    // Render Start Screen
    if (step === 'start') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="max-w-md space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
                    </div>

                    <button
                        onClick={handleStart}
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25"
                    >
                        Start Reading
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>

                    <p className="text-sm text-muted-foreground">
                        The timer will start immediately when you click the button.
                    </p>
                </div>
            </div>
        );
    }

    // Render Reading Screen
    if (step === 'reading') {
        return (
            <div className="min-h-screen flex flex-col pb-20">
                {/* Header-like spacer or minimal header */}
                <div className="h-12"></div>

                <div className="max-w-3xl mx-auto px-6 w-full flex-1">
                    {/* ChatGPT-like Article Container */}
                    <article className="prose lg:prose-lg max-w-none 
             prose-headings:font-semibold prose-a:text-primary hover:prose-a:underline
             leading-relaxed">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </article>

                    <div className="my-16 flex justify-center">
                        <button
                            onClick={handleStop}
                            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors shadow-md flex items-center gap-2"
                        >
                            Stop Timer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Render Finished Screen
    if (step === 'finished') {
        const elapsed = startTime && endTime ? ((endTime - startTime) / 1000).toFixed(2) : '0.00';
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500">
                <div className="bg-muted/50 p-12 rounded-3xl border border-border max-w-md w-full">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">✓</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Reading Complete</h2>
                    <p className="text-muted-foreground mb-8">You finished the article.</p>

                    <div className="text-6xl font-mono font-bold mb-8 tabular-nums tracking-tight">
                        {elapsed}s
                    </div>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-2 rounded-full border border-border hover:bg-muted transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return null;
}

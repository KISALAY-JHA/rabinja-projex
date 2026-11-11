'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Play,
  Pause,
  StopCircle,
  Sparkles,
  Scale,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { NexVivaTurn } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function NexVivaInterface() {
  const [sessionActive, setSessionActive] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const sampleQuestions = [
    'How does your system distinguish sudden deceleration during sharp cornering from an actual high-speed vehicular collision?',
    'What is the inference latency of your MobileNetV2 architecture when running directly on edge hardware with thermal constraints?',
    'In low-light or adverse rain conditions, how does your system compensate for degraded optical clarity from the dash camera?',
  ];

  // Timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionActive && !sessionCompleted) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionActive, sessionCompleted]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionActive(true);
    setIsListening(true);
    setLiveTranscript('Listening for verbal response...');
  };

  const handleNextTurn = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setLiveTranscript('Listening for your answer to Question ' + (currentQuestionIndex + 2) + '...');
    } else {
      setSessionCompleted(true);
      setSessionActive(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Prototype Status Notification */}
      <div className="p-3.5 bg-nex-accent-light border border-nex-accent/30 rounded-lg flex items-center justify-between text-xs text-nex-primary">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-nex-accent shrink-0" />
          <span>
            <strong>Stage 5 Architectural Prototype:</strong> Real-time viva simulation with speech capture and turn taking.
          </span>
        </div>
        <Badge variant="outline" size="sm" className="bg-bg-card font-semibold">
          AI Judge Simulation Mode
        </Badge>
      </div>

      {/* Main Session Cockpit */}
      <Card className="overflow-hidden bg-bg-card border-border shadow-md">
        {/* Cockpit Header */}
        <div className="p-4 sm:p-5 bg-bg-card-warm border-b border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${sessionActive ? 'bg-error animate-ping' : 'bg-text-muted'}`} />
            <div>
              <h3 className="font-bold text-sm text-text-primary">
                Live Viva Session • SafeRoute AI Defense
              </h3>
              <p className="text-[11px] text-text-muted">
                Turn-taking judge simulation with real-time rubric tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-bg-card rounded-md border border-border font-mono text-xs font-bold text-text-primary">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>{formatTimer(elapsedSeconds)} / 10:00</span>
            </div>

            {sessionActive && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSessionCompleted(true)}
                className="text-xs text-error border-error/30 hover:bg-error-light"
              >
                <StopCircle className="w-3.5 h-3.5 mr-1" />
                End Session
              </Button>
            )}
          </div>
        </div>

        {/* Cockpit Core View */}
        <div className="p-6 sm:p-8 space-y-6">
          {!sessionActive && !sessionCompleted ? (
            /* Setup State */
            <div className="py-12 text-center max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 rounded-full bg-nex-accent-light text-nex-primary flex items-center justify-center mx-auto shadow-sm">
                <Scale className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-text-primary">
                  Ready to Start Live Project Defense?
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  NEX will present probing questions on screen based on your submitted materials. You will answer aloud via your microphone.
                </p>
              </div>

              {/* Hardware Permissions Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    micEnabled
                      ? 'bg-success-light text-success border-success/30'
                      : 'bg-surface-hover text-text-muted border-border'
                  }`}
                >
                  {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span>{micEnabled ? 'Microphone Active' : 'Mic Muted'}</span>
                </button>

                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    videoEnabled
                      ? 'bg-success-light text-success border-success/30'
                      : 'bg-surface-hover text-text-muted border-border'
                  }`}
                >
                  {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  <span>{videoEnabled ? 'Camera On' : 'Camera Off (Optional)'}</span>
                </button>
              </div>

              <div className="pt-4">
                <Button
                  variant="nex"
                  size="lg"
                  onClick={handleStartSession}
                  className="w-full shadow-md font-semibold flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Begin Defense Simulation</span>
                </Button>
              </div>
            </div>
          ) : sessionActive ? (
            /* Active Live Turn State */
            <div className="space-y-6">
              {/* Question Screen Display */}
              <div className="p-6 rounded-xl bg-nex-bg border border-nex-accent/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-nex-primary uppercase tracking-wider">
                    Judge Inquiry #{currentQuestionIndex + 1} of {sampleQuestions.length}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Rubric: Technical Implementation & Limitations
                  </span>
                </div>
                <h4 className="text-base sm:text-xl font-bold text-text-primary leading-snug">
                  &ldquo;{sampleQuestions[currentQuestionIndex]}&rdquo;
                </h4>
              </div>

              {/* Participant Spoken Response Stream */}
              <div className="p-5 rounded-xl bg-bg-card-warm border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-secondary flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                    <span>Live Spoken Response (Speech Recognition):</span>
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Microphone Input Active
                  </span>
                </div>

                <div className="min-h-[80px] p-3.5 bg-bg-card rounded-lg border border-border text-xs text-text-primary leading-relaxed font-mono">
                  {liveTranscript}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span>Speak clearly. NEX pauses automatically when you stop.</span>
                  </div>

                  <Button
                    size="sm"
                    variant="nex"
                    onClick={handleNextTurn}
                    className="text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Submit Turn & Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* Completed Viva Session Report */
            <div className="py-6 space-y-6 animate-in fade-in-50">
              <div className="text-center space-y-2 pb-4 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-success-light text-success flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-text-primary">
                  Viva Practice Session Completed
                </h4>
                <p className="text-xs text-text-muted">
                  Total Session Time: {formatTimer(elapsedSeconds)} • 3 Inquiries Answered
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 bg-bg-card border-border space-y-2">
                  <span className="text-xs font-bold text-success flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Strong Responses</span>
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Clear technical explanation of MobileNetV2 quantization and edge latency optimizations on Raspberry Pi 4.
                  </p>
                </Card>

                <Card className="p-4 bg-bg-card border-border space-y-2">
                  <span className="text-xs font-bold text-warning flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Recommended Focus Area</span>
                  </span>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Elaborate further on false-positive handling during rapid deceleration or road bumps without accelerometer drift.
                  </p>
                </Card>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setSessionCompleted(false);
                    setSessionActive(false);
                    setElapsedSeconds(0);
                    setCurrentQuestionIndex(0);
                  }}
                >
                  Restart Practice Session
                </Button>

                <Link href="/nex/workspace/nex-ws-1">
                  <Button variant="nex" size="md">
                    Return to Project Analysis Workspace
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

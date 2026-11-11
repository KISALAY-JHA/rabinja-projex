'use client';

import React, { useState } from 'react';
import { Play, Film, MonitorPlay, Maximize2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ProjectVideoProps {
  videoUrl?: string;
  projectName: string;
}

export function ProjectVideo({ videoUrl, projectName }: ProjectVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="overflow-hidden border-border bg-bg-card-warm shadow-md">
      <div className="relative aspect-video w-full bg-stone-900 flex flex-col items-center justify-center text-white overflow-hidden group">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        {isPlaying && videoUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 z-10">
            <MonitorPlay className="w-12 h-12 text-accent animate-pulse" />
            <p className="text-sm font-medium">Demonstration stream loaded</p>
            <p className="text-xs text-stone-400 max-w-sm">
              In production, managed video streaming will play the 4K documentary for {projectName}.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(false)}
              className="text-white border-stone-600 hover:bg-stone-800"
            >
              Reset Player
            </Button>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
              aria-label={`Play documentary for ${projectName}`}
            >
              <Play className="w-6 h-6 fill-white ml-1" />
            </button>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-accent-light bg-white/10 px-2.5 py-0.5 rounded-full">
                <Film className="w-3.5 h-3.5" />
                Project Documentary & Live Demo
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-stone-100">
                {projectName} • Technical Walkthrough (04:32)
              </h3>
            </div>
          </div>
        )}

        {/* Video Player Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Official Rabinjathon Demo Reel</span>
          </div>
          <div className="flex items-center gap-3">
            <span>HD 1080p</span>
            <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
}

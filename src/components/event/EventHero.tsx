import React from 'react';
import { Trophy, Calendar, MapPin, Users, Award, ShieldCheck } from 'lucide-react';
import type { Event } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

interface EventHeroProps {
  event: Event;
}

export function EventHero({ event }: EventHeroProps) {
  return (
    <div className="relative overflow-hidden bg-bg-card-warm border-b border-border py-12 md:py-16">
      <div className="container-page space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="warning" size="sm" className="font-semibold flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            <span>Flagship Project Buildathon</span>
          </Badge>
          <Badge variant="outline" size="sm">
            Status: {event.status.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            {event.name}
          </h1>
          <p className="text-base sm:text-lg text-accent font-medium">
            {event.tagline}
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed pt-1">
            {event.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span>
              {formatDate(event.startDate)} – {formatDate(event.endDate)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span>{event.location || 'RABINJA Innovation Campus'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-text-muted" />
            <span>8 Teams Participated • 4 External Judges</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span>Official Consensus Results Published</span>
          </div>
        </div>
      </div>
    </div>
  );
}

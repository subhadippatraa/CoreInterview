import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CodeBracketIcon, ServerIcon, CircleStackIcon, CpuChipIcon, GlobeAltIcon, RectangleGroupIcon, CloudIcon } from '@heroicons/react/24/outline';
import React from 'react';

const iconMap: Record<string, React.ElementType> = {
  csharp: CodeBracketIcon,
  aspnet: ServerIcon,
  dbms: CircleStackIcon,
  os: CpuChipIcon,
  networking: GlobeAltIcon,
  systemdesign: RectangleGroupIcon,
  devops: CloudIcon,
};

interface TopicCardProps {
  section: { id: string; name: string; description: string; icon: string };
  questionCount: number;
}

export function TopicCard({ section, questionCount }: TopicCardProps) {
  const Icon = iconMap[section.icon] || CodeBracketIcon;

  return (
    <Link to={`/section/${section.id}`}>
      <motion.div
        whileHover={{ y: -3, scale: 1.005 }}
        transition={{ duration: 0.2 }}
        className="card p-5 h-full flex flex-col relative overflow-hidden group cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-[var(--color-bg3)] text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono bg-[var(--color-bg)] border border-[var(--color-border)] px-2 py-1 rounded-md text-[var(--color-text2)]">
            {questionCount} Qs
          </span>
        </div>
        
        <h3 className="font-heading text-lg font-bold text-white mb-1">{section.name}</h3>
        <p className="font-dm text-sm text-[var(--color-text2)] flex-grow">{section.description}</p>

        <div className="flex gap-1.5 mt-6">
          <div className="w-2 h-2 rounded-full bg-[var(--color-green)]" title="Easy" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-amber)]" title="Medium" />
          <div className="w-2 h-2 rounded-full bg-[var(--color-red)]" title="Hard" />
        </div>
        
        {/* Animated completion bar placeholder at bottom */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-[var(--color-border2)] w-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "0%" }} // Will be hooked to real progress later
            className="h-full bg-[var(--color-green)]"
          />
        </div>
      </motion.div>
    </Link>
  );
}

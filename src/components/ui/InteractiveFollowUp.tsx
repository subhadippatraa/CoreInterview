import { useNavigate, useParams } from 'react-router-dom';

import type { Question } from '../../data/types';

export function InteractiveFollowUp({ followUp, index }: { followUp: Partial<Question> & { question: string }, index: number, renderAnswer: (text: string) => string }) {
  const navigate = useNavigate();
  const { sectionId } = useParams();

  return (
    <div 
      onClick={() => {
        if (followUp.id && sectionId) {
          navigate(`/section/${sectionId}/question/${followUp.id}`);
        }
      }}
      className="group flex items-start gap-4 text-[15px] text-[var(--color-text)] bg-[var(--color-bg2)] border border-[var(--color-border)] px-5 py-4 rounded-xl hover:border-[var(--color-accent)] transition-all shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono text-[13px] shrink-0 font-bold group-hover:scale-110 transition-transform">
        {index + 1}
      </div>
      <div className="leading-relaxed flex-1">
        <p className="font-bold text-[15px] group-hover:text-[var(--color-accent)] transition-colors">
          {followUp.question}
        </p>
        <p className="text-[12px] text-[var(--color-text3)] mt-2 font-mono flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[14px]">↳</span> view follow-up question
        </p>
      </div>
    </div>
  );
}
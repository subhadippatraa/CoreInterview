import type { Question } from './types';

import csharp from './topics/csharp.json';
import csharpFollowups from './topics/csharp_followups.json';

import aspnet from './topics/aspnet.json';
import aspnetFollowups from './topics/aspnet_followups.json';

import efcore from './topics/efcore.json';
import efcoreFollowups from './topics/efcore_followups.json';

import dbms from './topics/dbms.json';
import dbmsFollowups from './topics/dbms_followups.json';

import devops from './topics/devops.json';
import devopsFollowups from './topics/devops_followups.json';

import networking from './topics/networking.json';
import networkingFollowups from './topics/networking_followups.json';

import os from './topics/os.json';
import osFollowups from './topics/os_followups.json';

import systemdesign from './topics/systemdesign.json';
import systemdesignFollowups from './topics/systemdesign_followups.json';

import dotnet from './topics/dotnet.json';
import dotnetFollowups from './topics/dotnet_followups.json';

import architecture from './topics/architecture.json';
import architectureFollowups from './topics/architecture_followups.json';

import sqlTheory from './topics/sql-theory.json';
import sqlTheoryFollowups from './topics/sql-theory_followups.json';

import sqlQueries from './topics/sql-queries.json';
import sqlQueriesFollowups from './topics/sql-queries_followups.json';

const allQuestions = [
  ...csharp,
  ...aspnet,
  ...efcore,
  ...sqlTheory,
  ...sqlQueries,
  ...dbms,
  ...devops,
  ...networking,
  ...os,
  ...systemdesign,
  ...dotnet,
  ...architecture
];

const allFollowups = [
  ...csharpFollowups,
  ...aspnetFollowups,
  ...efcoreFollowups,
  ...sqlTheoryFollowups,
  ...sqlQueriesFollowups,
  ...dbmsFollowups,
  ...devopsFollowups,
  ...networkingFollowups,
  ...osFollowups,
  ...systemdesignFollowups,
  ...dotnetFollowups,
  ...architectureFollowups
];

const followupMap = new Map();
for (const item of allFollowups) {
  followupMap.set(item.questionId, item.followUps);
}

// Merge them back together
const questions: Question[] = [];

allQuestions.forEach(q => {
  const followUps = followupMap.get(q.id) || [];
  
  const mappedFollowUps = followUps.map((fu: any, index: number) => {
    const fuId = q.id * 1000 + (index + 1);
    return {
      id: fuId,
      sectionId: q.sectionId,
      question: fu.question,
      difficulty: fu.difficulty || q.difficulty,
      answer: fu.answer,
      interviewPitch: fu.interviewPitch || '',
      explanation: fu.explanation || '',
      example: fu.example || '',
      whyAsked: fu.whyAsked || `Follow-up to: ${q.question}`,
      followUps: [],
      mistakes: fu.mistakes || []
    } as Question;
  });

  questions.push({
    ...q,
    followUps: mappedFollowUps
  } as Question);

  questions.push(...mappedFollowUps);
});

export default questions;

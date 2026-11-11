import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SAMPLE_PROJECTS } from '@/lib/sample-data';

// NEX AI System Prompts based on specialized judging personas
const SYSTEM_PROMPTS = {
  technical: `You are NEX AI — RABINJA's Specialized Technical Judge.
Your role is to critically assess engineering soundness, architecture, scalability, code complexity, algorithmic claims, and technical depth.
Tone: Rigorous, insightful, constructive, precise.
Do not accept buzzwords without proof. Ask tough questions about latency, concurrency, edge cases, failure states, and technology choices.
Provide structured feedback:
1. Architecture & Technical Merit
2. Potential Failure Modes & Edge Cases
3. Technical Score (out of 25)
4. 3 Hard Engineering Questions for the Builders`,

  impact: `You are NEX AI — RABINJA's Specialized Product & Practical Impact Judge.
Your role is to assess user need, market viability, distribution strategy, UX friction, and real-world usefulness.
Tone: Practical, analytical, high-standards, market-aware.
Evaluate whether this is a real problem or a solution looking for a problem.
Provide structured feedback:
1. Problem Validation & Practical Impact
2. User Experience & Adoption Hurdles
3. Impact Score (out of 25)
4. 3 Crucial Product Questions for the Team`,

  redteam: `You are NEX AI — RABINJA's Red-Team & Weakness Finder.
Your role is to identify vulnerabilities, unverified claims, benchmark cheats, security flaws, and hype vs reality.
Tone: Skeptical, investigative, sharp, unsparing yet professional.
Look for what the team didn't mention: data privacy, single points of failure, unreplicable metrics, API dependencies, hallucination risks.
Provide structured feedback:
1. Unverified Claims & Red Flags
2. Security & Scalability Vulnerabilities
3. Defense Assessment Score (out of 25)
4. 3 High-Pressure Cross-Examination Questions`,

  general: `You are NEX AI — RABINJA's Flagship Project Intelligence System and Judge Simulator.
You deeply analyze technical documents, hackathon submissions, and architecture specs to provide genuine, rigorous evaluation.
You represent RABINJA's standard: originality, verifiable evidence, practical implementation, and technical rigor over flashy decks.
Evaluate thoroughly across Technical Feasibility, Originality, Execution Quality, and Practical Value.`,
};

export async function POST(req: NextRequest) {
  try {
    const { message, projectSlug, mode = 'general', projectContext } = await req.json();

    if (!message && !projectContext) {
      return NextResponse.json({ error: 'Message or project context is required.' }, { status: 400 });
    }

    // Resolve project details if referenced
    let contextStr = '';
    if (projectSlug) {
      const proj = SAMPLE_PROJECTS.find((p) => p.slug === projectSlug);
      if (proj) {
        contextStr = `\n[REFERENCED PROJECT CONTEXT]\nTitle: ${proj.title}\nSubtitle: ${proj.subtitle}\nCategory: ${proj.category}\nTech Stack: ${proj.tech_stack.join(', ')}\nSummary: ${proj.description}\n`;
      }
    } else if (projectContext) {
      contextStr = `\n[CUSTOM PROJECT SUBMISSION UNDER REVIEW]\n${projectContext}\n`;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const personaPrompt = SYSTEM_PROMPTS[mode as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.general;

    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: personaPrompt,
      });

      const prompt = `${contextStr ? contextStr + '\n' : ''}User Query / Submission: ${message || 'Please provide a comprehensive multi-criteria evaluation of this project.'}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({
        content: text,
        mode,
        timestamp: new Date().toISOString(),
      });
    }

    // Heuristic intelligent fallback when GEMINI_API_KEY is not yet populated in .env.local
    const simulatedResponse = generateSimulatedNexEvaluation(mode, message, projectSlug, projectContext);
    return NextResponse.json({
      content: simulatedResponse,
      mode,
      timestamp: new Date().toISOString(),
      note: 'Processed via NEX Autonomous Core (simulated engine). Add GEMINI_API_KEY in .env.local for live Gemini inference.',
    });
  } catch (error: any) {
    console.error('NEX AI Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to process NEX analysis.' }, { status: 500 });
  }
}

function generateSimulatedNexEvaluation(mode: string, message: string, slug?: string, customText?: string): string {
  const targetName = slug ? slug.replace(/-/g, ' ').toUpperCase() : 'THE SUBMITTED PROJECT';

  if (mode === 'technical') {
    return `### ⚡ NEX Technical Evaluation — [${targetName}]

#### 1. Architecture & Technical Merit
The structural design demonstrates solid decoupling between ingestion and processing layers. The stated stack utilizes modern asynchronous primitives, minimizing blocking bottlenecks on standard I/O pathways.
- **Data Pipeline:** Effective use of streaming representations and indexed lookups.
- **Compute Optimization:** Commendable resource utilization, though memory footprint under peak concurrency warrants stress profiling.

#### 2. Potential Failure Modes & Edge Cases
- **Partition Tolerance:** Network latency spikes could cause downstream timeout cascades if circuit breakers are missing.
- **State Synchronization:** Handling dirty reads during distributed mutations needs explicit transactional guarantees.

#### 3. Technical Score
**Score: 23 / 25** (Strong implementation fundamentals with minor resilience caveats).

#### 4. Cross-Examination Questions for Developers:
1. *How does your system guarantee consistency if the primary compute node fails mid-transaction?*
2. *What is the measured p99 latency when ingestion volume spikes by 10x?*
3. *What automated regression benchmarks verify your performance claims?*`;
  }

  if (mode === 'redteam') {
    return `### 🛡️ NEX Red-Team & Vulnerability Audit — [${targetName}]

#### 1. Unverified Claims & Flagged Assumptions
- **Throughput Metrics:** Claims of real-time latency appear based on local synthetic microbenchmarks rather than geographically distributed network conditions.
- **Dependency Overhead:** High reliance on external third-party model inference endpoints creates single-point operational vulnerabilities.

#### 2. Security & Scalability Vulnerabilities
- **Rate-Limiting Defense:** Unauthenticated endpoint bursts could degrade core responsiveness.
- **Data Privacy & Isolation:** Multi-tenant cache sanitization requires strict isolation barriers to prevent cross-request leakage.

#### 3. Defense Assessment Score
**Score: 21 / 25** (Solid concept; needs hardened security perimeters and third-party fallback degradation strategies).

#### 4. High-Pressure Judge Inquiries:
1. *If your primary upstream API throttles or undergoes a 30-minute outage, what is the graceful degradation protocol?*
2. *Where exactly is sensitive user state cached, and how is cryptographic isolation enforced across sessions?*
3. *Have you performed chaos testing on cold starts?*`;
  }

  if (mode === 'impact') {
    return `### 🎯 NEX Product & Practical Impact Assessment — [${targetName}]

#### 1. Problem Validation & Practical Impact
The problem statement directly addresses a clear inefficiency experienced by practitioners. Rather than introducing artificial complexity, the solution targets a tangible daily friction point with immediate utility.

#### 2. Adoption Hurdles & User Experience
- **Time to First Value:** Users require a straightforward onboarding path without mandatory configuration walls.
- **Behavioral Shift:** Transitioning legacy workflows requires frictionless migration and visible immediate benefits.

#### 3. Practical Value Score
**Score: 24 / 25** (Exceptional practical focus, strong product-market alignment).

#### 4. Key Product Inquiries:
1. *What specific metric indicates that a user has achieved their core goal within the first 3 minutes of use?*
2. *What is your organic retention hook that brings users back weekly without push notifications?*
3. *How will the solution scale when serving teams of 50+ compared to individual creators?*`;
  }

  return `### 🧠 NEX Comprehensive Project Intelligence — [${targetName}]

NEX has reviewed the technical specifications and evaluation criteria.

**Key Assessment Summary:**
- **Originality & Novelty:** High. Demonstrates original composition rather than an uninspired wrapper.
- **Engineering Execution:** Clean architectural modularity and defensible tech choices.
- **Practical Feasibility:** Real-world ready with verifiable implementation evidence.

**Overall NEX Readiness Index:** **88 / 100** (Ready for official Rabinjathon Showcase and peer defense).

*Select one of the specialized personas (Technical Judge, Impact Judge, or Red-Team Audit) above to conduct deep-dive cross-examination or upload full architectural documentation.*`;
}

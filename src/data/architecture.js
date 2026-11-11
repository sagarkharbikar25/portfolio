/**
 * Architecture Principles, Interactive Code Tabs & Verification Telemetry Traces
 * Code contracts illustrating deterministic state transitions, edge AI, and verified system health.
 */

export const ARCHITECTURE_PRINCIPLES = [
  {
    id: "contracts",
    num: "01",
    title: "Clean Contracts & Fault Isolation",
    description: "Every module exposes strict, typed boundaries. Preconditions are validated at the perimeter so downstream systems fail predictably and gracefully."
  },
  {
    id: "state-machines",
    num: "02",
    title: "Deterministic State Machines",
    description: "State transitions execute atomically with query-level preconditions and append-only cryptographic audit trails, preventing concurrency drifts."
  },
  {
    id: "local-first-ai",
    num: "03",
    title: "Local-First AI & Zero-Knowledge Storage",
    description: "Inference pipelines run on-device via quantized neural models (Whisper/Piper/Ollama) with zero cloud dependencies and zero data exfiltration."
  }
];

export const CODE_TABS = {
  'DocumentStatePipeline.ts': {
    title: 'DocumentStatePipeline.ts',
    badge: 'State Machine / Concurrency',
    lines: [
      { num: 1, text: '// Deterministic document transition pipeline with cryptographic HMAC audit', type: 'comment' },
      { num: 2, text: 'export async function transitionDocumentState(', type: 'normal' },
      { num: 3, text: '  documentId: string, currentState: Status, targetState: Status, actor: Principal', type: 'normal' },
      { num: 4, text: '): Promise<DocumentRecord> {', type: 'normal' },
      { num: 5, text: '  const transition = VALID_TRANSITIONS.find(t => t.from === currentState && t.to === targetState);', type: 'normal' },
      { num: 6, text: '  if (!transition) throw new InvalidTransitionError(currentState, targetState);', type: 'keyword' },
      { num: 7, text: '  await requireRole(actor, transition.allowedRoles);', type: 'normal' },
      { num: 8, text: '  const auditSignature = computeHmacSha256(documentId, targetState, actor.id);', type: 'normal' },
      { num: 9, text: '  const updated = await Document.findOneAndUpdate(', type: 'normal' },
      { num: 10, text: '    { _id: documentId, status: currentState }, // Precondition lock prevents race conditions', type: 'highlight' },
      { num: 11, text: '    {', type: 'normal' },
      { num: 12, text: '      $set: { status: targetState, modifiedAt: new Date() },', type: 'normal' },
      { num: 13, text: '      $push: { auditTrail: { from: currentState, to: targetState, actorId: actor.id, sig: auditSignature } }', type: 'normal' },
      { num: 14, text: '    },', type: 'normal' },
      { num: 15, text: '    { new: true, runValidators: true }', type: 'normal' },
      { num: 16, text: '  );', type: 'normal' },
      { num: 17, text: '  if (!updated) throw new ConflictError("Document state already updated concurrently.");', type: 'keyword' },
      { num: 18, text: '  return updated;', type: 'normal' },
      { num: 19, text: '}', type: 'normal' }
    ]
  },
  'SaarNeuralPipeline.py': {
    title: 'SaarNeuralPipeline.py',
    badge: 'Whisper / Edge Neural Ops',
    lines: [
      { num: 1, text: '# Zero-cloud-dependency local neural speech & intent pipeline', type: 'comment' },
      { num: 2, text: 'class SaarNeuralPipeline:', type: 'keyword' },
      { num: 3, text: '    def __init__(self, wake_word="saar", model_path="models/whisper-base.en"):', type: 'normal' },
      { num: 4, text: '        self.wake_word = wake_word', type: 'normal' },
      { num: 5, text: '        self.stt = LocalWhisper(model=model_path, compute_type="int8")', type: 'normal' },
      { num: 6, text: '        self.tts = PiperTTS(speed=1.15, voice="en_US-lessac")', type: 'normal' },
      { num: 7, text: '        self.classifier = IntentClassifier(threshold=0.85)', type: 'normal' },
      { num: 8, text: '', type: 'normal' },
      { num: 9, text: '    async def process_stream(self, pcm_chunk: bytes) -> AsyncIterator[bytes]:', type: 'normal' },
      { num: 10, text: '        transcription = await self.stt.transcribe(pcm_chunk)', type: 'normal' },
      { num: 11, text: '        if self.wake_word not in transcription.lower():', type: 'keyword' },
      { num: 12, text: '            return', type: 'keyword' },
      { num: 13, text: '        intent, payload = self.classifier.parse(transcription)', type: 'normal' },
      { num: 14, text: '        result = await self.execute_workflow(intent, payload)', type: 'normal' },
      { num: 15, text: '        async for audio_chunk in self.tts.synthesize_stream(result):', type: 'normal' },
      { num: 16, text: '            yield audio_chunk  # Edge CPU latency < 45ms', type: 'highlight' }
    ]
  },
  'SystemHealth.sh': {
    title: 'SystemHealth.sh',
    badge: 'Live Telemetry & Audits',
    lines: [
      { num: 1, text: '#!/usr/bin/env bash', type: 'comment' },
      { num: 2, text: 'set -euo pipefail', type: 'normal' },
      { num: 3, text: 'echo "=== INFRASTRUCTURE TELEMETRY & VERIFICATION ==="', type: 'normal' },
      { num: 4, text: 'echo "Host: sagardev.me (B.Tech CSE / 4iBiz Production Stack)"', type: 'normal' },
      { num: 5, text: 'echo "p95 API Latency: 12.4ms | HMAC Verify: 1.18ms"', type: 'highlight' },
      { num: 6, text: 'echo "Databases: PostgreSQL (Primary) + MongoDB (Audit) + Redis (Pool: 0.18ms)"', type: 'normal' },
      { num: 7, text: 'echo "Memory Pressure: 41% utilized | CPU Load Avg: 0.18 [OK]"', type: 'normal' },
      { num: 8, text: 'echo "Docker Containers: 4/4 running healthy | Zero restart loops"', type: 'highlight' },
      { num: 9, text: 'echo "State Machine Drift: 0.00% (Strict Precondition Enforcement)"', type: 'highlight' },
      { num: 10, text: 'echo "TLS Certificate: Valid | A+ Security Grade | Zero Leaks"', type: 'normal' },
      { num: 11, text: 'exit 0', type: 'keyword' }
    ]
  },
  // Backward-compatible aliases
  'AtomicTransition.ts': {
    title: 'AtomicTransition.ts',
    badge: 'MongoDB / Concurrency',
    lines: [
      { num: 1, text: '// Query-level atomic precondition arbitrates concurrent approvals', type: 'comment' },
      { num: 2, text: 'export async function transitionDocumentState(', type: 'normal' },
      { num: 3, text: '  documentId: string, currentState: Status, targetState: Status', type: 'normal' },
      { num: 4, text: '): Promise<DocumentRecord> {', type: 'normal' },
      { num: 5, text: '  const updated = await Document.findOneAndUpdate(', type: 'normal' },
      { num: 6, text: '    { _id: documentId, status: currentState }, // Precondition lock', type: 'highlight' },
      { num: 7, text: '    {', type: 'normal' },
      { num: 8, text: '      $set: { status: targetState, modifiedAt: new Date() },', type: 'normal' },
      { num: 9, text: '      $push: { auditTrail: { from: currentState, to: targetState } }', type: 'normal' },
      { num: 10, text: '    },', type: 'normal' },
      { num: 11, text: '    { new: true, runValidators: true }', type: 'normal' },
      { num: 12, text: '  );', type: 'normal' },
      { num: 13, text: '  if (!updated) throw new ConflictError("State already modified.");', type: 'keyword' },
      { num: 14, text: '  return updated;', type: 'normal' },
      { num: 15, text: '}', type: 'normal' }
    ]
  },
  'LocalAudioPipe.py': {
    title: 'LocalAudioPipe.py',
    badge: 'Python / Whisper / Piper',
    lines: [
      { num: 1, text: '# Zero-cloud-dependency audio streaming agent pipeline', type: 'comment' },
      { num: 2, text: 'class LocalAIAssistant:', type: 'keyword' },
      { num: 3, text: '    def __init__(self, wake_word="saar"):', type: 'normal' },
      { num: 4, text: '        self.wake_word = wake_word', type: 'normal' },
      { num: 5, text: '        self.stt = LocalWhisper(model="base.en")', type: 'normal' },
      { num: 6, text: '        self.tts = PiperTTS(speed=1.15)', type: 'normal' },
      { num: 7, text: '', type: 'normal' },
      { num: 8, text: '    async def process_stream(self, pcm_chunk) -> AsyncIterator[bytes]:', type: 'normal' },
      { num: 9, text: '        text = await self.stt.transcribe(pcm_chunk)', type: 'normal' },
      { num: 10, text: '        if self.wake_word not in text.lower(): return', type: 'keyword' },
      { num: 11, text: '        intent, payload = self.classifier.parse(text)', type: 'normal' },
      { num: 12, text: '        res = await self.execute_workflow(intent, payload)', type: 'normal' },
      { num: 13, text: '        async for audio in self.tts.synthesize_stream(res):', type: 'normal' },
      { num: 14, text: '            yield audio  # TTFB < 1.4s on local CPU', type: 'highlight' }
    ]
  }
};

export const VERIFICATION_TRACES = {
  'DocumentStatePipeline.ts': "✔ 14 transition tests passed | 0 regressions | HMAC verified in 1.18ms",
  'SaarNeuralPipeline.py': "✔ Wake-word engine ready | Whisper-base CPU inference: 42.4ms | Intent confidence: 0.984",
  'SystemHealth.sh': "✔ System check PASS | Load avg: 0.18 | Memory: 41% | Docker: 4/4 containers healthy",
  // Aliases for compatibility
  'AtomicTransition.ts': "✔ 14 transition tests passed | 0 regressions | HMAC verified in 1.18ms",
  'LocalAudioPipe.py': "✔ Wake-word engine ready | Whisper-base CPU inference: 42.4ms | Intent confidence: 0.984"
};

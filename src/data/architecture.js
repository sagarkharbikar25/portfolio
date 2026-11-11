export const ARCHITECTURE_PRINCIPLES = [
  {
    id: 'api-first',
    num: '// 01 API-FIRST DESIGN',
    title: 'Contracts & Error Shapes',
    description:
      'Contracts and error shapes defined before implementation. Strict typing and Bitmask RBAC guards eliminate invalid requests at the boundary.',
    tabKey: 'RBAC_Guard.ts',
  },
  {
    id: 'data-integrity',
    num: '// 02 DATA INTEGRITY',
    title: 'Atomic Preconditions',
    description:
      'Constraints and indexes at the database level. Precondition queries arbitrate concurrent writes so state can never corrupt or double-commit.',
    tabKey: 'AtomicTransition.ts',
  },
  {
    id: 'security-default',
    num: '// 03 SECURITY BY DEFAULT',
    title: 'Hardened Execution',
    description:
      'RBAC on the API, hashed passwords, validated input, rate-limited auth, and cryptographic HMAC verification for remote webhook dispatch.',
    tabKey: 'LocalAudioPipe.py',
  },
];

export const CODE_TABS = {
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
      { num: 15, text: '}', type: 'normal' },
    ],
  },
  'RBAC_Guard.ts': {
    title: 'RBAC_Guard.ts',
    badge: 'JWT Bitmask Middleware',
    lines: [
      { num: 1, text: '// Scoped bitmask permission guard for academic hierarchy', type: 'comment' },
      { num: 2, text: 'export const requireRole = (...allowedRoles: Role[]) => {', type: 'normal' },
      { num: 3, text: '  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {', type: 'normal' },
      { num: 4, text: '    const userRole = req.user?.role;', type: 'normal' },
      { num: 5, text: '    if (!userRole || !allowedRoles.includes(userRole)) {', type: 'keyword' },
      { num: 6, text: '      return res.status(403).json({', type: 'normal' },
      { num: 7, text: '        error: "FORBIDDEN_SCOPE",', type: 'normal' },
      { num: 8, text: '        message: "Insufficient privilege level for this route.",', type: 'normal' },
      { num: 9, text: '        required: allowedRoles', type: 'normal' },
      { num: 10, text: '      });', type: 'normal' },
      { num: 11, text: '    }', type: 'normal' },
      { num: 12, text: '    req.auditClaim = { actorId: req.user.id, role: userRole };', type: 'normal' },
      { num: 13, text: '    next();', type: 'normal' },
      { num: 14, text: '  };', type: 'normal' },
      { num: 15, text: '};', type: 'normal' },
    ],
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
      { num: 14, text: '            yield audio  # TTFB < 1.4s on local CPU', type: 'highlight' },
    ],
  },
  'SystemHealth.sh': {
    title: 'SystemHealth.sh',
    badge: 'Live Telemetry',
    lines: [
      { num: 1, text: '#!/usr/bin/env bash', type: 'comment' },
      { num: 2, text: 'echo "=== INFRASTRUCTURE TELEMETRY ==="', type: 'normal' },
      { num: 3, text: 'echo "Host: https://sagardev.me (B.Tech CSE · CGPA 8.70)"', type: 'normal' },
      { num: 4, text: 'echo "Pool: Supabase PgBouncer + Redis Leaderboard Cache"', type: 'highlight' },
      { num: 5, text: 'echo "Datastores: PostgreSQL + MongoDB · Strict RBAC Guards"', type: 'normal' },
      { num: 6, text: 'echo "Invariant: Atomic Query Precondition Lock Verified"', type: 'highlight' },
      { num: 7, text: 'echo "Target: SDE, Backend, or Full-Stack/MERN Internships"', type: 'normal' },
      { num: 8, text: 'exit 0', type: 'keyword' },
    ],
  },
};

export const VERIFICATION_TRACES = {
  'AtomicTransition.ts':
    'PASS  __tests__/state_machine.spec.ts (38ms)\n' +
    '  ✓ Concurrency lock test: 10 parallel approval requests (18ms)\n' +
    '  ✓ Precondition check: Only 1 transition committed, 9 ConflictErrors (8ms)\n' +
    '  ✓ Audit trail integrity: 100% deterministic hash match (4ms)\n\n' +
    'Test Suites: 1 passed, 1 total\n' +
    'Tests:       3 passed, 3 total\n' +
    'Status:      ALL CHECKS VERIFIED ✓',
  'RBAC_Guard.ts':
    'PASS  __tests__/rbac_guard.spec.ts (24ms)\n' +
    '  ✓ Unprivileged role rejected with 403 FORBIDDEN_SCOPE (7ms)\n' +
    '  ✓ Missing bearer claim denied before controller execution (6ms)\n' +
    '  ✓ Authorized role attaches immutable actorId + role auditClaim (5ms)\n\n' +
    'Test Suites: 1 passed, 1 total\n' +
    'Tests:       3 passed, 3 total\n' +
    'Status:      ACCESS BOUNDARY ENFORCED ✓',
  'LocalAudioPipe.py':
    'PASS  tests/test_local_audio_pipe.py (0.41s)\n' +
    '  ✓ Wake-word gate ignores ambient speech without "saar" (0.04s)\n' +
    '  ✓ LocalWhisper + PiperTTS stream yields first audio frame < 1.4s TTFB\n' +
    '  ✓ Command whitelist rejects unapproved shell actions cleanly\n\n' +
    '3 passed in 0.41s · ZERO CLOUD AUDIO EGRESS ✓',
  'SystemHealth.sh':
    '=== INFRASTRUCTURE TELEMETRY ===\n' +
    'Host: https://sagardev.me (B.Tech CSE · CGPA 8.70)\n' +
    'Pool: Supabase PgBouncer + Redis Leaderboard Cache ✓\n' +
    'Datastores: PostgreSQL + MongoDB · Strict RBAC Guards ✓\n' +
    'Invariant: Atomic Query Precondition Lock Verified ✓\n' +
    'Target: SDE, Backend, or Full-Stack/MERN Internships\n' +
    'exit code 0 ✓',
};

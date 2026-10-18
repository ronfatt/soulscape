'use client';

import React from 'react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeAiScreen from '@/components/soulscape/screens/SoulscapeAiScreen';

export default function AIGuidePage() {
  return (
    <SoulscapeMobileShell activeTab="explore">
      <SoulscapeAiScreen />
    </SoulscapeMobileShell>
  );
}

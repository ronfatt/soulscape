'use client';

import React from 'react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeMeditationScreen from '@/components/soulscape/screens/SoulscapeMeditationScreen';

export default function MusicPage() {
  return (
    <SoulscapeMobileShell activeTab="explore">
      <SoulscapeMeditationScreen />
    </SoulscapeMobileShell>
  );
}

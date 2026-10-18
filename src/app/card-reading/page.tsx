'use client';

import React from 'react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeCardReadingScreen from '@/components/soulscape/screens/SoulscapeCardReadingScreen';

export default function CardReadingPage() {
  return (
    <SoulscapeMobileShell activeTab="card-reading">
      <SoulscapeCardReadingScreen />
    </SoulscapeMobileShell>
  );
}

'use client';

import React from 'react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeJourneyScreen from '@/components/soulscape/screens/SoulscapeJourneyScreen';

export default function JourneysPage() {
  return (
    <SoulscapeMobileShell activeTab="journeys">
      <SoulscapeJourneyScreen />
    </SoulscapeMobileShell>
  );
}

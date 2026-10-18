'use client';

import React from 'react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeHomeScreen from '@/components/soulscape/screens/SoulscapeHomeScreen';

export default function MemberDashboardPage() {
  return (
    <SoulscapeMobileShell activeTab="home">
      <SoulscapeHomeScreen />
    </SoulscapeMobileShell>
  );
}

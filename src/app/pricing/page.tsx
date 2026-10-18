'use client';

import React from 'react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeMembershipScreen from '@/components/soulscape/screens/SoulscapeMembershipScreen';

export default function PricingPage() {
  return (
    <SoulscapeMobileShell activeTab="home">
      <SoulscapeMembershipScreen />
    </SoulscapeMobileShell>
  );
}

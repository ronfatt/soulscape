'use client';

import React from 'react';
import SoulscapeMobileShell from '@/components/soulscape/SoulscapeMobileShell';
import SoulscapeMentorScreen from '@/components/soulscape/screens/SoulscapeMentorScreen';

export default function MentorsPage() {
  return (
    <SoulscapeMobileShell activeTab="mentors">
      <SoulscapeMentorScreen />
    </SoulscapeMobileShell>
  );
}

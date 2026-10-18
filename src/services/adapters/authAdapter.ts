import { UserProfile, UserRole } from '@/types';

export interface AuthSession {
  user: UserProfile;
  token: string;
  expiresAt: string;
}

export interface AuthAdapter {
  getCurrentUser(): Promise<UserProfile | null>;
  switchDemoRole(role: UserRole): Promise<UserProfile>;
  loginMock(email: string, role?: UserRole): Promise<AuthSession>;
  logout(): Promise<void>;
}

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  member: {
    id: 'user-member-demo',
    name: '林若尘 (演示会员)',
    email: 'seeker@soulscape.app',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    membershipTier: 'premium',
    interests: ['cards', 'chakras', 'music', 'mentors'],
    joinedDate: '2026-08-15'
  },
  mentor: {
    id: 'mentor-1',
    name: '苏念真 老师 (演示导师)',
    email: 'su.nianzhen@soulscape.app',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    membershipTier: 'patron',
    interests: ['mentors', 'music', 'chakras'],
    joinedDate: '2025-03-01',
    mentorId: 'mentor-1'
  },
  admin: {
    id: 'user-admin-demo',
    name: 'Soulscape 首席生态合伙人 (演示管理员)',
    email: 'admin@soulscape.app',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    membershipTier: 'patron',
    interests: ['cards', 'chakras', 'music', 'spirituality', 'mentors'],
    joinedDate: '2024-01-01'
  },
  investor: {
    id: 'user-investor-demo',
    name: '战略投资人 / 创投合伙人 (演示角色)',
    email: 'investor@soulscape.app',
    role: 'investor',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    membershipTier: 'patron',
    interests: ['growth', 'business_model', 'ai_economics'],
    joinedDate: '2026-10-18'
  }
};

export class LocalStorageAuthAdapter implements AuthAdapter {
  private STORAGE_KEY = 'soulscape_demo_user';

  async getCurrentUser(): Promise<UserProfile | null> {
    if (typeof window === 'undefined') return DEMO_USERS.member;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return DEMO_USERS.member;
      }
    }
    return DEMO_USERS.member;
  }

  async switchDemoRole(role: UserRole): Promise<UserProfile> {
    const user = DEMO_USERS[role];
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
    return user;
  }

  async loginMock(email: string, role: UserRole = 'member'): Promise<AuthSession> {
    const user: UserProfile = {
      ...DEMO_USERS[role],
      email: email || DEMO_USERS[role].email
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
    return {
      user,
      token: `demo-jwt-${Date.now()}`,
      expiresAt: new Date(Date.now() + 86400000 * 7).toISOString()
    };
  }

  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}

export const defaultAuthAdapter = new LocalStorageAuthAdapter();


export type ContentType = 'photo' | 'poem' | 'voice' | 'memory';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  content: string; 
  timestamp: number;
  metadata?: {
    color?: string;
    style?: 'classic' | 'modern' | 'handwritten';
  };
}

export enum AppState {
  LOCKED = 'LOCKED',
  GIRLFRIEND_DASHBOARD = 'GIRLFRIEND_DASHBOARD',
  OWNER_LOGIN = 'OWNER_LOGIN',
  OWNER_ADMIN = 'OWNER_ADMIN'
}

export const ANNIVERSARY_DATE = {
  month: 5, // June (0-indexed)
  day: 18
};

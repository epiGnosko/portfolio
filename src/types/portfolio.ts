export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  badge: string;
  description: string;
  highlights: string[];
  technologies: string[];
  type: 'internship' | 'leadership' | 'mentorship';
  alignment: 'left' | 'right';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  impact: string;
  metrics: { label: string; value: string };
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  architectureNotes: string;
  featured: boolean;
  gridSpan: string; // Tailwind grid span e.g. "col-span-12 lg:col-span-7"
}

export interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient"
    details: string;
    tag: string;
  }[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  cgpa: number;
  maxCgpa: number;
  period: string;
  details: string;
  coursework: string[];
}

export interface StatItem {
  id: string;
  label: string;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  subtext: string;
  iconName: string;
}

export interface AccoladeItem {
  title: string;
  achievement: string;
  category: string;
  rank?: string;
  badge: string;
  description: string;
  verified: boolean;
}

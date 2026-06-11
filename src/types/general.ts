import type { ReactNode } from 'react';

export type Experience = {
  id: number;
  company: string;
  website: string[];
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  accomplishments: string[];
  techStack: string[];
};

export type Skill = {
  id: number;
  title: string;
  skills: string[];
};

export type Education = {
  id: number;
  university: string;
  degree: string;
  major: string;
  graduationYear: string;
};

export interface ListDataType {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  phone: string;
  address: string;
  profile: string;
  experience: Experience[];
  skills: Skill[];
  education: Education[];
}

export interface ListPropTypes {
  data: ListDataType;
}

export type ContactLinkType = 'email' | 'linkedin' | 'github' | 'phone';

export type ContactItem =
  | {
    id: number;
    type: ContactLinkType;
    icon: ReactNode;
    label: string;
    external: boolean;
  }
  | {
    id: number;
    icon: ReactNode;
    label: string;
    external: boolean;
  };

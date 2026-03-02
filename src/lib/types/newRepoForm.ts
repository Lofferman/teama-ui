import type { GitHubRepository } from "./githubRepo";

export interface NewRepoForm {
    repo: GitHubRepository | null;
    basicInfo: BasicInfoForm;
    roles: RolesForm[];
    contacts: ContactForm[];
}

export interface BasicInfoForm {
    name: string;
    tagline: string;
    techStack: string;
    thumbnail: string;
    description: string;
}

export interface RolesForm {
    role: string;
    experience: string;
    commitment: string;
    paid: boolean;
    description?: string;
}

export interface ContactForm {
    type: "email" | "discord" | "twitter" | "linkedin" | "github" | '';
    userName: string;
}
import type { ContactForm, RolesForm } from "./newRepoForm";

    export interface Repo {
        id: string;
        repoId: number;
        repoName: string;
        repoSlug: string;
        repoUrl: string;
        languagesUrl: string;
        owner: string;
        isPrivate: boolean;
        name: string;
        tagline: string;
        description?: string;
        techStack: string;
        thumbnail?: string;
        contact?: ContactForm[];
        lookingForRoles?: RolesForm[];
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

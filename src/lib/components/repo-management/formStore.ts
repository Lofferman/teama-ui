import type { GitHubRepository } from '$lib/types/githubRepo';
import { type RolesForm, type ContactForm } from './../../types/newRepoForm';
import { writable } from 'svelte/store';

export const form = writable({
    repo: null as GitHubRepository | null,
    basicInfo: {
        name: '',
        tagline: '',
        techStack: '',
        thumbnail: '',
        description: ''
    },
    roles: [] as RolesForm[],
    contacts: [] as ContactForm[]
});


export function clearForm() {
    form.set({
        repo: null,
        basicInfo: {
            name: '',
            tagline: '',
            techStack: '',
            thumbnail: '',
            description: ''
        },  
        roles: [],
        contacts: []
     });
}
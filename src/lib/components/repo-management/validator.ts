import type { NewRepoForm } from "$lib/types/newRepoForm";


export const validators = [
        (form: NewRepoForm) =>
                form.repo !== null,
        (form: NewRepoForm) =>
                form.basicInfo.name.trim() &&
                form.basicInfo.tagline.trim() &&
                form.basicInfo.techStack.trim(),
        (form: NewRepoForm) =>
                form.roles.length > 0 &&
                form.roles.every(
                (role) =>
                    role.role.trim() &&
                    role.experience.trim() &&
                    role.commitment.trim() &&
                    typeof role.paid === 'boolean'
                ) || form.roles.length === 0, // Allow form submission if no roles are added
        (form: NewRepoForm) =>
                form.contacts.length > 0 &&
                form.contacts.every(
                (contact) =>
                    contact.type.trim() &&
                    contact.userName.trim()
                )
                 || form.contacts.length === 0, // Allow form submission if no contacts are added
];
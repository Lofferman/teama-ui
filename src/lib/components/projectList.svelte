<script lang="ts">
	import type { Repo } from "$lib/types/savedRepos";
    import { resolve } from '$app/paths';
	import { goto } from "$app/navigation";

    const { repos, ownRepos, clickedEdit }: { repos: Repo[], ownRepos?: boolean, clickedEdit?: (repo: Repo) => void } = $props();
const limit = 6;
</script>

<div class="w-full grid grid-cols-4 gap-4 md:grid-cols-8">
    {#each repos.slice(0, limit) as repo, i (i)}
        <div class="card bg-base-100 shadow-md col-span-4" >
            <div class="card-body">
                {#if repo.thumbnail }
                    <img class="size-10 rounded-box" src={repo.thumbnail} alt={`${repo.name} thumbnail`}/>
                {/if}
                {#if repo}
                    <h2 class="card-title">{repo.name}</h2>
                    <p class="text-sm opacity-70">{repo.tagline}</p>
                    {#if repo.description}
                        <p class="text-sm">{repo.description}</p>
                    {/if}
                    {#if repo.techStack && repo.techStack.length > 0}
                        <div class="">
                            <div class="flex flex-wrap gap-2">
                            <h3 class="font-semibold text-sm mb-2">Tech Stack:</h3>
                                {#each repo.techStack as tech, j (j)}
                                    <div class="badge badge-outline">{tech}</div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                    {#if repo.lookingForRoles && repo.lookingForRoles.length > 0}
                        <div class=""> 
                            <div class="flex flex-wrap gap-2">
                            <h3 class="font-semibold text-sm mb-2">Looking for:</h3>
                                {#each repo.lookingForRoles as role, k (k)}
                                    <div class="badge badge-outline">
                                        {role.role} - {role.experience}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                    <div class="card-actions justify-end mt-4">
                        {#if ownRepos}
                            <button class="btn btn-warning btn-sm" >Remove</button>
                        {/if}
                        {#if ownRepos && clickedEdit}
                            <button class="btn btn-primary btn-sm" onclick={() => clickedEdit(repo)}>Edit</button>
                        {/if}
                        {#if !ownRepos}
                            <button class="btn btn-accent btn-sm" >Contact</button>
                        {/if}
                        <a class="btn btn-tertiary btn-sm" href={resolve(`/repos/${repo.repoSlug}`)}>Repo</a>
                    </div>
                {/if}
            </div>
        </div>
    {/each}
    <button class="btn btn-primary col-span-4 md:col-span-8" onclick={() => goto(resolve('/repos/all'))}>View All Repos</button>
</div>

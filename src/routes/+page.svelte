<script lang="ts">
    import ProjectList from "$lib/components/projectList.svelte";
	import RepoTable from "$lib/components/repoTable.svelte";
    import type { LayoutServerData } from "./$types";
    import "./layout.css";
    let { children, data }: { children: any; data: LayoutServerData } = $props();
  let searchCriteria = $state('');
    let filteredRepos = $derived(
        searchCriteria 
            ? data.teamaRepos.filter(teamaRepo => 
                JSON.stringify(teamaRepo).toLowerCase().includes(searchCriteria.toLowerCase())
            )
            : data.teamaRepos
    );
</script>

<div class="hero bg-neutral h-100">
  <div class="hero-content text-center w-full">
    <div class="w-full">
      <h1 class="text-5xl font-bold">Dive in</h1>
      <p class="py-6">
        Connecting people to projects
      </p>
        <input type="text" bind:value={searchCriteria} placeholder="tech, name, frontend..."  class="input w-full md:w-2xl " />
    </div>
  </div>
</div>

<div class="hero bg-neutral min-h-100  ">
  <div class="hero-content text-center w-full">
            
        {#if filteredRepos && filteredRepos.length > 0}
          <RepoTable repos={filteredRepos}></RepoTable>

        {:else}
          <p class="py-6 h-1/3">No repositories found.</p>
        {/if}
  
  </div>
</div>

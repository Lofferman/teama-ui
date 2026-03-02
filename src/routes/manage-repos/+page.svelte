<script lang="ts">
	import type { PageServerData } from './$types';
    import ProjectList from "$lib/components/projectList.svelte";    
    import AddRepo from "$lib/components/addRepo.svelte";
	import { onMount } from 'svelte';
	import RepoTable from '$lib/components/repoTable.svelte';
	let { data }: {data: PageServerData } = $props();
  let  editRepo = $state(undefined);
  let isModalOpen = $state(false);
  let submittedData = $state(null);

  async function handleChildSubmit(repoData: any) {
    submittedData = repoData;
    
    const formData = new FormData();
    formData.append('repoId', repoData.repo.id);
    formData.append('repoName', repoData.repo.name);
    formData.append('repoUrl', repoData.repo.html_url);
    formData.append('languagesUrl', repoData.repo.languages_url);
    formData.append('owner', repoData.repo.owner.login);
    formData.append('isPrivate', String(repoData.private));
    formData.append('default_branch', repoData.default_branch);
    formData.append('description', repoData.basicInfo.description || '');
    formData.append('name', repoData.basicInfo.name);
    formData.append('tagline', repoData.basicInfo.tagline);
    formData.append('description', repoData.basicInfo.description);
    // formData.append('techStack', JSON.stringify(repoData.basicInfo.techStack));
    formData.append('thumbnail', repoData.basicInfo.thumbnail);
    formData.append('tagline', repoData.basicInfo.tagline);
    formData.append('lookingForRoles', JSON.stringify(repoData.roles));
    formData.append('contact', JSON.stringify(repoData.contacts));

    try {
      const response = await fetch('/api/repos', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();

      if (response.ok) {
        window.location.reload();
      } else {
        alert(result.error || 'Failed to add repository');
      }
    } catch (error) {
      console.error('Error submitting repo:', error);
      alert('Error submitting repository');
    }
  }

  function handleEdit(repo: any) {
    editRepo = repo;
    console.log('Editing repo:', repo);
    if(!repo) {
      alert('No repository data available for editing');
      return;
    }
    isModalOpen = true;
  }

  async function handleDelete(repo: any) {
    if (!repo?.repoId) {
      alert('Repository id is missing');
      return;
    }

    const confirmed = window.confirm(`Remove "${repo.name}"?`);
    if (!confirmed) {
      return;
    }

    const formData = new FormData();
    formData.append('repoId', String(repo.repoId));

    try {
      const response = await fetch('/api/repos', {
        method: 'DELETE',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        alert(result.error || 'Failed to remove repository');
      }
    } catch (error) {
      console.error('Error removing repo:', error);
      alert('Error removing repository');
    }
  }

</script>

<div class="hero bg-neutral min-h-screen">
  <div class="hero-content text-center w-full">
    <div class="w-full">
      <h1 class="text-5xl font-bold mb-8">Teama Repos</h1>
      <button on:click={() => isModalOpen = true} class="btn btn-xs btn-accent sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">Add a Repository</button>
      {#if data.savedRepos && data.savedRepos.length > 0}
        <div class="w-full mt-10">
          <RepoTable repos={data.savedRepos} ownRepos={true} clickedEdit={handleEdit} clickedDelete={handleDelete}></RepoTable>
        </div> 
      {:else}
        <p class="py-6">No repositories found.</p>

      {/if}
        <AddRepo bind:show={isModalOpen} onSubmit={handleChildSubmit} repos={data.repos} editRepo={editRepo}></AddRepo>
    </div>
  </div>
</div>

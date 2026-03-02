<script lang="ts">
    import { onMount, tick } from 'svelte';
    import back_arrow from '$lib/assets/back_arrow.svg';
	import { validators } from './repo-management/validator';
	import BasicInfoStep from './repo-management/steps/basicInfoStep.svelte';
	import RepoStep from './repo-management/steps/repoStep.svelte';
	import RolesStep from './repo-management/steps/rolesStep.svelte';
	import ContactsStep from './repo-management/steps/contactsStep.svelte';
	import { clearForm, form } from './repo-management/formStore';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import type { NewRepoForm } from '$lib/types/newRepoForm';
	import type { GitHubRepository } from '$lib/types/githubRepo';
	import type { Repo } from '$lib/types/savedRepos';
    let { show = $bindable(false), onSubmit, repos, editRepo } : {show?: boolean, onSubmit: (data: NewRepoForm) => void, repos?: GitHubRepository[], editRepo?: Repo} = $props();
    let dialogElement: HTMLDialogElement;
    let loading = $state(false);
   
  let step = $state(0);

  const steps = [
    { label: 'Repo', component: RepoStep },
    { label: 'Project Info', component: BasicInfoStep },
    { label: 'Looking For Roles', component: RolesStep },
    { label: 'Contacts', component: ContactsStep }
  ];

  let CurrentComponent = $derived(steps[step].component as any);

  // Derived validation state
  const stepValid = $derived(
    $form.repo ? validators[step]?.($form) : step === 0
  );

  const isLastStep = $derived(
    step === steps.length - 1
  );

  function next() {
    if (stepValid && !isLastStep) {
      step++;
    }
  }

  function prev() {
    if (step > 0) {
      step--;
    }
  }

    $effect(() => {

        if (show && dialogElement) {
            tick().then(() => dialogElement.showModal());
        } else if (!show && dialogElement) {
            dialogElement.close();
            step = 0;
            clearForm();
        }
    });

    async function handleSubmit() {
      const data = get(form);
      if (!stepValid) return;
      if (!data?.repo || !repos) return;

      if (data.repo != null && data.repo.private == true) {
        alert('Please select a public repository');
        return;
      }

      loading = true;

      try {
        // Pass the selected repo data to parent component
        if (onSubmit) {
          onSubmit(data);
        }
        show = false;
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding repository');
      } finally {
        loading = false;
      }
    }

    onMount(() => {
      if (editRepo) {
        console.log('Edit mode with repo:', editRepo);
        const repo = repos?.find(repo => repo.id === editRepo.repoId);
        if(repo) {
          form.set({
            repo: repo,
            basicInfo: {
              name: editRepo.name,
              tagline: editRepo.tagline,
              description: editRepo.description ?? '',
              thumbnail: editRepo.thumbnail ?? '',
              techStack: editRepo.techStack || ''
            },
            roles: editRepo.lookingForRoles || [],
            contacts: editRepo.contact || []
        });
        }

      }
    });
</script>

<dialog bind:this={dialogElement} id="my_modal_5" class="modal modal-bottom sm:modal-middle ">
  <div class="modal-box md:w-full md:max-w-6xl ">
  <form method="dialog" onsubmit={handleSubmit}>
      <!-- Stepper -->
      <ul class="steps w-full">
        {#each steps as s, i}
          <li
            class="step cursor-pointer"
            class:step-primary={i <= step}
            onclick={() => {
              if (i <= step || stepValid) {
                step = i;
              }
            }}
          >
            {s.label}
          </li>
        {/each}
      </ul>

      <!-- Step Content -->
      <div in:fade out:fade class="pt-4 transition-all duration-300 md:min-h-[200px] content-center">
        {#if CurrentComponent}
          <svelte:component this={CurrentComponent} {repos}/>
        {/if}
      </div>
    

    <div class="modal-action flex justify-stretch">
      <button class="btn btn-ghost" type="button" class:hidden={step === 0}  onclick={prev}><img src={back_arrow} alt="Back" height="20px" width="20px" srcset=""></button>
      <div class="flex-auto"></div>
        {#if !isLastStep}
        <button class="btn" type="button" disabled={loading || !stepValid} onclick={next}>Next</button>
        {:else}
        <button class="btn" onclick={handleSubmit} disabled={loading || !stepValid || step < 2}>
            {loading ? 'Adding...' : 'Submit'}
        </button>
        {/if}
        <button class="btn" type="button" onclick={() => show = false}>Close</button>
    </div>
    </form>
  </div>
</dialog>
<script lang="ts">
    import type { Repo } from "$lib/types/savedRepos";
    const { repos, ownRepos, clickedEdit, clickedDelete }: { repos: Repo[], ownRepos?: boolean, clickedEdit?: (repo: any) => void, clickedDelete?: (repo: any) => void } = $props();
    let actionModal: HTMLDialogElement;
    let actionableRepo = $state({} as Repo);

    const itemsPerPage = 10;
    let currentPage = $state(1);
	// Pagination
	const totalRepos = $derived(repos?.length ?? 0);
	const totalPages = $derived(Math.ceil(totalRepos / itemsPerPage));
	const paginatedRepos = $derived(
		repos?.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		) ?? []
	);

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}


	function openModal(repo: Repo) {
        actionableRepo = repo;
		actionModal?.showModal();
        actionModal?.addEventListener('close', () => {
            actionableRepo = {} as Repo;
        }, { once: true });
	}

</script>

<div class="overflow-x-auto w-full">
<table class="table table-zebra bg-base-100 w-full mx-auto">
					<thead>
						<tr class="bg-base-300">
							<th>Project</th>
							<th class="hidden md:table-cell">Owner</th>
							<th class="hidden lg:table-cell">Tech Stack</th>
							<th>Status</th>
							<th class="sr-only sm:not-sr-only">Action{ownRepos? 's' : ''}</th>
						</tr>
					</thead>
					<tbody>
						{#each paginatedRepos as repo}
							<tr class="cursor-pointer hover:bg-base-200"  ontouchstart={() => !ownRepos ? window.location.href=`/repos/${repo.repoSlug}` : openModal(repo)}>
								<td>
									<div class="flex items-center gap-3">
										{#if repo.thumbnail}
											<div class="avatar">
												<div class="mask mask-squircle h-12 w-12">
													<img src={repo.thumbnail} alt={repo.name} />
												</div>
											</div>
										{:else}
											<div class="avatar placeholder">
												<div class="bg-base-300 text-base-content rounded-lg w-12 h-12 flex items-center justify-center">
													📦
												</div>
											</div>
										{/if}
										<div>
											<p class="font-bold">{repo.name}</p>
											<p class="text-sm text-base-content/70">{repo.tagline}</p>
										</div>
									</div>
								</td>
								<td class="hidden md:table-cell">{repo.owner}</td>
								<td class="hidden lg:table-cell">
									{#if repo.techStack && repo.techStack.split(',').length > 0}
										<div class="flex flex-wrap gap-1">
											{#each repo.techStack.split(',') as tech}
												<span class="badge badge-sm">{tech}</span>
											{/each}
											{#if repo.techStack.split(',').length > 2}
												<span class="badge badge-sm badge-ghost">+{repo.techStack.split(',').length - 2}</span>
											{/if}
										</div>
									{/if}
								</td>
								<td>
									<span class="badge" class:badge-success={repo.isActive} class:badge-ghost={!repo.isActive}>
										{repo.isActive ? 'Active' : 'Inactive'}
									</span>
								</td>
								<td class="sr-only sm:not-sr-only">
                                {#if ownRepos}
                                    <button class="btn btn-warning btn-sm" onclick={() => clickedDelete && clickedDelete(repo)}>Remove</button>
                                    <button class="btn btn-primary btn-sm" onclick={() => clickedEdit && clickedEdit(repo)}>Edit</button>
                                {:else}
                                    <a href="/repos/{repo.repoSlug}" class="btn btn-accent btn-sm">View</a>
                                {/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
                </div>

                
			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="flex items-center justify-between mt-8">
					<button
						class="btn btn-outline"
						disabled={currentPage === 1}
						onclick={prevPage}
					>
						← Previous
					</button>

					<div class="flex gap-2">
						<span class="px-4 py-2">Page {currentPage} of {totalPages}</span>
					</div>

					<button
						class="btn btn-outline"
						disabled={currentPage === totalPages}
						onclick={nextPage}
					>
						Next →
					</button>
				</div>
			{/if}

			{#if totalRepos === 0}
				<div class="text-center py-12">
					<p class="text-base-content/70">No projects available yet.</p>
				</div>
			{/if}


<dialog bind:this={actionModal}  class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">actions</h3>
    <section>
        <button class="btn btn-warning btn-sm" onclick={() => clickedDelete && clickedDelete(actionableRepo)}>Remove</button>
        <button class="btn btn-primary btn-sm" onclick={() => clickedEdit && clickedEdit(actionableRepo)}>Edit</button>
        <a href="/repos/{actionableRepo.repoSlug}" class="btn btn-accent btn-sm">View</a>
    </section>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
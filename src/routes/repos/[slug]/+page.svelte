<script lang="ts">
	import type { Repo } from '$lib/types/savedRepos';
	import { onMount } from 'svelte';
    import discord from '$lib/assets/discord.png';
    import email from '$lib/assets/email.png';
    import github from '$lib/assets/github.png';
    import linkedin from '$lib/assets/linkedin.png';
	import RepoTable from '$lib/components/repoTable.svelte';

	let { data }: { data: { slug: string; singleRepo: Repo | null; repos: Repo[] } } = $props();
    let isModalOpen = $state(false);

	

	const repoExists = $derived(!!data.singleRepo);
	const isAllView = $derived(data.slug === 'all' || !data.slug);
	const featuredRepos = $derived(
		repoExists
			? data.repos?.filter(r => r.id !== data.singleRepo?.id).slice(0, 3) ?? []
			: []
	);



    onMount(() => {
        console.log('Repo Data:', data);
    });
</script>

{#if isAllView}
	<!-- All Repos Paginated Table View -->
	<div class="min-h-screen bg-gradient-to-b from-base-200 to-base-100">
		<div class="container mx-auto px-4 py-12 max-w-6xl">
			<div class="mb-8">
				<h1 class="text-4xl font-bold mb-2">All Projects</h1>
				<p class="text-base-content/70">Browse all available repositories</p>
			</div>

			<RepoTable repos={data.repos}></RepoTable>

		</div>
	</div>
{:else if repoExists && data.singleRepo}
	<!-- Single Repo Details Page -->
	<div class="min-h-screen bg-gradient-to-b from-base-200 to-base-100">
		<!-- Hero Section -->
		<div class="hero bg-base-300 py-12">
			<div class="hero-content w-full max-w-6xl flex-col lg:flex-row lg:gap-8">
				{#if data.singleRepo.thumbnail}
					<img
						src={data.singleRepo.thumbnail}
						alt={data.singleRepo.name}
						class="w-full lg:w-64 h-64 rounded-lg object-cover shadow-lg"
					/>
				{:else}
					<div class="w-full lg:w-64 h-64 bg-base-200 rounded-lg flex items-center justify-center shadow-lg">
						<span class="text-base-content/50">No Image</span>
					</div>
				{/if}

				<div class="flex-1">
					<h1 class="text-4xl lg:text-5xl font-bold mb-4">{data.singleRepo.name}</h1>
					<p class="text-xl text-primary font-semibold mb-3">{data.singleRepo.tagline}</p>
					<p class="text-base-content/70 mb-6 leading-relaxed">
						{data.singleRepo.description || 'No description available'}
					</p>

					<div class="flex flex-wrap gap-3 mb-6">
						<a
							href={data.singleRepo.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-primary"
						>
							View on GitHub
						</a>

					</div>

					<div class="flex flex-wrap gap-4 text-sm">
						<div>
							<span class="font-semibold">Owner:</span>
							<span class="ml-2">{data.singleRepo.owner}</span>
						</div>
						<div>
							<span class="font-semibold">Status:</span>
							<span class="badge ml-2" class:badge-success={data.singleRepo.isActive}
								class:badge-ghost={!data.singleRepo.isActive}
							>
								{data.singleRepo.isActive ? 'Active' : 'Inactive'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="container mx-auto px-4 py-12 max-w-6xl">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Left Column - Main Details -->
				<div class="lg:col-span-2 space-y-8">
					<!-- Tech Stack -->
					{#if data.singleRepo.techStack && data.singleRepo.techStack.length > 0}
						<div class="card bg-base-100 shadow">
							<div class="card-body">
								<h2 class="card-title text-2xl mb-4">Tech Stack</h2>
								<div class="flex flex-wrap gap-2">
									{#each data.singleRepo.techStack.split(',') as tech}
										<div class="badge badge-lg badge-outline">{tech.trim()}</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					<!-- Looking For Roles -->
					{#if data.singleRepo.lookingForRoles && data.singleRepo.lookingForRoles.length > 0}
						<div class="card bg-base-100 shadow">
							<div class="card-body">
								<h2 class="card-title text-2xl mb-4">We're Looking For</h2>
								<div class="space-y-3">
									{#each data.singleRepo.lookingForRoles as role}
										<div class="border-l-4 border-primary pl-4 py-2">
											<h3 class="font-semibold text-lg">{role.role}</h3>
											<div class="flex flex-wrap gap-2 mt-2">
												<span class="badge badge-outline">{role.experience} level</span>
												<span class="badge badge-outline">{role.commitment}</span>
												{#if role.paid}
													<span class="badge badge-success">Paid</span>
												{:else}
													<span class="badge badge-ghost">Volunteer</span>
												{/if}
											</div>
											{#if role.description}
												<p class="text-sm text-base-content/70 mt-2">{role.description}</p>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Right Sidebar -->
				<div class="space-y-6">
					<!-- Contact Card -->
					{#if data.singleRepo.contact && data.singleRepo.contact.length > 0}
						<div class="card bg-base-100 shadow">
							<div class="card-body">
								<h2 class="card-title text-lg mb-4">Contact</h2>
								
                                {#if data.singleRepo.contact}
                                  {#each data.singleRepo.contact as contact}
                                  <div class="flex items-center gap-3">
									<div class="avatar placeholder">
										<div class="bg-primary text-primary-content rounded-full w-10 flex items-center justify-center">
											{#if contact.type === 'email'}
												<span><img src={email} alt="Email" class="w-5 h-5"></span>
											{:else if contact.type === 'discord'}
												<span><img src={discord} alt="Discord" class="w-5 h-5"></span>
											{:else if contact.type === 'linkedin'}
												<span><img src={linkedin} alt="LinkedIn" class="w-5 h-5"></span>
											{:else if contact.type === 'github'}
												<span><img src={github} alt="GitHub" class="w-5 h-5"></span>
											{/if}
										</div>
									</div>
									<div>
										<p class="font-semibold text-sm capitalize">{contact.type}</p>
										<p class="text-sm text-base-content/70">{contact.userName}</p>
									</div>
                                    </div>
                                       {/each}
                                {/if}
								

							</div>
						</div>
					{/if}

					<!-- Repository Info Card -->
					<div class="card bg-base-100 shadow">
						<div class="card-body">
							<h2 class="card-title text-lg mb-4">Repository Info</h2>
							<div class="space-y-3 text-sm">
                            {#if data.singleRepo.techStack && data.singleRepo.techStack.length > 0}
								<div>
									<span class="font-semibold">Tech Stack:</span>
									{#if data.singleRepo.techStack && data.singleRepo.techStack.length > 0}
										<div class="flex flex-wrap gap-2 mt-2">
											{#each data.singleRepo.techStack as tech}
												<span class="badge badge-outline">{tech}</span>
											{/each}
										</div>
									{/if}
								</div>
                                {/if}
								<div>
									<span class="font-semibold">Visibility:</span>
									<span class="badge badge-sm ml-2" class:badge-error={data.singleRepo.isPrivate}
										class:badge-success={!data.singleRepo.isPrivate}
									>
										{data.singleRepo.isPrivate ? 'Private' : 'Public'}
									</span>
								</div>
								<div>
									<span class="font-semibold">Created:</span>
									<p class="text-base-content/70">
										{new Date(data.singleRepo.createdAt).toLocaleDateString()}
									</p>
								</div>
								<div>
									<span class="font-semibold">Updated:</span>
									<p class="text-base-content/70">
										{new Date(data.singleRepo.updatedAt).toLocaleDateString()}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Featured Repos at Bottom -->
		{#if data.repos && data.repos.length > 1}
			<div class="container mx-auto px-4 py-12 max-w-6xl">
				<h2 class="text-3xl font-bold mb-8">Other Projects</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each featuredRepos as repo}
						<div class="card bg-base-100 shadow hover:shadow-lg transition-shadow">
							<figure>
								{#if repo.thumbnail}
									<img src={repo.thumbnail} alt={repo.name} class="w-full h-40 object-cover" />
								{:else}
									<div class="w-full h-40 bg-base-200 flex items-center justify-center">
										<span class="text-base-content/50">No Image</span>
									</div>
								{/if}
							</figure>
							<div class="card-body">
								<h2 class="card-title text-lg">{repo.name}</h2>
								<p class="text-sm text-primary font-semibold">{repo.tagline}</p>
								{#if repo.description}
									<p class="text-sm text-base-content/70 line-clamp-2">{repo.description}</p>
								{/if}
								{#if repo.techStack && repo.techStack.length > 0}
									<div class="flex flex-wrap gap-1 mt-2">
										{#each repo.techStack.slice(0, 3) as tech}
											<div class="badge badge-sm badge-outline">{tech}</div>
										{/each}
										{#if repo.techStack.length > 3}
											<div class="badge badge-sm badge-ghost">+{repo.techStack.length - 3}</div>
										{/if}
									</div>
								{/if}
								<div class="card-actions justify-end mt-4">
									<a href="/repos/{repo.repoSlug}" class="btn btn-sm btn-primary">View</a>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="flex justify-center mt-10">
					<a href="/repos/all" class="btn btn-lg btn-accent">View All Projects</a>
				</div>
			</div>
		{/if}
	</div>
	{:else}
	<!-- Repo Not Found -->
	<div class="min-h-screen bg-gradient-to-b from-base-200 to-base-100">
		<div class="container mx-auto px-4 py-12 max-w-6xl text-center">
			<h1 class="text-4xl font-bold mb-4">Repository Not Found</h1>
			<p class="text-base-content/70 mb-6">The repository you're looking for doesn't exist.</p>
			<a href="/repos/all" class="btn btn-primary">Browse All Projects</a>
		</div>
	</div>
{/if}
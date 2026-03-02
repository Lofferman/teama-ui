<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import teamaLogo from '$lib/assets/Teama.svg';

	let { form, data }: { form: ActionData; data: PageData } = $props();
</script>

<div class="min-h-screen bg-neutral flex items-center justify-center p-4">
	<div class="card w-full max-w-md bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="flex justify-center mb-6">
				<img src={teamaLogo} alt="Teama" class="h-12" />
			</div>

			<h2 class="card-title text-2xl text-center justify-center mb-2">Welcome to Teama</h2>
			<p class="text-center text-base-content/70 mb-6">
				Connecting people to projects
			</p>

			{#if form?.message}
				<div class="alert alert-error" role="alert">
					<span>{form.message}</span>
				</div>
			{/if}

			<form method="post" action="?/signInSocial" use:enhance class="space-y-4">
				<input type="hidden" name="provider" value="github" />
				<input type="hidden" name="callbackURL" value={data.redirectTo} />

				<button
					type="submit"
					class="btn btn-primary w-full"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.91 1.182.092-.92.35-1.546.636-1.901-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.722c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.167 20 14.42 20 10c0-5.523-4.477-10-10-10z"
							clip-rule="evenodd"
						/>
					</svg>
					Sign in with GitHub
				</button>
			</form>

			<div class="divider text-sm">More options coming soon</div>
			<p class="text-center text-sm text-base-content/50">
				By signing in, you agree to our Terms of Service
			</p>
		</div>
	</div>
</div>

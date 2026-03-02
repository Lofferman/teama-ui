<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import teamaLogo from '$lib/assets/Teama.svg';
	import type { User } from 'better-auth';

	interface Props {
		user: User | null;
	}

	const { user = null }: Props = $props();

	const handleLogout = async (event: SubmitEvent) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		const response = await fetch(form.action, {
			method: 'POST',
			headers: {
				accept: 'application/json'
			}
		});

		if (!response.ok) return;

		await invalidateAll();
		await goto('/login');
	};
</script>

<div class="navbar bg-neutral shadow-sm sticky top-0 z-10">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/">
        <img
        class="h-[30px]"
            alt="teama logo"
            src={teamaLogo} />
    </a>
  </div>
  <div class="flex-none gap-2">
  {#if user}
    <a class="btn btn-primary" href="/manage-repos">Repos</a>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src={user.image} alt="User Avatar" />
        </div>
      </div>
      <ul
        tabindex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li class="menu-title">
          <span>{user.name}</span>
        </li>
        <!-- <li class="divider m-2"></li> -->
        <!-- <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li> -->
        <li>
          <form method="post" action="/api/auth/sign-out" on:submit={handleLogout}>
            <button type="submit" class="w-full text-left">Logout</button>
          </form>
        </li>
      </ul>
    </div>
    {:else}
    <a class="btn btn-primary" href="/login">Login</a>
    {/if}
  </div>
</div>

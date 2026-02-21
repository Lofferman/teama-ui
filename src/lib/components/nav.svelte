<script>
    import teamaLogo from "$lib/assets/Teama.svg";

    const isLoggedin = false;
</script>

<div class="navbar bg-gray-600 shadow-sm">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">
        <img
        class="h-[30px]"
            alt="teama logo"
            src={teamaLogo} />
    </a>
  </div>
  <div class="flex-none">
  {#if isLoggedin}
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabindex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
    {:else}
    <a class="btn btn-ghost text-white">Login</a>
    {/if}
  </div>
</div>
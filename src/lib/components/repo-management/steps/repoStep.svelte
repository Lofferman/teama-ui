<script lang="ts">
  import { form } from '../formStore';
      let {  repos = null } = $props();

</script>

<fieldset>
  <legend>Select a Repo</legend>
    <div class="role-block my-4">
        <select id="repoSelect" bind:value={$form.repo} class="select ">
            <option value={null} disabled selected>select</option>
            {#each repos as repo, i}
                {#if !repo.private}
                    <option value={repo}>{repo.name}</option>
                {/if}
            {/each}
        </select>

    </div>

</fieldset>
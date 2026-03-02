<script lang="ts">
  import { form } from '../formStore';

  function addRole() {
      form.update((f) => {
        if (f.roles.length >= 5) return f;
        return {
        ...f,
        roles: [
            ...f.roles,
            { role: '', experience: '', commitment: '', paid: false }
        ]
        };
    });
  }

  function removeRole(index: number) {
    $form.roles = $form.roles.filter((_, i) => i !== index);
  }
</script>


<div class="grid md:grid-cols-3 sm:grid-cols-1 gap-2 justify-center overflow-y-auto max-h-150">
{#if $form.roles.length > 0}
  
  {#each $form.roles as role, i (i)}
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
  <legend>Role {i + 1}</legend>
    <div class="role-block flex flex-col gap-4">
    
            <label for="role-input-{i}" class="label">Role</label>
            <select id="role-input-{i}" class="select" bind:value={$form.roles[i].role}>
                <option disabled selected>pick a role</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Fullstack</option>
                <option>Mobile</option>
                <option>DevOps</option>
                <option>Product</option>
                <option>Design</option>
            </select>

        <label for="experience-input-{i}" class="label">Experience</label>
        <select id="experience-input-{i}" class="select"  bind:value={$form.roles[i].experience}>
                    <option disabled selected>pick an experience level</option>
                    <option>Any</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Expert</option>
                </select>

            <label for="commitment-input-{i}" class="label">Commitment</label>
            <select id="commitment-input-{i}" class="select" bind:value={$form.roles[i].commitment}>
                <option disabled selected>pick a commitment level</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Flexible</option>
                <option>Contract</option>
            </select>


            <label for="paid-input-{i}" class="label">Paid</label>
            <input id="paid-input-{i}" type="checkbox" bind:checked={$form.roles[i].paid} class="toggle toggle-primary" />
         
            <label for="description-input-{i}" class="label">Description</label>
            <textarea id="description-input-{i}" class="textarea h-24" bind:value={$form.roles[i].description} placeholder="Bio"></textarea>
            <div class="label">Optional</div>

      
        <button type="button" on:click={() => removeRole(i)}>
          Remove
        </button>
      
    </div>
    </fieldset>
  {/each}
  {/if}
</div>
{#if $form.roles.length < 5}
    <button type="button" on:click={addRole}>
    + Add Role
  </button>
{/if}


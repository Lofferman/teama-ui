       <script lang="ts">
	import type { ContactForm } from '$lib/types/newRepoForm';
  import { form } from '../formStore';

  function addContact() {
      form.update((f) => {
        if (f.contacts.length >= 5) return f;
        return {
        ...f,
        contacts: [
            ...f.contacts,
            { type: '', userName: '' }
        ]
        };
    });
  }


  function removeContact(index: number) {
    $form.contacts = $form.contacts.filter((_, i) => i !== index);
  }
</script>

<div class="grid  md:grid-cols-3 sm:grid-cols-1 gap-2 justify-center overflow-y-auto max-h-150">
  {#each $form.contacts as contact, i (i)}
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
  <legend>Contact {i + 1}</legend>
    <div class="contact-block flex flex-col gap-4">
            <select id="contact-type-input-{i}" class="select" bind:value={$form.contacts[i].type}>
                <option disabled>pick a contact type</option>
                <option>email</option>
                <option>discord</option>
                <option>github</option>
                <option selected>linkedin</option>
            </select>
            {#if $form.contacts[i].type === 'email'}
            <label class="input validator">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
                >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
            </svg>
            <input type="email" placeholder="mail@site.com" required  bind:value={$form.contacts[i].userName}/>
            </label>
            <div class="validator-hint hidden">Enter valid email address</div>

            {:else}
            <label class="input validator">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
                >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
                </g>
            </svg>
            <input
            id="contact-value-input-{i}"
            bind:value={$form.contacts[i].userName}
                type="text"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
            />
            </label>
            <p class="validator-hint">
            Must be 3 to 30 characters
            <br />containing only letters, numbers or dash
            </p>
            {/if}

        <button class="btn btn-ghost" type="button" on:click={() => removeContact(i)}>
          Remove
        </button>
    </div>
  </fieldset>
  {/each} 
  </div>
  {#if $form.contacts.length < 5}
  <button  type="button" on:click={addContact} class="btn btn-primary rounded-full">
    + 
  </button>
    {/if}
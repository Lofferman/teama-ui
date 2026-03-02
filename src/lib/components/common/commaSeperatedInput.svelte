<script lang="ts">
  let { label, placeholder,  value = $bindable<string>() } = $props();

  let error = $state<string | null>(null);
 // Create mutable local alias
  function validate(input: string) {
    if (!input.trim()) {
      return;
    }

    const items = input.split(",").map((v) => v.trim());

    if (items.some((v) => v.length === 0)) {
      error = "Values must be separated by a single comma.";
      return;
    }

    const unique = new Set(items);
    if (unique.size !== items.length) {
      error = "Duplicate values are not allowed.";
      return;
    }

    error = null;
  }

  $effect(() => {
    validate(value);
  });
</script>

<div class="form-control w-full max-w-md">
  {#if label}
    <label class="label">
      <span class="label-text">{label} (comma separated)</span>
    </label>
  {/if}

  <input
    type="text"
    bind:value={value}
    placeholder={placeholder}
    class="input input-bordered w-full {error ? 'input-error' : 'input-primary'}"
  />

  {#if error}
    <label class="label">
      <span class="label-text-alt text-error">{error}</span>
    </label>
  {/if}
</div>
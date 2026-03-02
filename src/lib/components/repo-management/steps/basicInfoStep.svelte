<script>
	import { form } from "../formStore";
  import CommaSeparatedInput from "../../common/commaSeperatedInput.svelte";
	import { onMount } from "svelte";
  onMount(() => {
    console.log("BasicInfoStep form data:", $form);
  });
</script>
    <fieldset class="fieldset justify-self-center justify-center bg-base-200 border-base-300 rounded-box w-xs border p-4 my-10">
        <!-- <legend class="fieldset-legend">Details</legend> -->
        <label for="name-input" class="label">Name</label>
        <input id="name-input" type="text" class="input" bind:value={$form.basicInfo.name} required placeholder="Team name / project name" />

        <label for="tagline-input" class="label">Tagline</label>
        <input id="tagline-input" type="text" class="input" bind:value={$form.basicInfo.tagline} required placeholder="A short description of your team" />
        
        <label for="techStack-input" class="label">Tech Stack</label>
        <CommaSeparatedInput bind:value={$form.basicInfo.techStack} label="Tech Stack" placeholder="e.g., React, Node.js, Python"/>
        

        <label for="thumbnail-input" class="label">Thumbnail</label>
        <input id="thumbnail-input" type="text" class="input" bind:value={$form.basicInfo.thumbnail} required placeholder="URL to your team's thumbnail image" />
        <div class="label">Optional</div>

          <legend class="fieldset-legend">Description</legend>
            <textarea class="textarea h-24" bind:value={$form.basicInfo.description} placeholder="Describe your team's purpose and goals"></textarea>
            <div class="label">Optional {$form.basicInfo.techStack}</div>
    </fieldset>
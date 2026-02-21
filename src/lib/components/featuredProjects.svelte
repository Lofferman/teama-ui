<div class="carousel carousel-center fill p-4 space-x-4 bg-transparent rounded-box">
    {#each Array(10) as _, i}
    <div class="carousel-item w-64">
    <div class="card card-compact glass shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Card {i + 1}</h2>
        <p>Content goes here</p>
        <p>Content goes here</p>
        <p>Looking for</p>
        <section>
            <div class="badge badge-primary">Front-End</div>
            <div class="badge badge-primary">Designer</div>
        </section>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Explore</button>
        </div>
      </div>
    </div>
  </div>
    {/each}
</div>

<style>
    .fill{
        max-width: -webkit-fill-available;
    }
</style>
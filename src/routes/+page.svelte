<script>
	import FeaturedProjects from "$lib/components/featuredProjects.svelte";
	import Footer from "$lib/components/footer.svelte";
	import Nav from "$lib/components/nav.svelte";
      import "./layout.css";
</script>

<Nav></Nav>
<div class="hero bg-gray-600 text-white min-h-screen">
  <div class="hero-content text-center">
    <div class="w-full">
      <h1 class="text-5xl font-bold">Dive in</h1>
      <p class="py-6">
        Conecting people to projects
      </p>
    <div class="join">
        <input type="text" placeholder="Search initiatives" class="input join-item w-[400px]" />
        <button class="btn btn-neutral join-item">explore</button>
    </div>
    <div class="w-full mt-10">
        <FeaturedProjects></FeaturedProjects>
    </div> 
    </div>
  </div>
</div>
<Footer></Footer>
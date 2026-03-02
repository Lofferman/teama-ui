import { db } from "$lib/server/db";
import  { repos } from "$lib/server/db/schema";
import { type Repo } from "$lib/types/savedRepos";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    let repoList: Repo[] = [];
    let singleRepo: Repo | null = null;
    const slug = params.slug;
    if (doesSlugExist(slug)) {
        singleRepo = await getSingleRepo(slug);
        if (!singleRepo) {
            repoList = await getAllRepos() 
        }
    }else{
        repoList = await getAllRepos()
    }

    return {
        slug: params.slug,
        repos: repoList,
        singleRepo: singleRepo
    };
}

async function getAllRepos(): Promise<Repo[]> {
            return await db.select()
            .from(repos)
            .where(eq(repos.isActive, true)) as Repo[];
}

async function getSingleRepo(id: string): Promise<Repo | null> {
            return await db
            .select()
            .from(repos)
            .where(eq(repos.repoSlug, id)).limit(1).then(results => results[0]) as Repo;
}

function doesSlugExist(slug: string) {
    if (!slug) return false;
    if (slug === 'all') return false;
    if (slug.length > 100) return false; 
    if (!/^[a-zA-Z0-9-_]+$/.test(slug)) return false;
    if (slug == undefined || slug == null || slug.trim() === '') return false;

    return true;
}


import Image from "next/image";
import SearchForm from "@/components/ui/ui/SearchForm";
import StartupCard,{StartupTypeCard} from "@/components/ui/ui/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/lib/queris";
import { space } from "postcss/lib/list";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home( {searchParams}: {
  searchParams: Promise< {query?: string}> 
}) {
  const query = searchParams ? (await searchParams).query : undefined;
  const params = {search : query|| null};

  const session = await auth();
  console.log(session?.id);


  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params })

console.log(JSON.stringify(posts, null, 2));




  return (
    <><section className="pink_container">
      <h1 className="heading">Pitch Your Startup <br />
        Connect with Enterpreneur</h1>
      <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches and Get Notice in the Virtual Competition</p>

      <SearchForm query={query} />

    </section>
    
    <section className="section_container">
      <p className="text-30-semibold">
        {query? `Search results for "${query}"`: 'All Startups'}

      </p>
      <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No Startup Found</p>
          )}
      </ul>
    </section>

    <SanityLive />
    </>
  );
}

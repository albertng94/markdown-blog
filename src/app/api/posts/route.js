import { getAllPosts } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Execute function to get all posts and return the data as a response which can be 
// fetched from a client component.

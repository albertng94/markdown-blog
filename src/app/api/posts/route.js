import { getAllPosts } from "../../../lib/posts";

export async function GET() {
  const posts = getAllPosts();

  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return new Response(JSON.stringify(sortedPosts), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Execute function to get all posts and return the data as a response which can be 
// fetched from a client component.

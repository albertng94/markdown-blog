"use client";

import PostCard from "@/components/MainBlogPage/PostCard";
import classes from "./page.module.css";
import { useEffect, useState } from "react";


export default function BlogPage() {

    // Fetch all posts from the API
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            const res = await fetch("/api/posts"); 
            const postsData = await res.json();
            setPosts(postsData);
        }
        loadPosts();
      }, []);

    // Filter posts based on search term
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = posts.filter(post => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
               post.author.toLowerCase().includes(lowerCaseSearchTerm) ||
               post.description.toLowerCase().includes(lowerCaseSearchTerm);
    });

    function handleChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <>
            <input className={classes.searchBar} type="search" onChange={handleChange} placeholder="Search through our posts..." />
            <ul className={classes.postsGrid}>
                {filteredPosts.map(post => (
                    <PostCard post={post} key={post.slug} />
                ))}
            </ul>
        </>
    );
}
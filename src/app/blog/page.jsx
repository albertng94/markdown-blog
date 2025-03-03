"use client";

import PostCard from "@/components/MainBlogPage/PostCard";
import classes from "./page.module.css";
import { useEffect, useState } from "react";
import CustomDropdown from "@/components/MainBlogPage/Filtering/Dropdown/CustomDropdown";

// Define filter options based on date
const dateFilter = {
    options: ["All posts", "Last 30 days", "Last 90 days", "Last year"],
    defaultOption: "All posts",
}

// Define filter options based on categories
const categoryFilter = {
    options: ["All categories", "Travel", "Nature", "Food", "Lifestyle"],
    defaultOption: "All categories",
}

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


    // Define filter options based on authors
    const authorFilter = {
        options: ["All authors", ...new Set(posts.map(post => post.author))],
        defaultOption: "All authors",
    }

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

    // Handle dropdown elements opening and closing
    const [openDropdown, setOpenDropdown] = useState(false);
    function handleDropdownClick(dropdownIndex) {
        setOpenDropdown(openDropdown === dropdownIndex ? false : dropdownIndex);
    }

    return (
        <>
            <div className={classes.filters}>
                <CustomDropdown
                    options={dateFilter.options}
                    defaultOption={dateFilter.defaultOption} 
                    handleClick={() => handleDropdownClick(1)}
                    isOpen={openDropdown === 1}
                />
                <CustomDropdown
                    options={authorFilter.options}
                    defaultOption={authorFilter.defaultOption}
                    handleClick={() => handleDropdownClick(2)} 
                    isOpen={openDropdown === 2}
                />
                <CustomDropdown
                    options={categoryFilter.options}
                    defaultOption={categoryFilter.defaultOption} 
                    handleClick={() => handleDropdownClick(3)}
                    isOpen={openDropdown === 3}
                />
                <input 
                    className={classes.searchBar} 
                    type="search" 
                    onChange={handleChange} 
                    placeholder="Search through our posts..." 
                />
            </div>
            <ul className={classes.postsGrid}>
                {filteredPosts.map(post => (
                    <PostCard post={post} key={post.slug} />
                ))}
            </ul>
        </>
    );
}
"use client";

import PostCard from "@/components/MainBlogPage/PostCard";
import classes from "./page.module.css";
import { useEffect, useState } from "react";
import CustomDropdown from "@/components/MainBlogPage/Filtering/Dropdown/CustomDropdown";
import { 
    filterPostsByDate, 
    filterPostsByAuthor, 
    filterPostsByCategory, 
    getCommonFilteredPosts 
} from "@/lib/filterPosts";
import Image from "next/image";
import notFoundIcon from "../../../public/icons/notFound.svg";

// // Define filter options based on date
const dateFilter = {
    options: ["All posts", "Last 30 days", "Last 90 days", "Last year"],
    defaultOption: "All posts",
}

// // Define filter options based on categories
const categoryFilter = {
    options: ["All categories", "Travel", "Nature", "Food", "Lifestyle"],
    defaultOption: "All categories",
}

export default function BlogPage() {

    // Posts state object. Containing one array for all posts and another one for each specific filter (except search bar)
    const [posts, setPosts] = useState({
        allPosts: [],
        filteredByDate: [],
        filteredByAuthor: [],
        filteredByCategory: []
    });
    // Search bar value state
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch all posts from the API and update the "allPosts" piece of state
    useEffect(() => {
        async function loadPosts() {
            const res = await fetch("/api/posts"); 
            const postsData = await res.json();
            setPosts((prevPosts) => ({
                ...prevPosts,
                allPosts: postsData,
            }));
        }
        loadPosts();
      }, []);

    // // Define filter options based on authors
    const authorFilter = {
        options: ["All authors", ...new Set(posts.allPosts.map(post => post.author))],
        defaultOption: "All authors",
    }

    // Handle dropdown elements opening and closing
    const [openDropdown, setOpenDropdown] = useState(false);
    function handleDropdownClick(dropdownIndex) {
        setOpenDropdown(openDropdown === dropdownIndex ? false : dropdownIndex);
    }

    // Handle search bar value changes and update the "searchTerm" state value
    function handleSearchBarChange(event) {
        setSearchTerm(event.target.value);
    }

    // Filter posts based on selected date filter and update "filteredByDate" piece of state
    function handleDateFiltering(selectedDateFilter) { 
        const postsToFilter = [...posts.allPosts];
        const filteredPosts = filterPostsByDate(postsToFilter, selectedDateFilter);
        setPosts((prevPosts) => ({
            ...prevPosts,
            filteredByDate: filteredPosts,
        }));
    }

    // Filter posts based on selected author and update "filteredByAuthor" piece of state
    function handleAuthorFiltering(selectedAuthorFilter) {
        const postsToFilter = [...posts.allPosts];
        const filteredPosts = filterPostsByAuthor(postsToFilter, selectedAuthorFilter);
        setPosts((prevPosts) => ({
            ...prevPosts,
            filteredByAuthor: filteredPosts,
        }));
    }

    // Filter posts based on selected category and update "filteredByCategory" piece of state
    function handleCategoryFiltering(selectedCategoryFilter) {
        const postsToFilter = [...posts.allPosts];
        const filteredPosts = filterPostsByCategory(postsToFilter, selectedCategoryFilter);
        setPosts((prevPosts) => ({
            ...prevPosts,
            filteredByCategory: filteredPosts,
        }));
    }

    // Compare all filter state post arrays and return a new array with the posts in common (cross-filtering)
    const commonFilteredPosts = getCommonFilteredPosts(posts.filteredByDate, posts.filteredByAuthor, posts.filteredByCategory);

    // Return all posts within first render, or the commonFilteredPosts instead if the user applied any filter
    const postsToFilter = commonFilteredPosts ? [...commonFilteredPosts] : [...posts.allPosts];

    // Apply last filter if needed (search bar filter)
    const filteredPosts = postsToFilter.filter(post => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
               post.author.toLowerCase().includes(lowerCaseSearchTerm) ||
               post.description.toLowerCase().includes(lowerCaseSearchTerm) ||
               post.category.toLowerCase().includes(lowerCaseSearchTerm) ||
               post.date.toLowerCase().includes(lowerCaseSearchTerm);
    });

    return (
        <>
            <section className={classes.filtersSection}>
                <div className={classes.dropdownDiv}>
                    <CustomDropdown
                        options={dateFilter.options}
                        defaultOption={dateFilter.defaultOption} 
                        handleClick={() => handleDropdownClick(1)}
                        isOpen={openDropdown === 1}
                        handleFiltering={handleDateFiltering}
                    />
                    <CustomDropdown
                        options={authorFilter.options}
                        defaultOption={authorFilter.defaultOption}
                        handleClick={() => handleDropdownClick(2)} 
                        isOpen={openDropdown === 2}
                        handleFiltering={handleAuthorFiltering}
                    />
                    <CustomDropdown
                        options={categoryFilter.options}
                        defaultOption={categoryFilter.defaultOption} 
                        handleClick={() => handleDropdownClick(3)}
                        isOpen={openDropdown === 3}
                        handleFiltering={handleCategoryFiltering}
                    />
                </div>
                <input 
                    className={classes.searchBar} 
                    type="search" 
                    onChange={handleSearchBarChange} 
                    placeholder="Search our posts..." 
                />
            </section>
            <section className={classes.listOfPosts}>
                {/* If after filtering logic the array has posts, render them in post cards*/
                    filteredPosts.length > 0 && 
                    <ul className={classes.postsGrid}>
                        {filteredPosts.map((post) => (
                            <PostCard post={post} key={post.slug} />
                        ))}
                    </ul>
                }
                {/* If after filtering logic the array has no posts, render fallback content*/
                    filteredPosts.length === 0 && 
                        <div className={classes.NoPostsFound}>
                            <Image 
                                src={notFoundIcon}
                                alt="Blog not found icon" 
                                width={100} 
                                height={100}
                            />
                            <p>No related posts were found...</p>
                        </div>
                }
            </section>
        </>
    );
}

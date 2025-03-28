"use client";

import PostCard from "../../components/MainBlogPage/PostCard";
import classes from "./page.module.css";
import { useEffect, useState } from "react";
import CustomDropdown from "../../components/MainBlogPage/Filtering/Dropdown/CustomDropdown";
import { 
    filterPostsByDate, 
    filterPostsByAuthor, 
    filterPostsByCategory, 
    getCommonFilteredPosts 
} from "../../lib/filterPosts";
import { motion } from "framer-motion";


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

    // Close opened dropdowns with ESC key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
              setOpenDropdown(false); // Close dropdown when Escape is pressed
            }
          };
      
          // Add event listener
          document.addEventListener('keydown', handleKeyDown);
      
          // Cleanup the event listener on component unmount
          return () => {
            document.removeEventListener('keydown', handleKeyDown);
          };
    }, []);

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
                    onSelect={() => {
                        // Close opened dropdowns if searach bar is selected
                        setOpenDropdown(false);
                    }}
                />
            </section>
            <section className={classes.listOfPosts}>
                {/* If after filtering logic the array has posts, render them in post cards*/
                    filteredPosts.length > 0 && 
                    <ul className={classes.postsGrid}>
                        {filteredPosts.map((post) => (
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                initial="hidden"
                                animate="visible"
                            >
                                <PostCard post={post} key={post.slug} />
                            </motion.div>
                        ))}
                    </ul>
                   
                }
                {/* If after filtering logic the array has no posts, render fallback content*/
                    (filteredPosts.length === 0 && posts.filteredByDate.length > 0 || 
                        filteredPosts.length === 0 && posts.filteredByAuthor.length > 0 || 
                        filteredPosts.length === 0 && posts.filteredByCategory.length > 0) &&
                        <div className={classes.NoPostsFound}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="100"  height="100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-notes-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 3h10a2 2 0 0 1 2 2v10m0 4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-14" /><path d="M11 7h4" /><path d="M9 11h2" /><path d="M9 15h4" /><path d="M3 3l18 18" /></svg>
                            <p>No related posts were found...</p>
                            
                        </div>
                }
            </section>
        </>
    );
}

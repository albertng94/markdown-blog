// Filter posts by date options
export function filterPostsByDate(posts, selectedDateFilter) {
    const currentDate = new Date();
    // Calculate thresholds without mutating currentDate
    const last30Days = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last90Days = new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
    const lastYear = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000);
    
    // Filter based on selectedDateFilter
    switch (selectedDateFilter) {
        case "Last 30 days":
            return posts.filter(post => new Date(post.date) >= last30Days);
        case "Last 90 days":
            return posts.filter(post => new Date(post.date) >= last90Days);
        case "Last year":
            return posts.filter(post => new Date(post.date) >= lastYear);
        case "All posts":
        default:
            return posts;
    }
}

// Filter posts by author options
export function filterPostsByAuthor(posts, selectedAuthorFilter) {
    if (selectedAuthorFilter === "All authors") {
        return posts;
    }
    return posts.filter(post => post.author === selectedAuthorFilter);
}

// Filter posts by category options
export function filterPostsByCategory(posts, selectedCategoryFilter) {
    if (selectedCategoryFilter === "All categories") {
        return posts;
    }
    return posts.filter(post => post.category.includes(selectedCategoryFilter));
}

// Get the common filtered posts when multiple filters are applied
export function getCommonFilteredPosts(arr1, arr2, arr3) {
    // Filter out any empty arrays
    const arrays = [arr1, arr2, arr3].filter(arr => arr.length > 0);

    // If all arrays are empty, return an empty false
    if (arrays.length === 0) {
        return false;
    }

    // If there's only one non-empty array, return it
    if (arrays.length === 1) {
        return arrays[0];
    }

    // Find common posts across the non-empty arrays and return them in a new array
    return arrays.reduce((commonPosts, currentArray) => {
        return commonPosts.filter(post => 
            currentArray.some(currentPost => currentPost.slug === post.slug)
        );
    });
}



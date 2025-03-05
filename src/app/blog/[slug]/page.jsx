import classes from "./page.module.css";
import { getPostBySlug } from "@/lib/posts";

export default async function Post({ params }) {
    
    const {slug, contentHtml, ...metadata} = await getPostBySlug(params.slug);

    return (
        <section className={classes.blogContainer}>
            <article>
                <div 
                    className={classes.postContent} 
                    dangerouslySetInnerHTML={{__html: contentHtml}}>
                </div>
                <div className={classes.postMetadata}>
                    <h4>An article by <span className={classes.author}>{metadata.author}</span></h4>
                    <h5>{metadata.date}</h5>
                </div>
            </article>
        </section>
    );
}
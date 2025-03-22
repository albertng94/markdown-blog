import classes from "./page.module.css";
import { getPostBySlug } from "../../../lib/posts";
import Link from "next/link";

export default async function Post({ params }) {
    
    const {slug, contentHtml, ...metadata} = await getPostBySlug(params.slug);

    return (
        <section className={classes.section}>
            <article className={classes.blogContainer}>
                <div 
                    className={classes.postContent} 
                    dangerouslySetInnerHTML={{__html: contentHtml}}>
                </div>
                <div className={classes.postMetadata}>
                    <h4>An article by <span className={classes.author}>{metadata.author}</span></h4>
                    <h5>{metadata.date}</h5>
                </div>
            </article>
            <Link href="/blog" className={classes.backTo}>
                <div className={classes.backIcon}>
                    <span className="material-icons">keyboard_return</span>
                </div>
                <p>Back to all posts.</p>
            </Link>
        </section>
    );
}
import Link from "next/link";
import classes from "./PostCard.module.css";
import Image from "next/image";

export default function PostCard({ post }) {

    const slug = post.title.split(" ").join("-").toLowerCase();

    return (
        <Link href={`/blog/${slug}`}>
            <li className={classes.postItem} key={slug}>
                <p className={classes.postTitle}>{post.title}</p>
                <Image 
                    className={classes.postImage} 
                    src={post.image} 
                    alt={post.imageAlt}
                    width={100}
                    height={100} 
                />
                <div className={classes.descriptionDiv}>
                    <p className={classes.postDescription}>
                        {post.description} <span><button className={classes.readMore}>Read more...</button></span>
                    </p>
                </div>
                <div className={classes.authorDateDiv}>
                    <p className={classes.postAuthor}>By {post.author}</p>
                    <span className={classes.postDate}>{post.date}</span>
                </div>
            </li>
        </Link>
    );
}
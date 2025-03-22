import classes from "./page.module.css";

export default function Home() {
  return (
    <div className={classes.about}>
      <p>This is a simple blog created using NextJS, ReactJS, JavaScript and CSS.</p>
      <p>It renders some posts stored not in a server but in the file system. It has the particularity that these posts are markdown (.md) files, and as such the project uses the "matter" package to access to the files data and "remark" to translate it into html renderable content. The posts content is accessed via an API route returning them as a reponse, which is afterwards fetched from the blog page, which renders them in the end.</p>
      <p>The blog has a filtering functionality with some dropdowns that allow filtering the rendered posts by the metadata variables "author", "category", and "date", and also a search bar that allows filtering by any keyword included both in the metadata and the post content itself.</p>
      <p>The blog is responsive for different desktop and mobile screen sizes. It uses a combination of global and modular CSS. It uses grid for the general and post items layouts, and a combination of CSS and Framer Motion for the animations.</p>
      <p>The blog also has a custom light-dark mode toggle functionality, allowing to switch the color theme at any time.</p>
    </div>
  );
}

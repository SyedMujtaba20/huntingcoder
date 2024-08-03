import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/BlogPost.module.css";
import * as fs from "node:fs";

const Slug = (props) => {
  function createMarkup(c) {
    return { __html: c };
  }
  const [blog, setBlog] = useState(props.myBlog);
  const router = useRouter();

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const { slug } = router.query;
  //   fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
  //     .then((a) => {
  //       return a.json();
  //     })
  //     .then((parsed) => {
  //       console.log(parsed);
  //       setBlog(parsed);
  //     });
  // }, [router.isReady]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1> {blog && blog.title}</h1>
        <hr />
        {blog && (
          <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
        )}
      </main>
    </div>
  );
};

export const getStaticPaths = async () => {
  let allb = await fs.promises.readdir("blogdata");
  allb = allb.map((item) => {
    return { params: { slug: item.split(".")[0] } };
  });
  return {
    paths: allb,
    fallback: true, // false or "blocking"
  };
};

export async function getStaticProps(context) {
  // const router = useRouter();
  const { slug } = context.params;

  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");
  // console.log(req.query.slug);
  return {
    props: { myBlog: JSON.parse(myBlog) },
  };
}
export default Slug;

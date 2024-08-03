import React, { useState, useEffect } from "react";
import styles from "@/styles/Blog.module.css";
import Link from "next/link";
import * as fs from "node:fs";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = (props) => {
  console.log(props);
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setcount] = useState(2);

  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?${count}`);
    setcount(count + 2);
    let data = await d.json();
    setBlogs(data);
  };
  // useEffect(() => {
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((a) => {
  //       return a.json();
  //     })
  //     .then((parsed) => {
  //       console.log(parsed);
  //       setBlogs(parsed);
  //     });
  // }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <InfiniteScroll
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {blogs.map((blogitem) => {
            return (
              <div className={styles.blogItem} key={blogitem.slug}>
                <Link href={`blogpost/${blogitem.slug}`}>
                  <h3>{blogitem.title}</h3>
                </Link>
                <p className={styles.blogItem}>
                  {blogitem.metadesc.substr(0, 140)}...
                </p>
                <Link href={`blogpost/${blogitem.slug}`}>
                  <button className={styles.btn}>Read More</button>
                </Link>
              </div>
            );
          })}
        </InfiniteScroll>

        {/* {blogs.map((blogitem) => {
          return (
            <div className={styles.blogItem} key={blogitem.slug}> */}
        {/* <Link href={`blogpost/${blogitem.slug}`}>
                <h3>{blogitem.title}</h3>
              </Link>
              <p className={styles.blogItem}>
                {blogitem.metadesc.substr(0, 140)}...
              </p>
              <Link href={`blogpost/${blogitem.slug}`}>
                <button className={styles.btn}>Read More</button>
              </Link> */}
        {/* </div>
          );
        })} */}
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < 2; index++) {
    const item = data[index];
    console.log(item);
    myfile = await fs.promises.readFile("blogdata/" + item, "utf-8");
    console.log(myfile);
    allBlogs.push(JSON.parse(myfile));
  }
  return {
    props: { allBlogs, allCount },
  };
}
export default Blog;

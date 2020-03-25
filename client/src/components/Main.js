import React, { useState, useEffect } from "react";
import { Column, Container } from "rbx";
import axios from 'axios';

import BlogPostPreview from "./BlogPostCard";
import NavBar from "./NavBar";

export default function Main() {
  const [posts, setPosts] = useState([])
  let url = 'https://flotsamblog.herokuapp.com/api/posts';

  if(process.env.NODE_ENV !== 'production') {
      url = 'https://my-json-server.typicode.com/mkauha/JSON-server-demo/blogposts';
  }
  
  useEffect(() => {
     axios
      .get(url)
      .then(response => {
        setPosts(response.data);
        console.log(response);
      }).catch(error => {
        alert(`${error}`)

    })
  }, [])


    return (
        <div>
        <NavBar />
        <Container>
            <Column.Group vcentered multiline>
                {posts.map(post => (
                    <Column size="one-third">
                        <BlogPostPreview key={post.title} post={post} />
                    </Column>
                ))}
            </Column.Group>
        </Container>

        </div>
    );
}
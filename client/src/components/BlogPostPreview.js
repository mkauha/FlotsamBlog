import React from 'react'
import { Card, Button, Title, Image } from "rbx";
import { Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

export default function BlogPostPreview(props) {
    const { post } = props;

    let url = `https://flotsamblog.herokuapp.com/api/posts/${post.id}`;

    if(process.env.NODE_ENV !== 'production') {
        const url = `https://my-json-server.typicode.com/mkauha/JSON-server-demo/blogposts/${post.id}`;
    }

    const route = `/posts/${post.id}`

    function onReadMore(event) {
        //console.log('Read more ' + route);
    }

    function onDelete(event) {
        axios
            .delete(url)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                alert(`Error: Post ${post.id} was not deleted`)
            })
            console.log('delete');
    }

    return (
        <div>
            <Card>
                <Card.Image size='4by3'>
                    <Image.Container size="4by3">
                        <Image src="https://source.unsplash.com/random" />
                    </Image.Container>
                </Card.Image>

                <Card.Content>
                    <Title>{post.title}</Title>
                    <Title subtitle>{post.description}</Title>
                    <Button as={Link} to={route} color="primary" onClick={onReadMore}>Read more</Button>
                    <Button color="danger" onClick={onDelete}>Delete</Button>
                </Card.Content>
                <Card.Footer>
                    {post.date}
                </Card.Footer>

            </Card>
        </div>
    );
}
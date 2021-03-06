import React, { useState, useEffect } from "react";
import { Card, Button, Title, Image, Icon, Level } from "rbx";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const subtitle = {
    'marginTop': '10px'
};

const iconHeart = {
    marginTop: '5px',
    marginLeft: '20px',
};

const iconHeartText = {
    marginRight: '3px',
};

const getReadPostsFromLocalStorage = () => {
    let readPostsInStorage = localStorage.getItem("readPosts");
    if(!readPostsInStorage) {
        localStorage.setItem('readPosts', JSON.stringify([]));
    } 

    return JSON.parse(localStorage.getItem("readPosts"));
}

export default function FeaturedBlogPost(props) {

    const { post } = props;
    const [ isPostRead, setIsPostRead ] = useState(false);
    const [ readPosts, setReadPosts ] = useState(getReadPostsFromLocalStorage())

    let history = useHistory();

    const route = `/posts/${post.id}`

    useEffect(() => {
        if(readPosts.includes(post.id) && isPostRead !== true) {
            setIsPostRead(true);
        }
      }, []);

    function onReadMore(event) {
        window.scrollTo(0, 0);
        // Mark post as read to local storage
        let readPostsInStorage = JSON.parse(localStorage.getItem("readPosts"));

        if(!readPostsInStorage.includes(post.id)) {
            readPostsInStorage.push(post.id)
        };

        localStorage.setItem('readPosts', JSON.stringify(readPostsInStorage));
        setReadPosts(JSON.stringify(readPostsInStorage));
        
    }

    function renderReadIcon() {
        if(isPostRead) {
            return (
                <span>
                <Button as={Link} to={route} color="light" onClick={onReadMore}>Read more</Button>
                </span>
            );
        } else {
            return (
                <span>
                <Button as={Link} to={route} color="primary" onClick={onReadMore}>Read more</Button>
                </span>
            );
        }

    }

    const handleClickCategory = e => {
        history.push({
                    pathname: '/search',
                    state: { query: e.target.lastChild.data }
                    })
    }

    return (
        <div>
            <Card>
                <Card.Image size='16by9'>
                    <Image.Container size='16by9'>
                        <Image src={post.imageUrl} />
                    </Image.Container>
                </Card.Image>

                <Card.Content>
                <Level>
                        <Level.Item align="left">{post.date}</Level.Item>
                        <Level.Item align="right" onClick={handleClickCategory}><a>{post.category}</a></Level.Item>
                </Level>
                    <span><Title as={Link} to={route} size={4} onClick={onReadMore}>{post.title}</Title></span>
                    <span><Title 
                        subtitle 
                        style={subtitle}
                        responsive={{
                            touch: { hide: { value: true } }
                          }}
                        >{post.description}</Title></span>
                </Card.Content>
                <Card.Content>
                    {renderReadIcon()}
                    <Icon style={iconHeart} color="grey">
                        <FontAwesomeIcon style={iconHeartText} size="lg" icon={faHeart} />
                        <small>{post.postLikes}</small>
                    </Icon>
                </Card.Content>
            </Card>
        </div>
    );
}
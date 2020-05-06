import React, { useState, useEffect } from "react";
import { Table, Box, Button, Title, Icon, Label } from "rbx";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

const box = {
  'margin': 'auto',
  'padding': '50px',
  'marginTop': '50px',
  'maxWidth': '80%'
};

const button = {
  marginTop: '20px',
};

export default function CommentTable(props) {
  const postData = props.location.state.postData;
  const id = postData.id;
  
  let history = useHistory();
  const [comments, setComments] = useState([])


  let commentUrl = process.env.REACT_APP_COMMENTS_API_URL_PROD;

  if(process.env.NODE_ENV !== 'production') {
      commentUrl = process.env.REACT_APP_COMMENTS_API_URL_DEVEL;

  }

  useEffect(() => {
    fetchComments();
  }, [])

  const handleClickBack = e => {
    history.goBack()
  }

  const fetchComments = () => {
    axios
     .get(commentUrl)
     .then(response => {
       filterData(response.data);
     }).catch(error => {
       alert(`${error}`)
   })
  }

  const filterData = (data) => {
    const commentArray = [];
    for(let i = 0; i < data.length; i++) {
      if(Number(data[i].postId) === Number(id)) {
        commentArray.push(data[i]);
      }
    }
    setComments(commentArray);
  }

  return (
    <div>
      <Box style={box}>
        <Title>Comment Table</Title>

        <Label>All comments</Label>

        <Table fullwidth>
          <Table.Head>
            <Table.Row>
              <Table.Heading>ID</Table.Heading>
              <Table.Heading>Comment</Table.Heading>
              <Table.Heading>Likes</Table.Heading>
              <Table.Heading>Date</Table.Heading>
              <Table.Heading>Remove</Table.Heading>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {comments.map(comment => (
            <Table.Row key={comment.id}>
              <Table.Cell>{comment.id}</Table.Cell>
              <Table.Cell>{comment.content}</Table.Cell>
              <Table.Cell>{comment.likes}</Table.Cell>
              <Table.Cell>{comment.date}</Table.Cell>
              <Table.Cell>
                <Button color="danger">
                  <Icon>
                      <FontAwesomeIcon icon={faTrash} />
                  </Icon>
                </Button>
              </Table.Cell>
            </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Button style={button} onClick={handleClickBack} >Back</Button>
        </Box>
    </div>
  );
}
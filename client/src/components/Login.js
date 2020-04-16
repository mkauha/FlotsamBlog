import React, { useState } from "react";
import { Field, Input, Box, Control, Button, Title, Label } from "rbx";
import { Link } from "react-router-dom";
import axios from 'axios';


const box = {
  'margin': 'auto',
  'padding': '50px',
  'marginTop': '150px',
  'maxWidth': '40%'
};

const textField = {

};


export default function Login(props) {
  const [post, setPost] = useState([])

  let url = process.env.REACT_APP_POSTS_API_URL_PROD;

  if(process.env.NODE_ENV !== 'production') {
      url = process.env.REACT_APP_POSTS_API_URL_DEVEL;
  }

/*
   useEffect(() => {
    axios
     .get(url)
     .then(response => {
       setPost(response.data);
       console.log(response);
     }).catch(error => {
       alert(`${error}`)
   })
 }, []) 
 */

  return (
    <div>
      <Box style={box}>
      <Title>Login</Title>
        <Field style={textField}>
          <Label>Username</Label>
          <Control>
            <Input type="text" placeholder="Username" />
          </Control>
        </Field>

        <Field style={textField}>
          <Label>Password</Label>
          <Control>
            <Input type="password" placeholder="Password" />
          </Control>
        </Field>

        <Field>
          <Control>
            <Button as={Link} to="/user/dashboard" color="success">Login</Button>
          </Control>
        </Field>
      </Box>
    </div>
  );
}
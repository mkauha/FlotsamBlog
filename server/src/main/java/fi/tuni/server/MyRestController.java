package fi.tuni.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Optional;

@RestController
public class MyRestController {

    @Autowired
    BlogPostRepository postRepository;

    @RequestMapping(value = "/posts", method = RequestMethod.POST)
    public ResponseEntity<Void> savePost(@RequestBody BlogPost p, UriComponentsBuilder b) {

        this.postRepository.save(p);

        UriComponents uriComponents = b.path("/posts/{id}").buildAndExpand(p.getId());
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/posts", method = RequestMethod.GET)
    public Iterable<BlogPost> fetchPosts() {
        return postRepository.findAll();
    }

    @RequestMapping(value = "/posts/{postId}", method = RequestMethod.GET)
    public Optional<BlogPost> fetchPost(@PathVariable int postId) {
        return postRepository.findById(postId);
    }

    @RequestMapping(value = "/posts/{postId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deletePost(@PathVariable int postId) {
        postRepository.deleteById(postId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}

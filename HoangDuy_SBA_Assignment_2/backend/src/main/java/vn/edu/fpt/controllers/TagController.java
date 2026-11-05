// DuyDLH-CE200667
package vn.edu.fpt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.entity.Tag;
import vn.edu.fpt.services.ITagService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/tags")
public class TagController {

    @Autowired
    private ITagService tagService;

    @GetMapping
    public List<Tag> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/{id}")
    public Tag getTagById(@PathVariable("id") Integer id) {
        return tagService.getTagById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tag createTag(@RequestBody Tag tag) {
        return tagService.createTag(tag);
    }

    @PutMapping("/{id}")
    public Tag updateTag(@PathVariable("id") Integer id, @RequestBody Tag tag) {
        return tagService.updateTag(id, tag);
    }

    @DeleteMapping("/{id}")
    public String deleteTag(@PathVariable("id") Integer id) {
        tagService.deleteTag(id);
        return "Tag deleted successfully!";
    }

    @GetMapping("/search")
    public List<Tag> searchTags(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return tagService.searchTags(keyword);
    }
}

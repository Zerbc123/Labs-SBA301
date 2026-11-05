// DuyDLH-CE200667
package vn.edu.fpt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import vn.edu.fpt.entity.Tag;
import vn.edu.fpt.repositories.ITagRepository;

import java.util.List;

@Service
public class TagService implements ITagService {

    @Autowired
    private ITagRepository tagRepository;

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public Tag getTagById(Integer id) {
        return tagRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tag not found with ID: " + id));
    }

    @Override
    public Tag createTag(Tag tag) {
        if (tag.getTagName() == null || tag.getTagName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tag Name is required!");
        }
        if (tag.getTagID() == null || tag.getTagID() <= 0) {
            Integer maxId = tagRepository.findMaxTagID();
            tag.setTagID(maxId + 1);
        }
        return tagRepository.save(tag);
    }

    @Override
    public Tag updateTag(Integer id, Tag tag) {
        Tag existing = getTagById(id);
        if (tag.getTagName() != null) {
            existing.setTagName(tag.getTagName());
        }
        if (tag.getNote() != null) {
            existing.setNote(tag.getNote());
        }
        return tagRepository.save(existing);
    }

    @Override
    public void deleteTag(Integer id) {
        if (!tagRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tag not found with ID: " + id);
        }
        tagRepository.deleteById(id);
    }

    @Override
    public List<Tag> searchTags(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return tagRepository.findAll();
        }
        return tagRepository.findByTagNameContainingIgnoreCase(keyword.trim());
    }
}

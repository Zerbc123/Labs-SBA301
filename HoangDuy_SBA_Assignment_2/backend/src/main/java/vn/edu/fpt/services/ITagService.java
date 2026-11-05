// DuyDLH-CE200667
package vn.edu.fpt.services;

import vn.edu.fpt.entity.Tag;

import java.util.List;

public interface ITagService {

    List<Tag> getAllTags();

    Tag getTagById(Integer id);

    Tag createTag(Tag tag);

    Tag updateTag(Integer id, Tag tag);

    void deleteTag(Integer id);

    List<Tag> searchTags(String keyword);
}

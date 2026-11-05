// DuyDLH-CE200667
package vn.edu.fpt.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.entity.Tag;

import java.util.List;

@Repository
public interface ITagRepository extends JpaRepository<Tag, Integer> {

    List<Tag> findByTagNameContainingIgnoreCase(String keyword);

    @Query("SELECT COALESCE(MAX(t.tagID), 0) FROM Tag t")
    Integer findMaxTagID();
}


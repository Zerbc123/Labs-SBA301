// DuyDLH-CE200667
package vn.edu.fpt.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.entity.Category;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Short> {

    List<Category> findByCategoryNameContainingIgnoreCase(String keyword);

    List<Category> findByIsActiveTrue();
}


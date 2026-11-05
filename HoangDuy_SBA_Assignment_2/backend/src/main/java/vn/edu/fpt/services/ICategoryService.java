// DuyDLH-CE200667
package vn.edu.fpt.services;

import vn.edu.fpt.entity.Category;

import java.util.List;

public interface ICategoryService {

    List<Category> getAllCategories();

    List<Category> getActiveCategories();

    Category getCategoryById(Short id);

    Category createCategory(Category category);

    Category updateCategory(Short id, Category category);

    void deleteCategory(Short id);

    List<Category> searchCategories(String keyword);
}

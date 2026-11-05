// DuyDLH-CE200667
package vn.edu.fpt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.entity.Category;
import vn.edu.fpt.services.ICategoryService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/active")
    public List<Category> getActiveCategories() {
        return categoryService.getActiveCategories();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable("id") Short id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable("id") Short id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable("id") Short id) {
        categoryService.deleteCategory(id);
        return "Category deleted successfully!";
    }

    @GetMapping("/search")
    public List<Category> searchCategories(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return categoryService.searchCategories(keyword);
    }
}

// DuyDLH-CE200667
package vn.edu.fpt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.dtos.NewsArticleRequest;
import vn.edu.fpt.entity.NewsArticle;
import vn.edu.fpt.services.INewsArticleService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/news")
public class NewsArticleController {

    @Autowired
    private INewsArticleService newsArticleService;

    // 1. Get all news articles
    @GetMapping
    public List<NewsArticle> getAllNews() {
        return newsArticleService.getAllNews();
    }

    // 2. Public endpoint: view active news without authentication
    @GetMapping("/active")
    public List<NewsArticle> getActiveNews() {
        return newsArticleService.getActiveNews();
    }

    // 3. Get news article by ID
    @GetMapping("/{id}")
    public NewsArticle getNewsById(@PathVariable("id") String id) {
        return newsArticleService.getNewsById(id);
    }

    // 4. View news history created by specific staff account
    @GetMapping("/history/{accountId}")
    public List<NewsArticle> getNewsByCreator(@PathVariable("accountId") Short accountId) {
        return newsArticleService.getNewsByCreatedBy(accountId);
    }

    // 5. Create new news article
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NewsArticle createNews(@RequestBody NewsArticleRequest request) {
        return newsArticleService.createNews(request);
    }

    // 6. Update existing news article
    @PutMapping("/{id}")
    public NewsArticle updateNews(@PathVariable("id") String id, @RequestBody NewsArticleRequest request) {
        return newsArticleService.updateNews(id, request);
    }

    // 7. Delete news article
    @DeleteMapping("/{id}")
    public String deleteNews(@PathVariable("id") String id) {
        newsArticleService.deleteNews(id);
        return "News article deleted successfully!";
    }

    // 8. Search news by keyword
    @GetMapping("/search")
    public List<NewsArticle> searchNews(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return newsArticleService.searchNews(keyword);
    }
}

// DuyDLH-CE200667
package vn.edu.fpt.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import vn.edu.fpt.dtos.NewsArticleRequest;
import vn.edu.fpt.entity.Category;
import vn.edu.fpt.entity.NewsArticle;
import vn.edu.fpt.entity.SystemAccount;
import vn.edu.fpt.entity.Tag;
import vn.edu.fpt.repositories.ICategoryRepository;
import vn.edu.fpt.repositories.INewsArticleRepository;
import vn.edu.fpt.repositories.ISystemAccountRepository;
import vn.edu.fpt.repositories.ITagRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class NewsArticleService implements INewsArticleService {

    @Autowired
    private INewsArticleRepository newsArticleRepository;

    @Autowired
    private ICategoryRepository categoryRepository;

    @Autowired
    private ISystemAccountRepository accountRepository;

    @Autowired
    private ITagRepository tagRepository;

    @Override
    public List<NewsArticle> getAllNews() {
        return newsArticleRepository.findAll();
    }

    @Override
    public List<NewsArticle> getActiveNews() {
        return newsArticleRepository.findByNewsStatusTrue();
    }

    @Override
    public NewsArticle getNewsById(String id) {
        return newsArticleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "News article not found with ID: " + id));
    }

    @Override
    public List<NewsArticle> getNewsByCreatedBy(Short accountId) {
        return newsArticleRepository.findByCreatedBy_AccountID(accountId);
    }

    @Override
    @Transactional
    public NewsArticle createNews(NewsArticleRequest request) {
        if (request.getNewsTitle() == null || request.getNewsTitle().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "News Title is required!");
        }

        NewsArticle news = new NewsArticle();

        // 1. Generate ID if not provided
        if (request.getNewsArticleID() != null && !request.getNewsArticleID().trim().isEmpty()) {
            news.setNewsArticleID(request.getNewsArticleID().trim());
        } else {
            news.setNewsArticleID(generateNextNewsId());
        }

        // 2. Set Basic Fields
        news.setNewsTitle(request.getNewsTitle());
        news.setHeadline(request.getHeadline() != null && !request.getHeadline().trim().isEmpty()
                ? request.getHeadline() : request.getNewsTitle());
        news.setNewsContent(request.getNewsContent());
        news.setNewsSource(request.getNewsSource());
        news.setNewsStatus(request.getNewsStatus() != null ? request.getNewsStatus() : true);
        news.setCreatedDate(LocalDateTime.now());
        news.setModifiedDate(LocalDateTime.now());

        // 3. Category relationship
        if (request.getCategoryID() != null) {
            Optional<Category> cat = categoryRepository.findById(request.getCategoryID());
            cat.ifPresent(news::setCategory);
        }

        // 4. CreatedBy relationship
        if (request.getCreatedByID() != null) {
            Optional<SystemAccount> acc = accountRepository.findById(request.getCreatedByID());
            acc.ifPresent(news::setCreatedBy);
        }

        news.setUpdatedByID(request.getUpdatedByID());

        // 5. Tags relationship
        if (request.getTagIDs() != null && !request.getTagIDs().isEmpty()) {
            List<Tag> tags = tagRepository.findAllById(request.getTagIDs());
            news.setTags(new HashSet<>(tags));
        }

        return newsArticleRepository.save(news);
    }

    @Override
    @Transactional
    public NewsArticle updateNews(String id, NewsArticleRequest request) {
        NewsArticle existing = getNewsById(id);

        if (request.getNewsTitle() != null) {
            existing.setNewsTitle(request.getNewsTitle());
        }
        if (request.getHeadline() != null) {
            existing.setHeadline(request.getHeadline());
        }
        if (request.getNewsContent() != null) {
            existing.setNewsContent(request.getNewsContent());
        }
        if (request.getNewsSource() != null) {
            existing.setNewsSource(request.getNewsSource());
        }
        if (request.getNewsStatus() != null) {
            existing.setNewsStatus(request.getNewsStatus());
        }

        existing.setModifiedDate(LocalDateTime.now());

        if (request.getUpdatedByID() != null) {
            existing.setUpdatedByID(request.getUpdatedByID());
        }

        if (request.getCategoryID() != null) {
            Optional<Category> cat = categoryRepository.findById(request.getCategoryID());
            cat.ifPresent(existing::setCategory);
        }

        if (request.getTagIDs() != null) {
            List<Tag> tags = tagRepository.findAllById(request.getTagIDs());
            existing.setTags(new HashSet<>(tags));
        }

        return newsArticleRepository.save(existing);
    }

    @Override
    @Transactional
    public void deleteNews(String id) {
        if (!newsArticleRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "News article not found with ID: " + id);
        }
        newsArticleRepository.deleteNewsTagsByArticleId(id);
        newsArticleRepository.deleteById(id);
    }

    @Override
    public List<NewsArticle> searchNews(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return newsArticleRepository.findAll();
        }
        return newsArticleRepository.searchNews(keyword.trim());
    }

    private String generateNextNewsId() {
        List<NewsArticle> list = newsArticleRepository.findAll();
        int max = 0;
        for (NewsArticle n : list) {
            try {
                int idNum = Integer.parseInt(n.getNewsArticleID());
                if (idNum > max) {
                    max = idNum;
                }
            } catch (NumberFormatException ignored) {
            }
        }
        return String.valueOf(max + 1);
    }
}

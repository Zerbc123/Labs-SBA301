// DuyDLH-CE200667
package vn.edu.fpt.services;

import vn.edu.fpt.dtos.NewsArticleRequest;
import vn.edu.fpt.entity.NewsArticle;

import java.util.List;

public interface INewsArticleService {

    List<NewsArticle> getAllNews();

    List<NewsArticle> getActiveNews();

    NewsArticle getNewsById(String id);

    List<NewsArticle> getNewsByCreatedBy(Short accountId);

    NewsArticle createNews(NewsArticleRequest request);

    NewsArticle updateNews(String id, NewsArticleRequest request);

    void deleteNews(String id);

    List<NewsArticle> searchNews(String keyword);
}

// DuyDLH-CE200667
package vn.edu.fpt.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.fpt.entity.NewsArticle;

import java.util.List;

@Repository
public interface INewsArticleRepository extends JpaRepository<NewsArticle, String> {

    List<NewsArticle> findByNewsStatusTrue();

    List<NewsArticle> findByCreatedBy_AccountID(Short accountID);

    boolean existsByCreatedBy_AccountID(Short accountID);

    boolean existsByCategory_CategoryID(Short categoryID);

    @Query("SELECT n FROM NewsArticle n WHERE " +
           "LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :kw, '%')) OR " +
           "LOWER(n.headline) LIKE LOWER(CONCAT('%', :kw, '%')) OR " +
           "LOWER(n.newsContent) LIKE LOWER(CONCAT('%', :kw, '%'))")
    List<NewsArticle> searchNews(@Param("kw") String keyword);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM NewsTag WHERE NewsArticleID = :id", nativeQuery = true)
    void deleteNewsTagsByArticleId(@Param("id") String id);
}

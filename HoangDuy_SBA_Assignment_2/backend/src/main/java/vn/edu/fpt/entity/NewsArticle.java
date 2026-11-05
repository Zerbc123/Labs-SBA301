// DuyDLH-CE200667
package vn.edu.fpt.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "NewsArticle")
public class NewsArticle implements Serializable {

    @Id
    @Column(name = "NewsArticleID", length = 20)
    private String newsArticleID;

    @Column(name = "NewsTitle", length = 400)
    private String newsTitle;

    @Column(name = "Headline", nullable = false, length = 150)
    private String headline;

    @Column(name = "CreatedDate")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdDate;

    @Column(name = "NewsContent", length = 4000)
    private String newsContent;

    @Column(name = "NewsSource", length = 400)
    private String newsSource;

    @ManyToOne
    @JoinColumn(name = "CategoryID")
    private Category category;

    @Column(name = "NewsStatus")
    private Boolean newsStatus; // true = Active (1), false = Inactive (0)

    @ManyToOne
    @JoinColumn(name = "CreatedByID")
    private SystemAccount createdBy;

    @Column(name = "UpdatedByID")
    private Short updatedByID;

    @Column(name = "ModifiedDate")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifiedDate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "NewsTag",
        joinColumns = @JoinColumn(name = "NewsArticleID"),
        inverseJoinColumns = @JoinColumn(name = "TagID")
    )
    private Set<Tag> tags = new HashSet<>();

    public NewsArticle() {
    }

    public NewsArticle(String newsArticleID, String newsTitle, String headline, LocalDateTime createdDate,
                       String newsContent, String newsSource, Category category, Boolean newsStatus,
                       SystemAccount createdBy, Short updatedByID, LocalDateTime modifiedDate) {
        this.newsArticleID = newsArticleID;
        this.newsTitle = newsTitle;
        this.headline = headline;
        this.createdDate = createdDate;
        this.newsContent = newsContent;
        this.newsSource = newsSource;
        this.category = category;
        this.newsStatus = newsStatus;
        this.createdBy = createdBy;
        this.updatedByID = updatedByID;
        this.modifiedDate = modifiedDate;
    }

    public String getNewsArticleID() {
        return newsArticleID;
    }

    public void setNewsArticleID(String newsArticleID) {
        this.newsArticleID = newsArticleID;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

    public String getNewsSource() {
        return newsSource;
    }

    public void setNewsSource(String newsSource) {
        this.newsSource = newsSource;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(Boolean newsStatus) {
        this.newsStatus = newsStatus;
    }

    public SystemAccount getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(SystemAccount createdBy) {
        this.createdBy = createdBy;
    }

    public Short getUpdatedByID() {
        return updatedByID;
    }

    public void setUpdatedByID(Short updatedByID) {
        this.updatedByID = updatedByID;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
}


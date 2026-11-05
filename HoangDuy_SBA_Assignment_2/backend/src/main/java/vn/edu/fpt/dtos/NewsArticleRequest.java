// DuyDLH-CE200667
package vn.edu.fpt.dtos;

import java.util.List;

public class NewsArticleRequest {

    private String newsArticleID;
    private String newsTitle;
    private String headline;
    private String newsContent;
    private String newsSource;
    private Short categoryID;
    private Boolean newsStatus;
    private Short createdByID;
    private Short updatedByID;
    private List<Integer> tagIDs;

    public NewsArticleRequest() {
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

    public Short getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Short categoryID) {
        this.categoryID = categoryID;
    }

    public Boolean getNewsStatus() {
        return newsStatus;
    }

    public void setNewsStatus(Boolean newsStatus) {
        this.newsStatus = newsStatus;
    }

    public Short getCreatedByID() {
        return createdByID;
    }

    public void setCreatedByID(Short createdByID) {
        this.createdByID = createdByID;
    }

    public Short getUpdatedByID() {
        return updatedByID;
    }

    public void setUpdatedByID(Short updatedByID) {
        this.updatedByID = updatedByID;
    }

    public List<Integer> getTagIDs() {
        return tagIDs;
    }

    public void setTagIDs(List<Integer> tagIDs) {
        this.tagIDs = tagIDs;
    }
}


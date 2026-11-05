// DuyDLH-CE200667
package vn.edu.fpt.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Category")
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Short categoryID;

    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "CategoryDesciption", nullable = false, length = 250)
    private String categoryDesciption;

    @Column(name = "ParentCategoryID")
    private Short parentCategoryID;

    @Column(name = "IsActive")
    private Boolean isActive;

    public Category() {
    }

    public Category(Short categoryID, String categoryName, String categoryDesciption, Short parentCategoryID, Boolean isActive) {
        this.categoryID = categoryID;
        this.categoryName = categoryName;
        this.categoryDesciption = categoryDesciption;
        this.parentCategoryID = parentCategoryID;
        this.isActive = isActive;
    }

    public Short getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(Short categoryID) {
        this.categoryID = categoryID;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryDesciption() {
        return categoryDesciption;
    }

    public void setCategoryDesciption(String categoryDesciption) {
        this.categoryDesciption = categoryDesciption;
    }

    public String getCategoryDescription() {
        return categoryDesciption;
    }

    public void setCategoryDescription(String description) {
        this.categoryDesciption = description;
    }

    public Short getParentCategoryID() {
        return parentCategoryID;
    }

    public void setParentCategoryID(Short parentCategoryID) {
        this.parentCategoryID = parentCategoryID;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}


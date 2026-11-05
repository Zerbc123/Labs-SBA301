-- Database creation and seed script for SBA301 Slot 22 Chapter 15 Part A
-- Case study: Category CRUD Backend

IF DB_ID('FUNewsManagementSBA301') IS NULL
BEGIN
    CREATE DATABASE FUNewsManagementSBA301;
END;
GO

USE FUNewsManagementSBA301;
GO

IF OBJECT_ID('dbo.Category','U') IS NULL
BEGIN
    CREATE TABLE dbo.Category(
        CategoryID SMALLINT IDENTITY(1,1) PRIMARY KEY,
        CategoryName NVARCHAR(100) NOT NULL,
        CategoryDesciption NVARCHAR(250) NOT NULL,
        ParentCategoryID SMALLINT NULL,
        IsActive BIT NULL
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Category)
BEGIN
    INSERT dbo.Category(CategoryName,CategoryDesciption,ParentCategoryID,IsActive)
    VALUES
    (N'Academic news',N'Academic announcements',NULL,1),
    (N'Student Affairs',N'Student activities and events',NULL,1),
    (N'Campus Safety',N'Campus safety information',NULL,1);
END;
GO

SELECT * FROM dbo.Category;

package com.fpt.sba301.slot22.service;

import com.fpt.sba301.slot22.dto.CategoryRequest;
import com.fpt.sba301.slot22.dto.CategoryResponse;
import com.fpt.sba301.slot22.entity.Category;
import com.fpt.sba301.slot22.exception.BusinessConflictException;
import com.fpt.sba301.slot22.exception.ResourceNotFoundException;
import com.fpt.sba301.slot22.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryServiceImpl service;

    private Category sampleCategory;

    @BeforeEach
    void setUp() {
        sampleCategory = new Category((short) 1, "Academic news", "Academic announcements", null, true);
    }

    @Test
    void getById_existing_returnsResponse() {
        when(repository.findById((short) 1)).thenReturn(Optional.of(sampleCategory));

        CategoryResponse result = service.getById((short) 1);

        assertNotNull(result);
        assertEquals((short) 1, result.categoryId());
        assertEquals("Academic news", result.categoryName());
    }

    @Test
    void getById_missing_throwsResourceNotFound() {
        when(repository.findById((short) 99)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> service.getById((short) 99));
    }

    @Test
    void create_duplicateName_throwsBusinessConflict() {
        CategoryRequest request = new CategoryRequest("Academic news", "Some description", null, true);
        when(repository.existsByCategoryNameIgnoreCase("Academic news")).thenReturn(true);

        assertThrows(BusinessConflictException.class, () -> service.create(request));
        verify(repository, never()).save(any(Category.class));
    }

    @Test
    void create_valid_savesAndReturnsResponse() {
        CategoryRequest request = new CategoryRequest("New Unique Name", "Some description", null, true);
        when(repository.existsByCategoryNameIgnoreCase("New Unique Name")).thenReturn(false);

        Category savedCategory = new Category((short) 10, "New Unique Name", "Some description", null, true);
        when(repository.save(any(Category.class))).thenReturn(savedCategory);

        CategoryResponse response = service.create(request);

        assertNotNull(response);
        assertEquals((short) 10, response.categoryId());
        assertEquals("New Unique Name", response.categoryName());
        verify(repository, times(1)).save(any(Category.class));
    }

    @Test
    void update_existing_savesSuccessfully() {
        CategoryRequest request = new CategoryRequest("Updated Name", "Updated Description", null, true);
        when(repository.findById((short) 1)).thenReturn(Optional.of(sampleCategory));
        when(repository.save(any(Category.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CategoryResponse response = service.update((short) 1, request);

        assertNotNull(response);
        assertEquals("Updated Name", response.categoryName());
        assertEquals("Updated Description", response.categoryDescription());
        verify(repository, times(1)).save(any(Category.class));
    }

    @Test
    void delete_existing_deletesSuccessfully() {
        when(repository.findById((short) 1)).thenReturn(Optional.of(sampleCategory));

        assertDoesNotThrow(() -> service.delete((short) 1));
        verify(repository, times(1)).delete(sampleCategory);
    }

    @Test
    void delete_missing_throwsResourceNotFound() {
        when(repository.findById((short) 99)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> service.delete((short) 99));
        verify(repository, never()).delete(any(Category.class));
    }
}

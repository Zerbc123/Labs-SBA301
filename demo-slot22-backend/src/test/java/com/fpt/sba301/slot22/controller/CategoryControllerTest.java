package com.fpt.sba301.slot22.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpt.sba301.slot22.dto.CategoryRequest;
import com.fpt.sba301.slot22.dto.CategoryResponse;
import com.fpt.sba301.slot22.exception.BusinessConflictException;
import com.fpt.sba301.slot22.exception.ResourceNotFoundException;
import com.fpt.sba301.slot22.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CategoryController.class)
class CategoryControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CategoryService service;

    @Test
    void getMissing_returns404() throws Exception {
        when(service.getById((short) 99))
                .thenThrow(new ResourceNotFoundException("Category 99 not found"));

        mvc.perform(get("/api/categories/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("NOT_FOUND"));
    }

    @Test
    void getExisting_returns200() throws Exception {
        CategoryResponse response = new CategoryResponse((short) 1, "Academic news", "Academic announcements", null, true);
        when(service.getById((short) 1)).thenReturn(response);

        mvc.perform(get("/api/categories/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryId").value(1))
                .andExpect(jsonPath("$.categoryName").value("Academic news"));
    }

    @Test
    void createValid_returns201() throws Exception {
        CategoryRequest request = new CategoryRequest("Technology News", "Tech descriptions", null, true);
        CategoryResponse response = new CategoryResponse((short) 4, "Technology News", "Tech descriptions", null, true);
        when(service.create(any(CategoryRequest.class))).thenReturn(response);

        mvc.perform(post("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.categoryId").value(4))
                .andExpect(jsonPath("$.categoryName").value("Technology News"));
    }

    @Test
    void createInvalid_returns400() throws Exception {
        CategoryRequest invalidRequest = new CategoryRequest("", "", null, true);

        mvc.perform(post("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("BAD_REQUEST"));
    }

    @Test
    void createDuplicate_returns409() throws Exception {
        CategoryRequest request = new CategoryRequest("Academic news", "Duplicate announcements", null, true);
        when(service.create(any(CategoryRequest.class)))
                .thenThrow(new BusinessConflictException("Category name already exists"));

        mvc.perform(post("/api/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("CONFLICT"));
    }

    @Test
    void deleteExisting_returns204() throws Exception {
        mvc.perform(delete("/api/categories/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void deleteMissing_returns404() throws Exception {
        doThrow(new ResourceNotFoundException("Category 99 not found"))
                .when(service).delete((short) 99);

        mvc.perform(delete("/api/categories/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value("NOT_FOUND"));
    }
}

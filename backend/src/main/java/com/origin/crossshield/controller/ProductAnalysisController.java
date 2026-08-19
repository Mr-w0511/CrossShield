package com.origin.crossshield.controller;

import com.origin.crossshield.model.Result;
import com.origin.crossshield.service.ProductAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductAnalysisController {

    @Autowired
    private ProductAnalysisService productAnalysisService;

    @PostMapping("/analyze")
    public Result<Map<String, Object>> analyzeProduct(@RequestBody Map<String, String> request) {
        String category = request.get("category");
        Map<String, Object> analysis = productAnalysisService.analyzeProduct(category);
        return Result.ok(analysis);
    }
}

package com.origin.crossshield.controller;

import com.origin.crossshield.model.Result;
import com.origin.crossshield.service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {

    @Autowired
    private ReviewsService reviewsService;

    @PostMapping("/analyze")
    public Result<Map<String, Object>> analyzeReviews(@RequestBody Map<String, String> request) {
        String asinOrUrl = request.get("asinOrUrl");
        Map<String, Object> insight = reviewsService.analyzeReviews(asinOrUrl);
        return Result.ok(insight);
    }
}

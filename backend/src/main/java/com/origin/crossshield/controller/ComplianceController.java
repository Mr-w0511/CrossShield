package com.origin.crossshield.controller;

import com.origin.crossshield.model.Result;
import com.origin.crossshield.service.ComplianceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/compliance")
public class ComplianceController {

    @Autowired
    private ComplianceService complianceService;

    @PostMapping("/check")
    public Result<Map<String, Object>> checkCompliance(@RequestBody Map<String, String> request) {
        String productName = request.get("productName");
        String market = request.get("market");
        Map<String, Object> report = complianceService.checkCompliance(productName, market);
        return Result.ok(report);
    }
}

package com.campusguardian.backend.incident.controller;

import com.campusguardian.backend.incident.dto.IncidentIngestRequest;
import com.campusguardian.backend.incident.entity.Incident;
import com.campusguardian.backend.incident.service.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    // Python Dev posts here
    @PostMapping("/internal/ingest")
    public ResponseEntity<?> ingestIncident(@RequestBody IncidentIngestRequest request) {
        Incident saved = incidentService.saveAndProcessIncident(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Admin fetches active tickets
    @GetMapping("/admin/all")
    public ResponseEntity<List<Incident>> getAllIncidents() {
        return ResponseEntity.ok(incidentService.getAllActiveIncidents());
    }

    // Admin marks complete -> deleted from DB
    @DeleteMapping("/admin/{ticketId}/complete")
    public ResponseEntity<String> completeAndRemoveIncident(@PathVariable String ticketId) {
        incidentService.deleteIncident(ticketId);
        return ResponseEntity.ok("Incident " + ticketId + " completed and removed from database.");
    }
}
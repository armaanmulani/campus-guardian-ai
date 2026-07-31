package com.campusguardian.backend.incident.service;

import com.campusguardian.backend.incident.dto.IncidentIngestRequest;
import com.campusguardian.backend.incident.entity.Incident;
import com.campusguardian.backend.incident.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository incidentRepository;

    @Transactional
    public Incident saveAndProcessIncident(IncidentIngestRequest request) {
        IncidentIngestRequest.IncidentDto dto = request.getIncident();

        Incident incident = Incident.builder()
                .ticketId(dto.getTicketId())
                .userId(request.getUserId()) // <--- Retrieves userId from request body
                .location(dto.getLocation())
                .category(dto.getCategory())
                .shortSummary(dto.getShortSummary())
                .actionToBeForStudent(dto.getActionToBeForStudent())
                .actionToBeForAdmin(dto.getActionToBeForAdmin())
                .nodeId(dto.getNodeId())
                .severity(dto.getSeverity())
                .priority(dto.getPriority())
                .department(dto.getDepartment())
                .sla(dto.getSla())
                .status(dto.getStatus())
                .build();

        return incidentRepository.save(incident);
    }

    public List<Incident> getAllActiveIncidents() {
        return incidentRepository.findAll();
    }

    @Transactional
    public void deleteIncident(String ticketId) {
        if (!incidentRepository.existsById(ticketId)) {
            throw new RuntimeException("Incident not found with ID: " + ticketId);
        }
        incidentRepository.deleteById(ticketId);
    }
}
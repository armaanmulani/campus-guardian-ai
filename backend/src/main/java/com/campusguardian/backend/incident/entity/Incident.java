package com.campusguardian.backend.incident.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incident {

    @Id
    @Column(name = "ticket_id", nullable = false, unique = true)
    private String ticketId; // e.g. "INC-9F266E05"

    @Column(name = "user_id", nullable = false)
    private String userId;

    private String location;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String shortSummary;

    @Column(columnDefinition = "TEXT")
    private String actionToBeForStudent;

    @Column(columnDefinition = "TEXT")
    private String actionToBeForAdmin;

    private String nodeId;
    private String severity;
    private String priority;
    private String department;
    private String sla;
    private String status;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
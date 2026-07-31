package com.campusguardian.backend.incident.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidentIngestRequest {

    @JsonProperty("user_id")
    private String userId;

    private IncidentDto incident;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IncidentDto {
        @JsonProperty("ticket_id")
        private String ticketId;

        private String location;
        private String category;

        @JsonProperty("short_summary")
        private String shortSummary;

        @JsonProperty("action_to_be_for_student")
        private String actionToBeForStudent;

        @JsonProperty("action_to_be_for_admin")
        private String actionToBeForAdmin;

        @JsonProperty("node_id")
        private String nodeId;

        private String severity;
        private String priority;
        private String department;
        private String sla;
        private String status;
    }
}
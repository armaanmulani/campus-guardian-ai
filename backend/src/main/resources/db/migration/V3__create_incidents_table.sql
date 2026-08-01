CREATE TABLE incidents (
    ticket_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    category VARCHAR(255),
    short_summary TEXT,
    action_to_be_for_student TEXT,
    action_to_be_for_admin TEXT,
    node_id VARCHAR(255),
    severity VARCHAR(255),
    priority VARCHAR(255),
    department VARCHAR(255),
    sla VARCHAR(255),
    status VARCHAR(255),
    created_at TIMESTAMP WITHOUT TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_incidents_user_id ON incidents(user_id);
CREATE INDEX idx_incidents_status ON incidents(status);
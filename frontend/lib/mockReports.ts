export interface Report {
  id: string;
  description: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location: string;
  nodeId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  time: string;
  imageUrl?: string;
}

export const MOCK_REPORTS: Report[] = [
  {
    id: "INC-101",
    description: "Huge water puddle near Block C staircase. Extremely slippery!",
    category: "Water Leakage",
    severity: "High",
    location: "Block C Staircase (2nd Floor)",
    nodeId: "Node_27",
    status: "PENDING",
    time: "2 mins ago",
    imageUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=500&q=80"
  },
  {
    id: "INC-102",
    description: "Lift B is making loud grinding noises and stuck on floor 2.",
    category: "Broken Lift",
    severity: "Critical",
    location: "Academic Block Lift B",
    nodeId: "Node_14",
    status: "PENDING",
    time: "10 mins ago"
  },
  {
    id: "INC-103",
    description: "Path blocked due to ongoing tile construction work.",
    category: "Construction",
    severity: "Medium",
    location: "Central Library Walkway",
    nodeId: "Node_09",
    status: "APPROVED",
    time: "1 hour ago"
  }
];
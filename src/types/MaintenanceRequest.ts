export interface MaintenanceRequest {
    maintenancerequest_ID?: number;
    tenant_ID: number;
    property_ID: number;
    RequestDate: string; // Assuming it will be handled as a string for dates
    Description: string;
    Status: 'Open' | 'In Progress' | 'Completed'; // Enum-like constraint
  }
  
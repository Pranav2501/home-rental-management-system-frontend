export interface Application {
    application_ID?: number;
    tenant_ID: number;
    property_ID: number;
    ApplicationDate: string; // Assuming it will be handled as a string for dates
    ApplicationStatus: 'Pending' | 'Approved' | 'Rejected'; // Enum-like constraint
    TenantName?: string; // Optional field for display purposes
    PropertyAddress?: string; // Optional field for display purposes
  }
  
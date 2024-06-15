export interface CompanyData {
  id: string
  companyID: string
  companyName: string
  companyDescription: string
  industryType: string
  contactEmail: string
  contactPhone: string
  websiteURL: string
  location: string
  members: {
    displayName: string
    uid: string
    email: string
  }[]
  // Add any other fields as necessary
}

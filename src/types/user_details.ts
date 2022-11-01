// Metadata for auth user
export interface UserDetails {
  id?: string;
  user_id?: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email?: string;
  is_admin: false;
  address1: string;
  address2?: string;
  country?: string;
  county: string;
  city?: string;
  zip?: string;
  created_on?: string;
  last_login?: string;
  avatarUrl?: string;
}

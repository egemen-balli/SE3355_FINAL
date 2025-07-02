export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  country?: string;
  city?: string;
  photo_url?: string;
  google_id?: string;
  created_at: Date;
}

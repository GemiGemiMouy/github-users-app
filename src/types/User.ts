export interface User {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  company: string | null;
  followers: number;
  following: number;
  html_url: string; // <- Add this
}

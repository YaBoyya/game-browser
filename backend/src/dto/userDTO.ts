export interface UserDTO {
  _id: string;
  username: string;
  email: string;
  password: string;
  status: 'active' | 'inactive';
  owned_games?: { game_id: string; added_date: Date }[];
  role: 'admin' | 'user';
  created_at: Date;
}
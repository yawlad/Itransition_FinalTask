type User = {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  is_blocked: boolean;
  date_joined: string;
};

export default User;

import Collection from "./Collection";

type User = {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
  is_blocked: boolean;
  date_joined: string;
  collections: Collection[];
};

export interface PutUserData {
  username: string;
  email: string;
  new_password: string;
}

export default User;

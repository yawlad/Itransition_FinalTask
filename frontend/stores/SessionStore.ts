import User from "@/types/User";
import { makeAutoObservable } from "mobx";

class SessionStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User | null) {
    this.user = user;
  }

  getUser() {
    return this.user as User;
  }

  isLoggedIn() {
    return !!this.user;
  }

  isSuperUser() {
    return this.user?.is_superuser;
  }
}

const sessionStore = new SessionStore();

export default sessionStore;

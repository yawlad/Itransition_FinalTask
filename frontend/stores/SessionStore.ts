import CollectionService from "@/services/CollectionService";
import Collection from "@/types/Collection";
import CollectionTheme from "@/types/CollectionTheme";
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

  deleteCollection(id: number) {
    if (this.user) {
      this.user.collections = this.user?.collections.filter(
        (collection) => collection.id !== id
      );
    }
    this.user = this.user;
  }

  addCollection(coollection: Collection) {
    if (this.user) {
      this.user.collections.push(coollection);
    }
    this.user = this.user;
  }

  isUserOwnerOrSuperUser(userId: number) {
    return userId == this.user?.id || this.user?.is_superuser;
  }
}

const sessionStore = new SessionStore();

export default sessionStore;

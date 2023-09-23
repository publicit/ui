import jwtDecode from "jwt-decode";

export interface ISSOUser {
  email: string;
  token: string | undefined;
  avatarURL?: string;
  firstName: string;
  lastName: string;
}

function NewUser(): ISSOUser {
  return {
    avatarURL: "",
    lastName: "",
    firstName: "",
    email: "",
    token: undefined,
  };
}

export function SSOUserFromJWTToken(token: string | undefined): ISSOUser {
  const parsed = jwtDecode<any>(token || "");
  return {
    avatarURL: parsed?.picture,
    email: parsed?.email,
    firstName: parsed?.given_name,
    lastName: parsed?.family_name,
    token,
  };
}

interface IStore {
  getItem(key: string): string | null;

  clear(): void;

  setItem(key: string, value: string): void;

  removeItem(key: string): void;
}

export class UserStore {
  readonly UserKey = "user_data";
  store: IStore;

  constructor() {
    this.store = sessionStorage;
  }

  save(user: ISSOUser): void {
    this.store.setItem(this.UserKey, JSON.stringify(user));
  }

  load(): ISSOUser | undefined {
    const data = this.store.getItem(this.UserKey);
    if (!data) return;
    return JSON.parse(data);
  }

  remove(): void {
    this.store.removeItem(this.UserKey);
  }

  isLoggedIn(): boolean {
    return !!this.load();
  }
}

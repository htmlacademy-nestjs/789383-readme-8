import {AuthUser, Entity, StorableEntity, UserRole} from "@project/core";
import { compare, genSalt, hash } from 'bcrypt';
import {SALT_ROUNDS} from "./blog-user.constant";


export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public firstname: string;
  public avatar?: string;
  public role: UserRole;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstname = user.firstname;
    this.avatar = user?.avatar;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      avatar: this.avatar,
      role: this.role,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}

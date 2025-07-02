import { Entity, Fields } from "remult";

@Entity("users", {
  allowApiCrud: false
})
export class AppUser {
  @Fields.autoIncrement()
  id!: number;

  @Fields.string()
  email!: string;

  @Fields.string()
  name!: string;

  @Fields.string()
  password_hash?: string;

  @Fields.string()
  country?: string;

  @Fields.string()
  city?: string;

  @Fields.string()
  photo_url?: string;

  @Fields.createdAt()
  created_at?: Date;
}

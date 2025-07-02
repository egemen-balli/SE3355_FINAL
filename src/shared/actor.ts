import { Entity, Fields } from "remult";

@Entity("actors", { allowApiCrud: true })
export class Actor {
    @Fields.autoIncrement()
    id: number | undefined;

    @Fields.string()
    name: string | undefined;

    @Fields.string()
    known_for: string | undefined;

    @Fields.string()
    photo_url: string | undefined;

    @Fields.createdAt()
    created_at?: Date;

    @Fields.updatedAt()
    updated_at?: Date;
}
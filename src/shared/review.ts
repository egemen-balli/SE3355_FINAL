import { Entity, Fields } from "remult";

@Entity("reviews", { allowApiCrud: true })
export class Review {
    @Fields.autoIncrement()
    id: number | undefined;

    @Fields.string()
    title: string | undefined;

    @Fields.string({ allowNull: true })
    description?: string;

    @Fields.number()
    rating!: number;

    @Fields.integer()
    user_id!: number;

    @Fields.createdAt()
    created_at?: Date;

    @Fields.updatedAt()
    updated_at?: Date;

    @Fields.number()
    movie_id: number | undefined;

    @Fields.string()
    country: string | undefined;
}
import { Entity, Fields } from "remult";

@Entity("movies", { allowApiCrud: true })
export class Movie {
    @Fields.autoIncrement()
    id: number | undefined;

    @Fields.string()
    title: string | undefined;

    @Fields.string({ allowNull: true })
    description?: string;

    @Fields.integer({ allowNull: true })
    release_year?: number;

    @Fields.string({ allowNull: true })
    director?: string;

    @Fields.string({ allowNull: true })
    poster_url?: string;

    @Fields.json({ allowNull: true })
    cast_list?: string[];

    @Fields.number({ allowNull: true })
    rating?: number;

    @Fields.createdAt()
    created_at?: Date;

    @Fields.updatedAt()
    updated_at?: Date;

    @Fields.string()
    trailer_url?: string;

    @Fields.string()
    trailer_thumbnail?: string;

    @Fields.number()
    popularity: number | undefined;
}
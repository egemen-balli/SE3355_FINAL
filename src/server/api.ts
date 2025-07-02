import { remultApi } from "remult/remult-express";
import { Movie } from "../shared/movie";
import { Actor } from "../shared/actor";
import { Review } from "../shared/review";
import { AppUser } from "../shared/user";
import { MoviesController } from "../shared/MoviesController";
import { ActorsController } from "../shared/ActorsController";
import { ReviewsController } from "../shared/ReviewsController";
import { createPostgresConnection } from "remult/postgres";
import { remult } from "remult";


export const api = remultApi({
    entities: [Movie, Actor, Review, AppUser],
    controllers: [MoviesController, ActorsController, ReviewsController],
    getUser: async (req) => {
    if (!req.session?.userId) return undefined;

    const user = await remult.repo(AppUser).findId(req.session.userId);
    if (!user) return undefined;

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email
    };
  },
    dataProvider: createPostgresConnection({
        connectionString: "postgres://postgres:postgres@localhost/postgres",
    })
});
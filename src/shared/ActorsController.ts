import { Allow, BackendMethod, remult } from "remult";
import { Actor } from "./actor";

export class ActorsController {
    @BackendMethod({ allowed: true })
    static async searchActors(query: string) {
        const actorRepo = remult.repo(Actor);

        return actorRepo.find({
            where: {
                name: { $contains: query.toLowerCase() },
            },
            limit: 10,
            orderBy: { name: "asc" },
        });
    }
}
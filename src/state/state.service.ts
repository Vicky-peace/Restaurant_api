import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { State, TSState, TIState } from "../drizzle/schema";

export const getStatesService = async (limit?: number): Promise<TSState[]> => {
    if (limit) {
        return await db.query.State.findMany({
            limit: limit
        });
    }
    return await db.query.State.findMany();
};

export const getSingleStateService = async (id: number): Promise<TSState | null> => {
    const state = await db.query.State.findFirst({
        where: eq(State.id, id)
    });
    return state ?? null;
};

export const createStateService = async (state: TSState) => {
    await db.insert(State).values(state);
    return "State created successfully";
};

export const updateStateService = async (id: number, state: TIState) => {
    await db.update(State).set(state).where(eq(State.id, id));
    return "State updated successfully";
};

export const deleteStateService = async (id: number) => {
    await db.delete(State).where(eq(State.id, id));
    return "State deleted successfully";
};

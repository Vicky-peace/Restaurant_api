import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { Address, TSAddress, TIAddress } from "../drizzle/schema";

export const getAddressesService = async (limit?: number): Promise<TSAddress[]> => {
    if (limit) {
        return await db.query.Address.findMany({
            limit: limit
        });
    }
    return await db.query.Address.findMany();
};

export const getSingleAddressService = async (id: number): Promise<TSAddress | null> => {
    const address = await db.query.Address.findFirst({
        where: eq(Address.id, id)
    });
    return address ?? null;
};

export const createAddressService = async (address: TSAddress) => {
    await db.insert(Address).values(address);
    return "Address created successfully";
};

export const updateAddressService = async (id: number, address: TIAddress) => {
    await db.update(Address).set(address).where(eq(Address.id, id));
    return "Address updated successfully";
};

export const deleteAddressService = async (id: number) => {
    await db.delete(Address).where(eq(Address.id, id));
    return "Address deleted successfully";
};

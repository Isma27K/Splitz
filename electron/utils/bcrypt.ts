import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export async function hashText(text: string): Promise<string> {
    return bcrypt.hashSync(text, salt);
}

export async function verifyPassword(text: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(text, hash);
}
import * as Helpers from "@ioc:Adonis/Core/Helpers";

import { DateTime } from "luxon";
import crypto from "crypto";
import { Exception } from "@poppinss/utils";

import User from 'App/Models/User';
import Token from "App/Models/Token";
import Database from "@ioc:Adonis/Lucid/Database";

export default class TokenServices {
    private parsedToken: { tokenId: string; value: string };
    private expiresTokenIn: string = "1h";
    private tokenType: string = 'email_token';
    private dialect = Database.connection(Token.connection).dialect
    constructor(type: string) {
        this.tokenType = type
    }
    private getExpiresAtDate(expiresIn) {
        if (!expiresIn) return;
        if (!expiresIn) {
            return;
        }
        const milliseconds =
            typeof expiresIn === "string"
                ? Helpers.string.toMs(expiresIn)
                : expiresIn;
        return DateTime.local().plus({ milliseconds });
    }


    private createHash(token): string {
        return crypto.createHash("sha256").update(token).digest("hex");
    }

    private parseToken(tokenString, name): { tokenId: string; value: string } {
        tokenString = Helpers.base64.urlDecode(tokenString)
        let parts = tokenString.split('.')

        if (parts.length !== 2 || !parts[0] || !parts[1]) throw new InvalidTokenException(name);
        this.parsedToken = {
            tokenId: parts[0],
            value: parts[1],
        };
        return this.parsedToken;
    }

    private write(token: TokenContract<User>) {
        const payload = {
            user_id: token.user.id,
            name: token.name,
            token: token.tokenHash,
            type: this.tokenType,
            expires_at: token.expiresAt ? token.expiresAt.toFormat(this.dialect.dateTimeFormat) : null
        }
        return Token.create(payload)
    }

    private async read(tokenId, tokenHash) {
        const tokenRow = await Token.query().where('id', tokenId).where('type', this.tokenType).first()

        if (!tokenRow || !tokenRow.token) return null

        if (!Helpers.safeEqual(tokenRow.token, tokenHash)) return null;
        let normalizedExpiryDate;
        let { expiresAt } = tokenRow
        if (expiresAt instanceof Date) {
            normalizedExpiryDate = DateTime.fromJSDate(expiresAt);
        }
        else if (expiresAt && typeof expiresAt === 'string') {
            normalizedExpiryDate = DateTime.fromFormat(expiresAt, this.dialect.dateTimeFormat);
        }
        else if (expiresAt && typeof expiresAt === 'number') {
            normalizedExpiryDate = DateTime.fromMillis(expiresAt);
        }

        if (normalizedExpiryDate && normalizedExpiryDate.diff(DateTime.local(), 'millisecond').milliseconds <= 0) {
            await tokenRow.delete()
            return null;
        }
        return tokenRow;
    }

    public async create(user: User, name) {
        const rand_str = Helpers.string.generateRandom(60);
        const token: TokenContract<User> = {
            token: rand_str,
            tokenHash: this.createHash(rand_str),
            expiresIn: this.expiresTokenIn,
            expiresAt: this.getExpiresAtDate(this.expiresTokenIn),
            name: name,
            user
        }
        token.expiresAt;
        const { id: tokenId } = await this.write(token)
        token.token = Helpers.base64.urlEncode(`${tokenId}.${token.token}`);
        return token;
    }

    public async validate(token, name): Promise<UserToken> {
        if(!token) throw new InvalidTokenException(name)
        
        const { tokenId, value } = this.parseToken(token, name);
        
        const provided = await this.read(
            tokenId,
            this.createHash(value)
        );
        if (!provided) throw new InvalidTokenException(name);
        const user = await User.find(provided.userId) as UserToken
        if (!user) throw new InvalidUserException()
        return user;
    }

    public async revoke (user: User){
        await user.related('tokens').query().where('type', this.tokenType).delete()
        return true
    }
}

class InvalidTokenException extends Exception {
    constructor(name) {
        super("Invalid or Expired " + name, 400, "E_TOKEN_INVALID");
    }
}


class InvalidUserException extends Exception {
    constructor() {
        super('Invalid User', 400, 'E_USER_INVALID')
    }
}


export interface TokenContract<User extends any> {
    user: User;
    expiresAt?: DateTime;
    expiresIn?: string;
    name: string;
    token: string;
    tokenHash: string;
}

interface UserToken extends User {
    revokeToken(): void;
}
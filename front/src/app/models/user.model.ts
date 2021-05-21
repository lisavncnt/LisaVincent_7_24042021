export class User {
    public static fromJson(json: Object): User {
        return new User(
            json['id'],
            json['pseudo'],
            json['email'],
            json['password'],
            json['likes'],
            json['is_admin'],
            new Date(json['created_at']),
            new Date(json['updated_at'])
        );
    }

    constructor(public id: string,
                public pseudo: string,
                public email: string,
                public password: string,
                public likes: number,
                public is_admin: number,
                public created_at: Date,
                public updated_at: Date) {}
}
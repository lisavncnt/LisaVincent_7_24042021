export class Comment {
  constructor(
    public body: string,
    public user_id: string,
    public created_at: Date,
  ) {}
}

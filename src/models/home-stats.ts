export interface HomeStatsModel {
  posts: number;
  threads: number;
  users: number;
  lastUser: {
    id: string;
    username: string;
  };
}

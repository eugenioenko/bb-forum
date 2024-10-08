import Link from "next/link";

interface UserModel {
  id: string;
  username: string;
}

interface Props {
  user: UserModel;
}

export const UserLink = ({ user }: Props) => {
  return (
    <Link className="text-primary" href={`/user/${user.id}`}>
      {user.username}
    </Link>
  );
};

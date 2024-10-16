import Link from "next/link";

interface UserModel {
  id: string;
  username: string;
}

interface Props {
  user?: UserModel;
}

export const UserLink = ({ user }: Props) => {
  if (!user) {
    return "";
  }
  return (
    <Link className="text-primary" href={`/profile/${user.id}`}>
      {user.username}
    </Link>
  );
};

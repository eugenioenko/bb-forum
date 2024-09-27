import { UserModel } from "@/models/api-response";
import Link from "next/link";

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

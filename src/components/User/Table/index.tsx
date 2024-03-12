import { getUsersAction } from "@/lib/actions/userAction";
import { getAuthServerSession } from "@/lib/auth";
import { columns } from "./Columns";
import UserTableWrapper from "./UserTableWrapper";

export default async function UserTable() {
  const session = await getAuthServerSession();
  const users = await getUsersAction(session?.user.userId);
  return <UserTableWrapper data={users.data} columns={columns} />;
}

import { Layout } from "../layout";
import { RoleProvider } from "./hooks/useRoleContext";
import { UserTable } from "./components/UserTable";

export function User() {
  return (
    <Layout>
      <RoleProvider>
        <UserTable />
      </RoleProvider>
    </Layout>
  );
}

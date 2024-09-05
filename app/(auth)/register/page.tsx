import Content from "./content";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession();
  if (session) return redirect("/chats");

  return <Content />;
};

export default Register;

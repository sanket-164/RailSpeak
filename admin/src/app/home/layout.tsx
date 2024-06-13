import AuthCheck from "@/components/AuthCheck";
import Sidebar from "./_components/Sidebar";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <AuthCheck>
      <Sidebar />
      <div className="ml-0 md:ml-[350px]">{children}</div>
    </AuthCheck>
  );
};

export default HomeLayout;

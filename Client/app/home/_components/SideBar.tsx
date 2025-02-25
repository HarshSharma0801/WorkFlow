import { auth, signOut } from "@/auth";
import { SideIcons, TabsIcons, Add } from "@/public/icons/icons";
import Avatar from "@/public/avatar.jpg";
import Image from "next/image";
import { TaskBtn } from "./TaskButton";
const SideBar = async () => {
  const session = await auth();
  const user = session?.user;

  const LogOut = async () => {
    await signOut();
  };
  return (
    <>
      <div className="w-[20%] hidden xl:flex flex-col gap-4 p-6 border-r h-screen border-r-[#DEDEDE]">
        <div className="flex justify-start gap-4 items-center">
          <div className="w-[31px] h-[31px] rounded-[50%]">
            <Image
              src={Avatar}
              className="w-full h-full object-cover"
              alt="img"
            />
          </div>
          <div className="font-[500] text-[20px]">{user?.name}</div>
        </div>

        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <SideIcons />
          </div>

          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <button
              type="submit"
              className="p-[8px] bg-[#F4F4F4]  text-[#797979]"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="flex justify-center cursor-pointer">
          <TabsIcons />
        </div>
        <TaskBtn />
      </div>
    </>
  );
};

export default SideBar;

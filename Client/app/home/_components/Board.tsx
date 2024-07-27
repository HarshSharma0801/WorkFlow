import { auth } from "@/auth";
import { Info2, Info1, Info3 } from "@/public/icons/icons";
import Tasks from "./Tasks";
const Board = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <div className="flex justify-start flex-col gap-6  w-[80%] p-8 bg-[#F4F4F4] ">
        <div className="text-[48px] font-[600]">
          Good Morning, {user?.name} !
        </div>

        <div className="flex gap-2">
          <div className="bg-white p-[16px] flex gap-4 justify-center items-center rounded-[8px]">
            <div>
              <Info1 />
            </div>
            <div className="flex flex-col gap-[0]">
              <div className="text-[#757575] text-[16px] font-[600]">
                Introducing tags
              </div>
              <div className="text-[#868686] text-[14px] leading-[16px]">
                Easily categorize and find your notes by adding tags. Keep your
                workspace clutter-free and efficient.
              </div>
            </div>
          </div>
          <div className="bg-white p-[16px] flex gap-4 justify-center items-center rounded-[8px]">
            <div>
              <Info2 />
            </div>
            <div className="flex flex-col gap-[0]">
              <div className="text-[#757575] text-[16px] font-[600]">
                Share Notes Instantly
              </div>
              <div className="text-[#868686] text-[14px] leading-[16px]">
                Effortlessly share your notes with others via email or link.
                Enhance collaboration with quick sharing options.
              </div>
            </div>
          </div>
          <div className="bg-white p-[16px] flex gap-4 justify-center items-center rounded-[8px]">
            <div>
              <Info3 />
            </div>
            <div className="flex flex-col gap-[0]">
              <div className="text-[#757575] text-[16px] font-[600]">
                Access Anywhere
              </div>
              <div className="text-[#868686] text-[14px] leading-[16px]">
                Sync your notes across all devices. Stay productive whether
                you're on your phone, tablet, or computer.
              </div>
            </div>
          </div>
        </div>

        <div>
          <Tasks userId={user?.id} />
        </div>
      </div>
    </>
  );
};

export default Board;

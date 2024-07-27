"use client";
import { Add } from "@/public/icons/icons";
import { useModal } from "@/context/modalContext";

export const TaskBtn = () => {
  const { handleChange } = useModal();

  return (
    <>
      <div>
        <button
          onClick={() => {
            console.log("hjhjhjhjh")
            handleChange();
          }}
          className="w-full flex bg-custom-btn-gradient items-center gap-2 justify-center  p-[8px] transition duration-150 ease-in-out  rounded-md shadow-sm text-[20px] font-normal text-white focus:shadow-lg focus:outline-none "
        >
          Create New Task <Add />
        </button>
      </div>
    </>
  );
};

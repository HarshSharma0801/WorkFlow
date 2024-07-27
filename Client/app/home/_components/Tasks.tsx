"use client";
import { useEffect, useState } from "react";
import { TaskModal } from "./TaskModal";
import { TaskNewModalByStatus } from "./TaskNewByStatus";
import {
  Search,
  Functions,
  Add,
  Hamburger,
  Positive,
} from "@/public/icons/icons";
import { useModal } from "@/context/modalContext";
import { useTasks } from "@/context/taskContext";
import TaskCard from "./Taskcard";
const Tasks: React.FC<any> = ({ userId }) => {
  const { groupedTasks, refreshTasks } = useTasks();
  useEffect(() => {
    refreshTasks(userId);
  }, []);
  const { handleChange, Open } = useModal();

  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalStatus, setModalStatus] = useState("");

  const Remove = () => {
    setModalOpen(false);
  };

  return (
    <>
      {Open && <TaskModal userId={userId} />}
      {ModalOpen && (
        <TaskNewModalByStatus
          userId={userId}
          status={ModalStatus}
          Remove={Remove}
        />
      )}
      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-between">
          <div className="p-[8px] flex gap-2 rounded-[6px] justify-between text-[#797979] items-center  border border-[#E9E9E9] bg-white font-Poppins">
            <input
              placeholder="Search"
              className="outline-none font-[700] text-[16px] text-[#797979] leading-[21px] w-full bg-transparent placeholder-gray-300"
              // value={searchQuery}
              // onChange={handleSearchChange}
            />
            <Search />
          </div>

          <div className="flex gap-2 justify-center items-center">
            <div>
              <Functions />
            </div>
            <div>
              <button
                onClick={() => {
                  handleChange();
                }}
                className="w-full flex bg-custom-btn-gradient items-center gap-2 justify-center  p-[8px] transition duration-150 ease-in-out  rounded-md shadow-sm text-[16px] font-[500] text-white focus:shadow-lg focus:outline-none "
              >
                Create New <Add />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 justify-start py-5 bg-white rounded-[12px] px-5">
          <div className="flex flex-col gap-4 justify-start">
            <div className="flex justify-between items-center">
              <div className="font-[400] text-[20px] leading-[24px] text-[#555555]">
                To Do
              </div>
              <div>
                <Hamburger />
              </div>
            </div>

            {groupedTasks &&
              groupedTasks["To-Do"].length > 0 &&
              groupedTasks["To-Do"].map((data) => {
                return (
                  <>
                    <TaskCard Task={data} userId={userId} />
                  </>
                );
              })}
            <div>
              <button
                onClick={() => {
                  setModalStatus("To-Do");
                  setModalOpen(true);
                }}
                className="p-[8px] w-full rounded-[8px] bg-custom-add-btn text-[#E3E1E1] flex items-center justify-between"
              >
                <div>Add New</div>
                <div>
                  <Positive />
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-start">
            <div className="flex justify-between items-center">
              <div className="font-[400] text-[20px] leading-[24px] text-[#555555]">
                In progress
              </div>

              <div>
                <Hamburger />
              </div>
            </div>

            {groupedTasks &&
              groupedTasks["In Progress"].length > 0 &&
              groupedTasks["In Progress"].map((data) => {
                return (
                  <>
                    <TaskCard Task={data} userId={userId} />
                  </>
                );
              })}
            <div>
              <button
                onClick={() => {
                  setModalStatus("In Progress");
                  setModalOpen(true);
                }}
                className="p-[8px] w-full rounded-[8px] bg-custom-add-btn text-[#E3E1E1] flex items-center justify-between"
              >
                <div>Add New</div>
                <div>
                  <Positive />
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-start">
            <div className="flex justify-between items-center">
              <div className="font-[400] text-[20px] leading-[24px] text-[#555555]">
                Under review
              </div>

              <div>
                <Hamburger />
              </div>
            </div>
            {groupedTasks &&
              groupedTasks["Under Review"].length > 0 &&
              groupedTasks["Under Review"].map((data) => {
                return (
                  <>
                    <TaskCard Task={data} userId={userId} />
                  </>
                );
              })}
            <div>
              <button
                onClick={() => {
                  setModalStatus("Under Review");
                  setModalOpen(true);
                }}
                className="p-[8px] w-full rounded-[8px] bg-custom-add-btn text-[#E3E1E1] flex items-center justify-between"
              >
                <div>Add New</div>
                <div>
                  <Positive />
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-start">
            <div className="flex justify-between items-center">
              <div className="font-[400] text-[20px] leading-[24px] text-[#555555]">
                Finished
              </div>
              <div>
                <Hamburger />
              </div>
            </div>
            {groupedTasks &&
              groupedTasks["Completed"].length > 0 &&
              groupedTasks["Completed"].map((data) => {
                return (
                  <>
                    <TaskCard Task={data} userId={userId} />
                  </>
                );
              })}
            <div>
              <button
                onClick={() => {
                  setModalStatus("Completed");
                  setModalOpen(true);
                }}
                className="p-[8px] w-full rounded-[8px] bg-custom-add-btn text-[#E3E1E1] flex items-center justify-between"
              >
                <div>Add New</div>
                <div>
                  <Positive />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;

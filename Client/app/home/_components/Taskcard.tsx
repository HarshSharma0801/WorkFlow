import React, { useState } from "react";
import { Task } from "@/context/taskContext";
import { Clock } from "@/public/icons/icons";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { TaskActionModal } from "./TaskActionModal";

const TaskCard: React.FC<{ Task: Task; userId: any }> = ({ Task, userId }) => {
  const [Open, setOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  const formatTimeFromCreation = (dateString: string) => {
    const creationDate = new Date(dateString);
    const now = new Date();
    const diffHours =
      (now.getTime() - creationDate.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return `${Math.floor(diffHours)} hours ago`;
    } else {
      return formatDistanceToNow(creationDate, { addSuffix: true });
    }
  };

  const Remove = () => {
    setOpen(false);
  };

  return (
    <>
      {Open && <TaskActionModal userId={userId} Task={Task} Remove={Remove} />}
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex cursor-pointer justify-center flex-col gap-3 p-4 bg-[#F9F9F9] border rounded-[10px] border-[#DEDEDE] "
      >
        <div className="font-[500] text-[16px] leading-[19px] text-[#606060] ">
          {Task.title}
        </div>
        <div className="font-[400] text-[14px] leading-[16px] text-[#797979] ">
          {Task.description}
        </div>

        <div>
          <div
            className={cn(
              "py-[6px] px-[8px] w-[70px] text-center rounded-[8px]  text-white text-[12px]",
              {
                "bg-[#FF6B6B]": Task.priority === "Urgent",
                "bg-[#FFA235]": Task.priority === "Medium",
                "bg-[#0ECC5A]": Task.priority === "Low",
              }
            )}
          >
            {Task.priority}
          </div>
          <div className="flex gap-2 justify-start items-center">
            <div>
              <Clock />
            </div>
            <div className="font-[600] py-4 text-[14px] text-[#606060]">
              {formatDate(Task.deadline.toString())}
            </div>
          </div>
          <div className="text-[#797979] text-[14px] font-[500]">
            {formatTimeFromCreation(Task.createdAt.toString())}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;

"use client";
import { useState } from "react";
import { Status, Description, Priority, Deadline } from "@/public/icons/icons";
import { useModal } from "@/context/modalContext";
import { useTasks } from "@/context/taskContext";
import { createTask } from "@/services/task";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const TaskModal:React.FC<any> =  ({userId}) => {
  const { Open, handleChange } = useModal();
  const [date, setDate] = useState<Date>();
  const [ModalTitle, setTitle] = useState<string>();
  const [ModalDescription, setDescription] = useState<string>("");
  const [ModalStatus, setStatus] = useState<string>("");
  const [ModalPriority, setPriority] = useState<string>("");

  const { refreshTasks } = useTasks();
  const RemovePopup = () => {
    refreshTasks(userId);
    handleChange();
  };

  
  const handleClick = async() => {
    const data = {
        title: ModalTitle,
        description: ModalDescription,
        status: ModalStatus,
        priority: ModalPriority,
        deadline: date,
        userId:userId
      };
  
       const res =  await createTask(data);
       if(res.valid){
        RemovePopup();
       }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
      >
        <div
          className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[650px] p-4 `}
        >
          <div className="absolute top-3 left-3 cursor-pointer">
            <svg
              onClick={() => {
                handleChange();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="pb-[10px]">
            <div className="flex flex-col py-8 gap-3">
              <div className="w-full p-4">
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={ModalTitle}
                  placeholder="Title"
                  className=" text-[48px] w-full leading-[57px] font-[600] outline-none border-none"
                />
              </div>

              <div className="flex gap-10">
                <div className="flex gap-5 justify-start items-center w-[180px]">
                  <div>
                    <Status />
                  </div>
                  <div>Status</div>
                </div>

                <div>
                  <Select
                    onValueChange={(e) => {
                      setStatus(e);
                    }}
                    value={ModalStatus}
                  >
                    <SelectTrigger className="w-[180px] outline-none focus:ring-0">
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Value</SelectLabel>
                        <SelectItem value="To-Do">To-Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Under Review">
                          Under Review
                        </SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="flex gap-5 justify-start items-center w-[180px]">
                  <div>
                    <Priority />
                  </div>
                  <div>Priority</div>
                </div>

                <div>
                  <Select
                    onValueChange={(e) => {
                      setPriority(e);
                    }}
                    value={ModalPriority}
                  >
                    <SelectTrigger className="w-[180px] outline-none focus:ring-0">
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Value</SelectLabel>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="flex gap-5 justify-start items-center w-[180px]">
                  <div>
                    <Deadline />
                  </div>
                  <div>Deadline</div>
                </div>

                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex gap-10">
                <div className="flex gap-5 justify-start  w-[180px]">
                  <div>
                    <Description />
                  </div>
                  <div>Description</div>
                </div>

                <div>
                  <textarea
                    value={ModalDescription}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="outline-none border p-4 rounded-[8px] w-[400px]"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-5">
              <button
        onClick={handleClick}
        className="w-[40%] flex bg-custom-btn-gradient items-center gap-2 justify-center  p-[8px] transition duration-150 ease-in-out  rounded-md shadow-sm text-[16px] font-[500] text-white focus:shadow-lg focus:outline-none "
      >
        Create
      </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

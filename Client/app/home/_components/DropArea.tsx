"use client";
import { useState } from "react";

const DropArea: React.FC<{
  position: number;
  status: string;
  onDrop: (status: string, position: number) => void;
}> = ({ position, status, onDrop }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <section
        onDragEnter={() => {
          setShow(true);
        }}
        onDragLeave={() => {
          setShow(false);
        }}
        onDrop={() => {
          onDrop(status, position);
          setShow(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        className={`${
          show
            ? "opacity-1  w-[100%] h-[100px] border border-dashed border-[#dcdcdc] rounded-[10px] p-[15px]"
            : "opacity-0"
        }  `}
      >
        Drop here
      </section>
    </>
  );
};

export default DropArea;

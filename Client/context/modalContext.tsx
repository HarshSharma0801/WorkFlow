'use client'
import { createContext, useState, useContext } from "react";

interface ModalContextType {
  Open: boolean;
  handleChange: () => void;
}

const ModalContext = createContext<ModalContextType>({
  Open: false,
  handleChange: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [Open, setOpen] = useState<boolean>(false);

  const handleChange = () => {
    console.log("jkjkjkjkj")
    setOpen((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <ModalContext.Provider value={{ Open, handleChange }}>
        {children}
      </ModalContext.Provider>
    </>
  );
};

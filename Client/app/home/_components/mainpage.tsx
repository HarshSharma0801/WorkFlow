import SideBar from "./SideBar";
import Board from "./Board";
const MainPage = () => {
  return (
    <>
      <div className="flex w-full">
        <SideBar />
        <Board/>
      </div>
    </>
  );
};

export default MainPage;

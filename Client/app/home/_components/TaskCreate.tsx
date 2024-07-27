import { auth } from "@/auth";
import { createTask } from "@/services/task";

const CreateTask : React.FC<any> = async ({ ModalTitle , ModalDescription , ModalStatus , ModalPriority , date }) => {
  const session = await auth();
  const user = session?.user;

  const handleClick = async() => {
    // Open();
    const data = {
        title: ModalTitle,
        description: ModalDescription,
        status: ModalStatus,
        priority: ModalPriority,
        deadline: date,
        userId:user?.id
      };
  
       const res =  await createTask(data);
       if(res.valid){
        // RemovePopup();
       }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="w-[40%] flex bg-custom-btn-gradient items-center gap-2 justify-center  p-[8px] transition duration-150 ease-in-out  rounded-md shadow-sm text-[16px] font-[500] text-white focus:shadow-lg focus:outline-none "
      >
        Create
      </button>
    </>
  );
};


export default CreateTask

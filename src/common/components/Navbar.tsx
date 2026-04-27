import { useModal } from '@/context/ModalContext';

const Navbar = () => {
  const { openAddTaskModal } = useModal();
  return (
    <div className='py-4 bg-white text-black px-20 flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>Kanban Board</h2>
      <div
        onClick={openAddTaskModal}
        className='bg-green-400 px-4 p-2 rounded-xl flex justify-center items-center cursor-pointer'
      >
        Add Task
      </div>
    </div>
  );
};

export default Navbar;

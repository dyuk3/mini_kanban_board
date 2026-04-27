import TaskForm from './TaskForm';
import { useModal } from '@/context/ModalContext';

const Modal = () => {
  const { closeAddTaskModal } = useModal();
  return (
    <div
      className={`flex justify-center items-center absolute text-black w-screen h-screen bg-black/50 ${open}`}
    >
      <div className='bg-white  p-20 px-40 flex justify-center items-center rounded-2xl relative'>
        <TaskForm />
        <p className='text-xl absolute right-4 top-4' onClick={closeAddTaskModal}>
          X
        </p>
      </div>
    </div>
  );
};

export default Modal;

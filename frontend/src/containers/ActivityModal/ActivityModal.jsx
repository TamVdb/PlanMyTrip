import { useAtomValue, useSetAtom } from 'jotai';
import { modalAtom, closeModalAtom } from '../../store/modal/modal.atom';
import ActivityAddForm from '../../components/ActivityAddForm/ActivityAddForm';
import ActivityUpdateForm from '../../components/ActivityUpdateForm/ActivityUpdateForm';

const ActivityModal = () => {

   const { isOpen, modalType, currentActivityId } = useAtomValue(modalAtom);
   const closeModal = useSetAtom(closeModalAtom);

   if (!isOpen) return null; // Modal is not visible

   const handleCloseModal = () => {
      closeModal();
   };

   return (
      <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-700/50">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-md w-[90%] lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto bg-white max-h-[80vh] overflow-y-auto">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 font-semibold rounded-full bg-custom-blue text-white w-7 h-7">X</button>
            {/* Affiche AddActivity ou UpdateActivity en fonction de modalType */}
            {modalType === 'addActivity' && <ActivityAddForm />}
            {modalType === 'updateActivity' && <ActivityUpdateForm key={currentActivityId} />}
         </div>
      </div>
   );
};

export default ActivityModal;
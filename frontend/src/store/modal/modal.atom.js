import { atom } from 'jotai';

const initialModalState = {
   isOpen: false,
   modalType: '',
   currentTripId: null,
   currentActivityId: null
};

// L'atome qui contient l'état de la modale (équivalent du state de modal.slice.js)
export const modalAtom = atom(initialModalState);

// Atomes "action" : chacun correspond exactement à un reducer de modal.slice.js.
// Un atome "action" n'a pas de valeur lisible (1er argument à null), juste une
// fonction d'écriture appelée via useSetAtom() dans les composants.
export const openModalAtom = atom(null, (get, set, modalType) => {
   set(modalAtom, { isOpen: true, modalType, currentTripId: null, currentActivityId: null });
});

export const closeModalAtom = atom(null, (get, set) => {
   set(modalAtom, initialModalState);
});

export const switchToLoginAtom = atom(null, (get, set) => {
   set(modalAtom, { isOpen: true, modalType: 'login', currentTripId: null, currentActivityId: null });
});

export const switchToSignupAtom = atom(null, (get, set) => {
   set(modalAtom, { isOpen: true, modalType: 'signup', currentTripId: null, currentActivityId: null });
});

export const switchToAddtripAtom = atom(null, (get, set) => {
   set(modalAtom, { isOpen: true, modalType: 'addTrip', currentTripId: null, currentActivityId: null });
});

export const switchToUpdatetripAtom = atom(null, (get, set, tripId) => {
   set(modalAtom, { isOpen: true, modalType: 'updateTrip', currentTripId: tripId, currentActivityId: null });
});

export const switchToAddActivityAtom = atom(null, (get, set, { tripId }) => {
   set(modalAtom, { isOpen: true, modalType: 'addActivity', currentTripId: tripId, currentActivityId: null });
});

export const switchToUpdateActivityAtom = atom(null, (get, set, { tripId, activityId }) => {
   set(modalAtom, { isOpen: true, modalType: 'updateActivity', currentTripId: tripId, currentActivityId: activityId });
});

import { atom } from 'jotai';

const storedUser = localStorage.getItem('user');

// Équivalent de l'état de auth.slice.js ({ user }). Pas besoin d'objet
// wrapper ici : un seul champ, donc l'atome contient directement la valeur.
export const userAtom = atom(storedUser ? storedUser : null);

export const setCredentialsAtom = atom(null, (get, set, userData) => {
   set(userAtom, userData);
   localStorage.setItem('user', JSON.stringify(userData));
});

export const clearCredentialsAtom = atom(null, (get, set) => {
   set(userAtom, null);
   localStorage.removeItem('user');
});

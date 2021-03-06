import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";



export const startNewNote= ()=> { 

    return async(dispatch, getState)=> {

        const uid= getState().auth.uid;
        //console.log(uid);

        const newNote= {            
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc= await addDoc( collection(db, `${ uid }`, "journal/notes") , newNote);
        //console.log(doc);
         
        dispatch( activeNote(doc.id, newNote) );
        dispatch( addNewNote(doc.id, newNote) )
    }

}

export const activeNote= ( id, note )=> {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }
}

export const addNewNote= (id, note)=> ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes= (uid)=> {
    return async( dispatch )=> {
        const notes= await loadNotes(uid); 
        dispatch( setNotes(notes) )
    }
}

export const setNotes= ( notes )=> ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote= (note)=> {
    return async(dispatch, getState)=> {

        const uid= getState().auth.uid;

        if( !note.url ){
            delete note.url
        }

        const noteToFirestore= {...note};
        delete noteToFirestore.id;

        const noteRef= doc( db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef, noteToFirestore);

        dispatch( refreshNote(note.id, note) );
        Swal.fire('Saved', note.title, 'success')
    }
}

export const refreshNote= (id, note)=> ({

    type: types.notesUpdated,
    payload: {
        id, /* note */
        note: {
            id,
            ...note
        }
    }

})

export const startUploading= (file)=> {

    return async( dispatch, getState)=> {
        const { active: activeNote }= getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,

            showConfirmButton: false,
            
            willOpen: ()=> {
                Swal.showLoading()
            }
            
        })

        const fileUrl= await fileUpload( file )
        //console.log(fileUrl)
        activeNote.url= fileUrl;

        dispatch( startSaveNote(activeNote) )

        Swal.close();
    
    }
}

export const startDeleting= (id)=> {
    return async(dispatch, getState)=> {

        const uid= getState().auth.uid;

        const noteDel= doc( db, `${uid}/journal/notes/${id}` );
        await deleteDoc( noteDel );

        Swal.fire({
            title: 'Do you want to delete the note?',
            showDenyButton: true,            
            confirmButtonText: 'Delete',
            denyButtonText: `Cancel`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch( deleteNote(id) );
              Swal.fire('The note has been deleted!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })



    }
}

export const deleteNote= (id)=> {
    return {
        type: types.notesDelete,
        payload: id
    }
}

export const noteLogout= ()=>{
    return{
        type: types.notesLogoutCleaning,

    }
}
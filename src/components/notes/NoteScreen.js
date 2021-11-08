import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const {active: note} = useSelector(state => state.notes);
    //console.log(note);
    const [formValues, handleInputChange, reset]= useForm( note );
    const { body, title, id }= formValues;
    //console.log(formValues);

    const activeId = useRef( note.id )

    useEffect(() => {
        
        if( note.id !== activeId.current) {
            reset(note);
            activeId.current= note.id
        }
        
    }, [note, reset]);

    useEffect(() => {
        
        //console.log(formValues);
        dispatch( activeNote(formValues.id, {...formValues}) )

    }, [formValues, dispatch]);

    const handleDelete= ()=> {
        //console.log(id)
        dispatch( startDeleting(id) );
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some text"
                    className="notes__title-input"
                    autoComplete="off"
                    name= "title"
                    value= {title} 
                    onChange= {handleInputChange}
                />
                <textarea
                    placeholder="What happend today?"
                    className="notes__textarea"
                    name= "body"
                    value= {body}    
                    onChange= {handleInputChange}>                  
                </textarea>
                {
                    (note.url) 
                        &&
                        (<div>
                            <img
                                src= {note.url}
                                alt="Imagen"
                                className="notes__image" />
                        </div>)
                }
            </div>

            <button
                className= "btn btn-danger"
                onClick= {handleDelete}>
                    Delete

            </button>

        </div>
    )
}

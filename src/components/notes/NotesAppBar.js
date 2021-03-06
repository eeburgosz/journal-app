import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = ({date}) => {

    const dayDate= moment(date);

    const dispatch = useDispatch()
    const {active} = useSelector(state => state.notes)
    
    const handleSave= ()=> {
        //console.log(active);
        dispatch( startSaveNote(active) )
    }

    const handlePictureUpload= ()=> {
        //console.log('picture');
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange= (e)=> {
        //console.log(e.target.files)
        const file= e.target.files[0];

        if( file ){
            dispatch( startUploading(file) );
        }
    }

    return (
        <div className="notes__appbar">
            <span>
                <small>{dayDate.format('dddd - MMM Do')}</small>    
            </span>

            <input
                id= "fileSelector"
                type= "file" 
                name= "file"
                style= { {display: 'none'} }
                onChange= {handleFileChange}
            />

            <div>
                <button 
                    className="btn"
                    onClick= {handlePictureUpload}>
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick= {handleSave}>
                    Save
                </button>
            </div>

        </div>
    )
}

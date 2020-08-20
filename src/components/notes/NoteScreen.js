import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDelete } from '../../actions/notes'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes)
    const [values, handleInputChange, reset] = useForm(note);
    const { body, title, id } = values;

    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(values.id, {...values}))
    }, [values, dispatch]);

    const handleDelete = () => {
        dispatch(startDelete(id));
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Un título asombroso"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="Que paso hoy"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            src={note.url}
                            alt="react-img"
                        />
                    </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Borrar
            </button>
        </div>
    )
}

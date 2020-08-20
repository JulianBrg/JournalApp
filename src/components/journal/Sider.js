import React from 'react'
import { JournalEntries } from './JournalEntries'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sider = () => {

    const dispatch = useDispatch();
    //el useSselector sirve para tener informacion del state de Redux
    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleAddNewEntry = () => {
        dispatch(startNewNote());
    }

    return (
        <aside className="journal__siderbar">
            <div className="journal__siderbar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {name}</span>
                </h3>

                <button className="btn" onClick={handleLogout}>
                    Salir
                </button>
            </div>

            <div className="journal__new-entry" onClick={handleAddNewEntry}>
                <i className="far fa-calendar-plus fa-4x"></i>
                <p className="mt-1">
                    Nueva entrada
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}

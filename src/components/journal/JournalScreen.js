import React from 'react'
import { Sider } from './Sider'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux'
import { NothingSelected } from './NothingSelected'

export const JournalScreen = () => {


    const { active } = useSelector(state => state.notes)

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">

            <Sider />

            <main>
                {
                    (active)
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }
            </main>
        </div>
    )
}

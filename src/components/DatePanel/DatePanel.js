import React, { useContext, useState, useEffect } from 'react'
import { DateContext } from '../../contexts/DateContext'
import { ListContext } from '../../contexts/ListContext'
import DateList from '../DateList/DateList'
import moment from 'moment'
import './DatePanel.css'

const DatePanel = () => {
    const yearsContext = useContext(DateContext)
    const { notesArray, setDate, selectedDate } = yearsContext
    const listContext = useContext(ListContext)
    const {
        isMonthVisible,
        toggleMonthVisible,
        toggleDaysVisible,
        isDaysVisible,
        selectedYear,
        selectedMonth,
        setYear,
        setMonth,
        monthPosition,
        setMonthPosition,
        daysPosition,
        setDaysPosition,
    } = listContext

    const yearsArray = [...notesArray]
        .sort((note1, note2) => parseFloat(moment(note1.noteDate).format('YYYY')) > parseFloat(moment(note2.noteDate).format('YYYY')) ? 1 : -1)
    const monthArray = [...notesArray]
        .filter(note => moment(note.noteDate).format('YYYY') === selectedYear)
        .sort((note1, note2) => parseFloat(moment(note1.noteDate).format('M')) > parseFloat(moment(note2.noteDate).format('M')) ? 1 : -1)
    const daysArray = [...notesArray]
        .filter(note => moment(note.noteDate).format('YYYY') === selectedYear && moment(note.noteDate).format('MMMM') === selectedMonth)
        .sort((note1, note2) => parseFloat(moment(note1.noteDate).format('D')) > parseFloat(moment(note2.noteDate).format('D')) ? 1 : -1)

    const yearsToggler = el => {
        setYear(el)
        toggleMonthVisible(el => !el)
        toggleDaysVisible(false)
    }

    const monthToggler = el => {
        setMonth(el)
        toggleDaysVisible(el => !el)
    }

    useEffect(() => toggleMonthVisible(true), [selectedYear, selectedMonth])
    useEffect(() => toggleDaysVisible(true), [selectedMonth])

    return (
        <>
            <DateList
                format='YYYY'
                visibility={notesArray.length > 0}
                listArray={yearsArray}
                callback={yearsToggler}
                setPosition={setMonthPosition}
                position=''
                listStyle='years-list'
                selectedItem={selectedYear}
                isChildVisible={isMonthVisible}
            />
            <DateList
                format='MMMM'
                visibility={monthArray.length && isMonthVisible}
                listArray={monthArray}
                callback={monthToggler}
                setPosition={setDaysPosition}
                position={monthPosition}
                listStyle='month-list'
                selectedItem={selectedMonth}
                isChildVisible={isDaysVisible}
            />
            <DateList
                format='LLL'
                visibility={daysArray.length && isDaysVisible}
                listArray={daysArray}
                callback={setDate}
                setPosition={() => {}}
                position={daysPosition}
                listStyle='days-list'
                selectedItem={selectedDate}
                isChildVisible={false}
            />
        </>
    )
}

export default DatePanel

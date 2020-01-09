import React, { useState, useEffect } from 'react';
import { DatePicker, Alert, Row, Col, Button } from 'antd';
import './FirstPage.css';
import moment from 'moment';
import Notes from '../Notes/Notes';
import DatePage from '../DatePage/DatePage';
import { DateContext } from '../../contexts/DateContext';
import DiaryHeader from '../DiaryHeader/DiaryHeader';
import DateList from '../DateList/DateList';
import { ListContext } from '../../contexts/ListContext';
import DatePanel from '../DatePanel/DatePanel';

const FirstPage = () => {

    const currentDate = moment().format('LL')
    const [ selectedDate, setDate ] = useState('')
    const [ currentTime, getCurrentTime] = useState(moment().format('LTS'))
    const [notesArray, changeNotesArray] = useState([])
    const [isMonthVisible, toggleMonthVisible] = useState(false)
    const [isDaysVisible, toggleDaysVisible] = useState(false)
    const [selectedYear, setYear] = useState('')
    const [selectedMonth, setMonth] = useState('')
    const [monthPosition, setMonthPosition] = useState(0)
    const [daysPosition, setDaysPosition] = useState(0)
    const tick = () => {
        getCurrentTime(moment().format('LTS'))
    }
    
    useEffect(() => {
        const time = setInterval(() => tick(), 1000)
        return function cleanTime() {
            clearInterval(time)
        }
    })



    return (
        <>
        <DateContext.Provider value={{ currentDate, selectedDate, setDate, notesArray, changeNotesArray }}>
            <DiaryHeader />
            <Row span={24}>
                <Col span={4} >
                <ListContext.Provider
                    value={{
                        isMonthVisible,
                        toggleMonthVisible,
                        isDaysVisible,
                        toggleDaysVisible,
                        selectedYear,
                        selectedMonth,
                        setYear,
                        setMonth,
                        monthPosition,
                        setMonthPosition,
                        daysPosition,
                        setDaysPosition
                    }}
                >
                        <DatePanel />
                    </ListContext.Provider>
                </Col>
                <Col span={8}>
                    <Row span={24}>
                        <Alert message={`Current time: ${currentDate}, ${currentTime}`} />
                    </Row>
                    <Row>
                        <Notes date={currentDate} />
                    </Row>
                </Col>
                <DatePage />
            </Row>
        </DateContext.Provider>
        </>
    )
}

export default FirstPage

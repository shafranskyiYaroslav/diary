import React from 'react'
import moment from 'moment'

export const ListContext = React.createContext({
    isMonthVisible: false,
    toggleMonthVisible: () => {},
    isDaysVisible: false,
    toggleDaysVisible: () => {},
    selectedYear: '',
    setYear: () => {},
    selectedMonth: '',
    setMonth: () => {},
    monthPosition: 0,
    setMonthPosition: () => {},
    daysPosition: 0,
    setDaysPosition: () => {},
})

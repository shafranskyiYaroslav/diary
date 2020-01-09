import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Alert, Button } from 'antd';
import Notes from '../Notes/Notes';
import moment from 'moment';
import { DateContext } from '../../contexts/DateContext';
import './DatePage.css';

const DatePage = () => {

    const date = useContext(DateContext)
    const { selectedDate } = date
    const dateToShow = selectedDate && moment(selectedDate).format('LL')
    const [isHidden, toggleVisibility] = useState(selectedDate ? false : true)
    const classNames = require('classnames')
    const notesClassNames = classNames([(isHidden || !selectedDate) ? 'hidden' : ''])
    const toggleButtonClassNames = classNames([!selectedDate ? 'hidden' : ''])

    useEffect(
        () => toggleVisibility(false),
        [selectedDate]
    )

    return (
        <Col span={8} >
            <Row span={24}>
                <Alert 
                    message={
                        <>
                        <span>Selected date: {selectedDate ? dateToShow : 'None'}</span>
                        <Button
                            type='ghost'
                            onClick={() => toggleVisibility(isHidden => !isHidden)}
                            size='small'
                            className={toggleButtonClassNames} >
                                {isHidden ? 'Show Notes' : 'Hide Notes'}
                            </Button>
                        </>
                    }
                    type={ selectedDate ? 'success' : 'error' } />
            </Row>
            <Row className={notesClassNames}>
                <Notes date={selectedDate && dateToShow} />
            </Row>
        </Col>
    )
}

export default DatePage

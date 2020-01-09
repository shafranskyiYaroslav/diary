import React, { useState, useContext } from 'react';
import Header from 'antd/lib/calendar/Header';
import { Row, Col, DatePicker, Button, PageHeader } from 'antd';
import { DateContext } from '../../contexts/DateContext';

const DiaryHeader = () => {
    const dateContext = useContext(DateContext)
    const { selectedDate, setDate } = dateContext

    return (
        <PageHeader>
            <Row span={24} className='row-date-picker'>
                <Col span={12}>
                    <DatePicker 
                        onChange={date => {
                            date && setDate(selectedDate => date.toDate())
                        }}
                        size='large'
                        className='date-picker' />
                </Col>
                <Col span={8}>
                    <Button
                    type='danger'
                    size='default'
                    className='clear-date-button'
                    onClick={() => setDate(selectedDate => '')}>Clear Date</Button>
                </Col>
            </Row>
        </PageHeader>
    )
}
export default DiaryHeader

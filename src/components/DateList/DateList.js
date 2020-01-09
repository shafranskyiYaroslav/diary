import React, { useContext, useEffect } from 'react';
import './DateList.css';
import { List, Row } from 'antd';
import { DateContext } from '../../contexts/DateContext';
import moment from 'moment';
import '../DatePanel/DatePanel.css';

const DateList = ({ format, listArray, visibility, callback, setPosition, listStyle, position, selectedItem, isChildVisible }) => {
    
    const className = require('classnames')
    const isVisible = !visibility ? 'hidden' : ''
    const listClassName = className(['date-list', isVisible, listStyle])
    const filteredListArray = listArray
        .map(note => moment(note.noteDate).format(format))
        .filter((el, idx, arr) => !arr.slice(idx + 1).includes(el))

    return (
        <List
            className={listClassName}
            style={{top: position + window.pageYOffset}}
            itemLayout='horizontal'
            dataSource={filteredListArray}
            renderItem={(item) => (
                <List.Item
                    className='date-list-item'
                    onClick={(event) => {
                        callback(item)
                        setPosition(event.target.closest('.date-list-item').getBoundingClientRect().top - 1)
                    }}
                >
                    <List.Item.Meta
                        description={
                            <Row span={24} className='date-list-item-meta'>
                                <span>{item}</span>
                                <span>{ selectedItem === item && isChildVisible ? '<<<' : '>>>' }</span>
                            </Row>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

export default DateList

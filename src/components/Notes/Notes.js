import React, { useState, useContext, useCallback, useMemo } from 'react';
import './Notes.css';
import { Input, Row, Button, List, Col, Dropdown, Menu, Item, Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateContext } from '../../contexts/DateContext';
import moment from 'moment';
import { emojisArray } from './emojiMenu';
import { createList } from './createList';

const Notes = ({ date }) => {
    const { TextArea } = Input
    const [textAreaValue, saveTextAreaValue] = useState('')
    const [selectedMood, setMood] = useState(null)
    const notesContext = useContext(DateContext)
    const { notesArray, changeNotesArray } = notesContext
    const actualNotesArray = notesArray
        .filter(note => moment(note.noteDate).format('LL') === moment(date).format('LL'))
    const memoizedCreateList = useCallback(() => createList(actualNotesArray, changeNotesArray),
        [actualNotesArray, changeNotesArray]
    )
    
    return (
        <>
            <TextArea
                name='notesTextArea'
                placeholder='Write new note...'
                onChange={event => saveTextAreaValue(event.target.value)}
                value={textAreaValue}
                rows={6}
            />
            <Dropdown overlay={
                <Menu className='emoji-menu' >
                    {
                        emojisArray.map(emoji =>
                            <Menu.Item onClick={() => setMood(emoji)} key={emoji} >
                                <FontAwesomeIcon icon={['far', `${emoji}`]} color='orange' size='3x' />
                            </Menu.Item>
                        )
                    }
                </Menu>
                }
                placement='bottomCenter'
            >
                <a>
                    Choose your mood:) <Icon type='down' />
                </a>
            </Dropdown>
            {
                !!selectedMood &&
                    <FontAwesomeIcon
                        icon={['far', `${selectedMood}`]}
                        color='orange'
                        size='2x'
                        onClick={() => setMood(null)}
                    />
            }
            <List
                itemLayout='horizontal'
                dataSource={actualNotesArray}
                renderItem={(item, idx) => (
                    <List.Item>
                        <List.Item.Meta
                            description={
                                <Row span={24}>
                                    <Col span={3} >
                                        { item.noteMood && <FontAwesomeIcon icon={['far', `${item.noteMood}`]} color='orange' size='3x' /> }
                                    </Col>
                                    <Col span={12} >
                                        <span>{item.noteText}</span>
                                    </Col>
                                    <Col span={6} >
                                        <Button
                                            type='danger'
                                            size='small'
                                            onClick={
                                                () => changeNotesArray(notesArray =>
                                                    notesArray.filter(note =>
                                                        !actualNotesArray.includes(note) || actualNotesArray.indexOf(note) !== idx
                                                    )
                                                )
                                            }
                                        >
                                            Clear Note
                                        </Button>
                                    </Col>
                                </Row>
                            }
                        />
                    </List.Item>
                )}
            />
            <Button
                size='large'
                type='primary'
                onClick={() =>
                    {
                        changeNotesArray(notesArray => [
                            ...notesArray, 
                            { noteDate: date,
                                noteText: textAreaValue,
                                noteMood: !!selectedMood && selectedMood
                            }]
                        )
                        saveTextAreaValue('')
                    }
                } >
                Create New Note!
            </Button>
            <Button
                size='large'
                type='danger'
                onClick={() =>
                    {
                        saveTextAreaValue('')
                        changeNotesArray(notesArray => notesArray.filter(note => note.noteDate !== date))
                    }
                } >
                Clear All Notes            
            </Button>
        </>
    )
}

export default Notes

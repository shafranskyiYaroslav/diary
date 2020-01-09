import React, { useContext } from 'react';
import { Input, Row, Button, List, Col, Dropdown, Icon } from 'antd';


export const createList = ({ listArray, changeNotesArray }) => (
    <List
        itemLayout='horizontal'
        dataSource={listArray}
        renderItem={(item, idx) => (
            <List.Item>
                <List.Item.Meta
                    description={
                        <Row span={24}>
                            <Col span={18} >
                                <span>{item.noteText}</span>
                            </Col>
                            <Col span={6} >
                                <Button
                                    type='danger'
                                    size='small'
                                    onClick={
                                        () => changeNotesArray(array =>
                                            array.filter(note =>
                                                !listArray.includes(note) || listArray.indexOf(note) !== idx
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
)

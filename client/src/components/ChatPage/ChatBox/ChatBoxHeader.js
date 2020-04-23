import React from 'react'
import { Header, Heading, Button, Main, Footer, Box } from 'grommet'
import { Home } from 'grommet-icons';
import { Link } from 'react-router-dom'
import DisplayMsg from '../../DisplayMsg/DisplayMsg'
import Input from '../../Input/Input'

const ChatBoxHeader = ({ roomName, messages, name, message, setMessage, sendMessage }) => {
    return (
        <Box>
            <Header background="brand" justify='around' >
                <Heading level={5} >
                    {roomName}
                </Heading>
                <Link to='/'>
                    <Button icon={<Home />} hoverIndicator />
                </Link>
            </Header>
            <Main>
                <DisplayMsg messages={messages} name={name} />
            </Main>
          
        </Box>)
}

export default ChatBoxHeader
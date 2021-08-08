import React from 'react'

import Header from '../components/Header/Header'
import BoxMessage from '../components/Chat/BoxMessage'
import FormName from '../components/Chat/FormName'

export default function Chat() {
    return (
        <div className="container mt-4">
            <Header></Header>
            <BoxMessage></BoxMessage>
            <FormName></FormName>
        </div>
    )
}

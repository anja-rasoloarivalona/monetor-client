import React from "react"
import styled from "styled-components"
import * as actions from '../../store/actions'
import axios from 'axios'
import { Form, formProps } from '../../components'
import { useSelector, useDispatch } from 'react-redux'

const TransactionForm = () => {

    const dispatch = useDispatch()

    const {
        text : { text },
        user: { wallets },
        form: { edited }
    } = useSelector(state => state)


    const userWallets = []

    wallets.forEach(wallet => {
        userWallets.push({
            value: wallet.id,
            label: `${text[wallet.type]} - ${wallet.name}`
        })
    })

    const inputs = [
        {
            id: "category",
            name: "category",
            input_type: "category",
            required: true,
            type: "object",
            label: text.category,
        },
        {
            id: "amount",
            name: "amount",
            placeholder: text.amount,
            label: text.amount,
            required: true,
            type: "number",
            input_type: "input",

        },
        {
            id: "date",
            input_type: "date",
            placeholder: text.date,
            label: text.date,
            name: "date",
            required: true
        },
        {
            id: "counterparty",
            input_type: "input",
            placeholder: text.counterparty_placeholder,
            label: text.counterparty,
            name: "counterparty",
            type: "text",
        },
        {
            id: "walletId",
            name: "walletId",
            input_type: "select",
            placeholder: text.wallet,
            label: text.wallet,
            options: userWallets,
            required: true,
        }
    ]


    const submit = async _data => {
        const data = {
            ..._data,
            categoryId: _data.category.id,
            type: _data.category.type
        }

        try {
            const res = await axios({
                method: edited ? "PUT" : "POST",
                url: "/transaction",
                data
            })
            if(res.status === 200){
                dispatch(actions.addTransaction(res.data.data))
                dispatch(actions.setForm())
            }
        } catch(err){
            console.log({
                 err 
            })
        }
    }

    return (
        <Form 
            inputs={inputs}
            submitHandler={submit}
            buttonLabel={edited ? text.edit : text.add}
        />
          
    )
};

export default TransactionForm;

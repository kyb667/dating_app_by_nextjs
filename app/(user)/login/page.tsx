"use client"

import type { NextPage } from "next";
import { useRouter } from 'next/navigation'
import React, {useState} from 'react'
// recoil
import { useRecoilState } from "recoil";
// state
import { LoginSession, LoginSessionData, Data } from "@/state/user/Login";
// material
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
// config
import {CONFIG} from "@/lib/config"
// db
import { login } from "@/lib/axios"

const HOBBY = CONFIG.HOBBY
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const Header = () => {
  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center" >
        <h3>Login Form</h3>
    </Box>
  )
}

const Form : NextPage = () => {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [userIdError, setUserIdError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const [userSession, setUserSession] = useRecoilState(LoginSession)

  const handleSubmit = async (event : any) => {
      event.preventDefault()

      setUserIdError(false)
      setPasswordError(false)

      if (userId == '') {
        setUserIdError(true)
      }
      if (password == '') {
        setPasswordError(true)
      }
      if (userId && password) {

        try{
          const result = await login({userId,password})

          if (result.code === CONFIG.STATUS_CODE.SUCCESS){
            const data : Data = {
                userId : userId,
                userPassword : password,
                userName : result.data.userName
              }
            const newData : LoginSessionData = {session: [data]}
            setUserSession(newData)
            router.push(CONFIG.URL.MAIN)
          } else {
            alert('error')
          }
          
        }catch(err){
          alert(err)
          // TODO エラー処理必要
        }
      }
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} >
      <Header/>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" >
          <TextField 
            label="UserId"
            onChange={e => setUserId(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            sx={{m: 1, width: "80%" }}
            fullWidth
            value={userId}
            error={userIdError}
          />
          <TextField 
            label="Password"
            onChange={e => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{m: 1, width: "80%" }}
          />
      </Box>
      <br/>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center">
          <Button variant="outlined"  type="submit">Login</Button>
      </Box>
    </form>
  )
}


const Page = () => {
  return (
    <React.Fragment>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="30vh"
          // bgcolor= "white"
        >
          <Form/>
        </Box>
    </React.Fragment>
  )
}

export default Page
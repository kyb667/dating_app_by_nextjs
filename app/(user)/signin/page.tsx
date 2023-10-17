"use client"

import type { NextPage } from "next";
import { useRouter } from 'next/navigation'
import React, {useState, Suspense} from 'react'
// recoil
import { useRecoilState } from "recoil";
// state
import { LoginSession, LoginSessionData } from "@/state/user/Login";
// material
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { FormControl } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// lib
import {CONFIG} from "@/lib/config"
// db
import { CreateUser } from "@/lib/axios"

const HOBBY = CONFIG.HOBBY
const SALALY = CONFIG.SALALY

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

const TextFieldArea = (
  {type, value, setValue, error, label, helpText} : 
  {type: string, value : string | number; setValue : Function; error : boolean, label:string, helpText:string}
) => {
  return <TextField 
            sx={{ m: 1 }}
            helperText={helpText}
            label={label}
            onChange={e => setValue(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type={type}
            fullWidth
            value={value}
            error={error}
          />
}

const MultipleSelectArea = (
  {target, value, setValue, label, error} : 
  {target : any, value: string[], setValue : Function, label : string, error: boolean}
) => {

  const multipleHandleChange = (event: any) => {
    const {target: { value },} = event;
    setValue(typeof value === 'string' ? value.split(',') : value,);
  };

  return <FormControl sx={{ m: 1, width: 250 }} error={error}>
          <InputLabel>{label}</InputLabel>
          <Select
            required
            multiple
            value={value}
            onChange={multipleHandleChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {target.map((val : any) => (
              <MenuItem key={val.value} value={val.label}>
                <Checkbox checked={value.indexOf(val.label) > -1} />
                {val.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
}

const SelectArea = (
  {target, value, setValue, label, error} : 
  {target : any, value: string, setValue : Function, label : string, error: boolean}
) => {
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return <FormControl sx={{ m: 1, width: 250 }} error={error}>
          <InputLabel>{label}</InputLabel>
          <Select
            required
            value={value}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
          >
            {target.map((val : any) => (
              <MenuItem value={val.label} key={val.label}>
                {val.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
}


const Form : NextPage = () => {
    const router = useRouter()

    // useState
    const [userId, setUserId] = useState("")
    const [userIdError, setUserIdError] = useState(false)

    const [userName, setUserName] = useState("")
    const [userNameError, setUserNameError] = useState(false)
   
    const [userAge, setUserAge] = useState(0)
    const [userAgeError, setUserAgeError] = useState(false)

    const [height, setHeight] = useState(0)
    const [heightError, setHeightError] = useState(false)

    const [salaly, setSalaly] = useState("")
    const [salalyError, setSalalyError] = useState(false)
   
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
   
    const [hobby, setHobby] = useState<string[]>([]);
    const [hobbyError, setHobbyError] = useState(false)
   
    // recoil
    const [userSession, setUserSession] = useRecoilState(LoginSession)

    const handleSubmit = async (event : any) => {
        event.preventDefault()
 
        setUserIdError(false)
        setUserNameError(false)
        setUserAgeError(false)
        setHeightError(false)
        setSalalyError(false)
        setPasswordError(false)
        setHobbyError(false)
 
        if (userId == '') {
          setUserIdError(true)
          return
        }
        if (userName == '') {
          setUserNameError(true)
          return
        }
        if (password == '') {
          setPasswordError(true)
          return
        }
        if (salaly == '') {
          setSalalyError(true)
          return
        }

        if (height < 130 || height > 210){
          setHeightError(true)
          return
        }

        if (userAge < 15 || userAge > 100){
          setUserAgeError(true)
          return
        }

        if (hobby.length === 0) {
          setHobbyError(true)
          return
        }
 
        const newData : LoginSessionData = {session : []}
        
        try{
          const result = await CreateUser({userId,
            password,
            userName,
            hobby,
            salaly,
            height,
            userAge})

            if (result.code === CONFIG.STATUS_CODE.SUCCESS){
              newData.session.push({
                userId : userId,
                userPassword : password,
                userName : userName,
                // hobby : hobby,
                // age : userAge,
                // height : height,
                // salaly : salaly,
              })
              setUserSession(newData)
              router.push(CONFIG.URL.MAIN)
            } else {
              alert("error")
              // TODO エラー処理必要
            }
        }catch(err){
          alert(err)
          // TODO エラー処理必要
        }
    }


  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" >
        <h3>SignIn Form</h3>
      </Box>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" >
          <TextFieldArea 
            type={"text"} 
            value={userId} 
            setValue={setUserId} 
            error={userIdError} 
            label={"UserId"} 
            helpText={" "} 
          />
          <TextFieldArea 
            type={"text"} 
            value={userName} 
            setValue={setUserName} 
            error={userNameError} 
            label={"UserName"} 
            helpText={" "} 
          />
      </Box>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" >
          <TextFieldArea 
            type={"password"} 
            value={password} 
            setValue={setPassword} 
            error={passwordError} 
            label={"Password"} 
            helpText={" "} 
          />

      </Box>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" >
        <TextFieldArea 
          type={"number"} 
          value={userAge} 
          setValue={setUserAge} 
          error={userAgeError}
          label={"年齢"} 
          helpText={"15 ~ 100の値をご入力ください"}
        />
        <TextFieldArea 
          type={"number"} 
          value={height} 
          setValue={setHeight} 
          error={heightError}
          label={"身長"} 
          helpText={"130 ~ 210の値をご入力ください"}
        />

      </Box>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" >
        <MultipleSelectArea 
          target={HOBBY} 
          value={hobby} 
          setValue={setHobby} 
          label={"Hobby"} 
          error={hobbyError} 
          />
        <SelectArea 
          target={SALALY} 
          value={salaly} 
          setValue={setSalaly} 
          label={"年収"} 
          error={salalyError} 
          />

      </Box>
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center" >
        <Button 
          sx={{ m: 1, width: "30%" }} 
          variant="outlined" 
          color="secondary" 
          type="submit">
            会員登録
        </Button>
      </Box>
  </form>
  )
}

const Page = () => {
  return (
    <Suspense fallback={<CircularProgress disableShrink />}>
    <React.Fragment>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="30vh"
          // bgcolor= "white"
        >
          <Suspense fallback={<CircularProgress disableShrink />}>
          <Form/>
          </Suspense>
        </Box>
    </React.Fragment>
    </Suspense>
  )
}

export default Page
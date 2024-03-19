import React from 'react'

import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
  } from "@material-tailwind/react";

import Chekbox from './Chekbox'
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form'

const LoginUser = ({open, handleOpen}) => {

  const {register, handleSubmit, reset, control, formState:{errors, isSubmitSuccessful, isSubmitting}} = useForm({ mode:"onTouched" });

    const navigate =  useNavigate();
    const location = useLocation();

    //const [username, setUsername] = useState("")

    const onSubmit = (data) => {

      // essayer de faire un try catch pour envoyer les données (mieux sécuriser)

      //setUsername(() => data.firstName)
    
      console.log(data);
      reset();
        
  
    }

    const goSignup =(e) =>{
        e.preventDefault();
        if (location.pathname === "/signup") {
          return window.location.reload()
        }
        return navigate('/signup')    

    }

    const redirectHome = () =>{
      if (location.pathname === "/") {
        return window.location.reload()
      }
      return navigate('/')    

  }
  return (
        <div>
          {/*isSubmitSuccessful && redirectHome()*/}
          <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center bg-blue"
          >
            <Typography variant="h3" color="white">
              Se Connecter
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4">
            <div>
              <Input label="Email" size="lg" {...register("email", {
                required:{
                  value: true,
                  message: 'Email est obligatoire !!!',
                },
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  
                  message: 'Email fourni invalide !!!',
                }
              })} />

              {errors.email?.type === 'required' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.email.message}</span>}
              {errors.email?.type === 'pattern' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.email.message}</span>}

            </div>
            <div>
              <Input label="Mot de passe" size="lg" {...register("password", {
                required:{
                  value: true,
                  message: 'Mot de passe est obligatoire !!!',
                },
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                  message: 'Le mot de passe doit contenir au moins une lettre majuscule, minuscule lettre, chiffre et symbole spécial !!!',
                }
              })}/>

              {errors.password?.type === 'required' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.password.message}</span>}
              {errors.password?.type === 'pattern' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.password.message}</span>}

            </div>
            <div className="-ml-2.5">
            <Controller
            control={control}
            defaultValue={false}
            name="remenberMe"
            render={({
              field: { onChange, onBlur, value, name, ref },
              /*fieldState: { invalid, isTouched, isDirty, error },
              formState,*/
            }) => (
              <Chekbox
              title={"Se souvenir de moi"}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                checked={value}
                inputRef={ref}
              />
            )}
          />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button 
            variant="gradient" 
            type="submit" fullWidth className="bg-blue"
            disabled={isSubmitting || errors.email ||errors.password} >
              connexion
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
            Vous n&apos;avez pas de compte ?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold "
                onClick={goSignup}
              >
                S'inscrire
              </Typography>
            </Typography>
          </CardFooter>
          </form>
        </Card>
      </Dialog>
        </div>
  )
}

export default LoginUser
import React, { useState } from 'react'

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

import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { loginUser } from '../../api/auth';
import { toast } from 'react-toastify';
import { photoBaseURL } from '../../screens/UserProfile';

const LoginUser = ({open, handleOpen}) => {

  const {register, handleSubmit, reset, control, formState:{errors, isSubmitSuccessful, isSubmitting}} = useForm({ mode:"onTouched" });

    const navigate =  useNavigate();
    const location = useLocation();
    const [errorAPI, setErrorAPI] = useState(null);


    //const [username, setUsername] = useState("")

    const onSubmit = async (data) => {
      
      try {
        const response = await loginUser(data);
        const {user} = response
        sessionStorage.setItem('user', user._id);
        sessionStorage.setItem('profilePhoto', user.profilePhoto);
        //console.log(response);
        reset();
        redirectHome();
      } catch (error) {
        setErrorAPI(error.response.data.message);
        //console.error('Erreur lors de l\'inscription :', error.response.data.message);
      }
      
        
  
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
            <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errorAPI}</span>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody className="flex flex-col gap-4">
            <div>
              <Input label="Nom" size="lg" {...register("username", {
                required:{
                  value: true,
                  message: 'Votre Nom est obligatoire !!!',
                },
              })} />

              {errors.username?.type === 'required' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.email?.message}</span>}

            </div>
            <div>
              <Input label="Mot de passe" size="lg" {...register("password", {
                required:{
                  value: true,
                  message: 'Mot de passe est obligatoire !!!',
                },
                /*pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                  message: 'Le mot de passe doit contenir au moins une lettre majuscule, minuscule lettre, chiffre et symbole spécial !!!',
                }*/
              })}/>

              {errors.password?.type === 'required' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.password?.message}</span>}
              {/*errors.password?.type === 'pattern' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.password.message}</span>*/}

            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button 
            variant="gradient" 
            type="submit" fullWidth className="bg-blue"
            disabled={isSubmitting} >
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
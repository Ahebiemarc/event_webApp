import React, { useEffect, useState } from 'react'

import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Chekbox from './Chekbox'
import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { Controller, useForm } from 'react-hook-form'
import ToastSuccess from '../toast/ToastSuccess'
import { toast } from 'react-toastify'
import { registerUser } from '../../api/auth'
import { useNavigate } from 'react-router-dom'

const SignupUser = () => {

  const {register, handleSubmit, reset, control, formState:{errors, isSubmitSuccessful, isSubmitting}} = useForm({ mode:"onTouched" });
  
  // pour afficher l'utilisateur qui vient de s'enregistrer
  const [errorAPI, setErrorAPI] = useState(null);




  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('username', data.username);
    formData.append('number', data.number);
    formData.append('password', data.password);
    if (data.photo) {
      formData.append('profilePhoto', data.photo[0]);
    }
    try {

      const response = await registerUser(formData);
      
      toast.success(`Utilisateur enregistré avec succès, Veuillez vous connecter !!!`);
  
      reset();
    } catch (error) {
      //console.error('Erreur lors de l\'inscription :', error);
      setErrorAPI(error.response.data.message);
      toast.error(`Erreur: ${errorAPI}`);
    }
  }

  
  return (
    <>
    <Navbar />
      <div>
        {isSubmitSuccessful && <ToastSuccess />}
        {/*<h1>{username}</h1>*/}

        <Card color="transparent" shadow={false} className="m-auto w-[350px] my-[80px] font-police">
        <Typography variant="h2" color="blue-gray" className="text-center">
          Inscription
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
        Entrez vos coordonnées pour vous inscrire.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)} >
          <div className="mb-4 flex flex-col gap-6">
            
            <div>
              <Input type="text" size="lg" label="Nom" name="username" {...register("username", {
                required:{
                  value: true,
                  message: 'Votre nom est obligatoire !!!',
                }
              })} />

              {errors.username?.type === 'required' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.username.message}</span>}

            </div>

            <div>
              <Input type="text" size="lg" label="Numéro" name="number" {...register("number", {
                required:{
                  value: true,
                  message: 'Votre Numéro est obligatoire !!!',
                }
              })}/>
              
              {errors.number?.type === 'required' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.number.message}</span>}

            </div>
            <div>
              <Input type="email" size="lg" label="Email" name="email" {...register("email", {
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
              <Input type="password" size="lg" label="Mot De Passe" name="password" {...register("password", {
                required:{
                  value: true,
                  message: 'Mot de passe est obligatoire !!!',
                },
                /*pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/,
                  message: 'Le mot de passe doit contenir au moins une lettre majuscule, minuscule lettre, chiffre et symbole spécial !!!',
                }*/
              })}/>

              {errors.password?.type === 'required' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.password.message}</span>}
              {/*errors.password?.type === 'pattern' && <span className="text-red-500 text-[0.8rem] mb[2rem] inline-block">{errors.password.message}</span>*/}

            </div>

          {/*<Controller
            control={control}
            defaultValue={false}
            name="joinClub"
            render={({
              field: { onChange, onBlur, value, name, ref },
              //fieldState: { invalid, isTouched, isDirty, error },
              //formState,
            }) => (
              <Chekbox
              title={"je suis membre d'un club ou association"}
                onBlur={onBlur} // notify when input is touched
                onChange={onChange} // send value to hook form
                checked={value}
                inputRef={ref}
              />
            )}
            />*/}
            
            {/*<Chekbox title={"je suis membre d'un club ou association"} name="joinClub" {...register("joinClub", { joinClub: false })}/>*/}
            
          </div>
          <Button className="mt-6 bg-blue" fullWidth type="submit" disabled={isSubmitting} >
            S'inscrire
          </Button>
          
        </form>
      </Card>
      </div>
      <Footer />
    </>
  )
}

export default SignupUser
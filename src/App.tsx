import { zodResolver } from '@hookform/resolvers/zod';
import { } from './App.css';
import { useForm } from "react-hook-form" 
import { z } from 'zod';
import { IMaskInput } from "react-imask";
import { useCallback, useEffect } from 'react';
import axios from 'axios';
//import { Masks } from './hooks/useStates';


const schemaForm = z.object({
   fullname: z.string().min(1, 'Por favor, informe um nome válido').max(100,'Por favor, informe um nome válido' ),
   documentNumber: z.string().min(11, 'Por favor, informe um CPF válido'),
   birthdate : z.string().min(9, 'Por favor, informe uma data válida'),
   email: z.string().min(1, 'Por favor, informe um email válido'),
   phoneNumber: z.string().min(11, 'Por favor, informe um número válido'),
   educationLevel: z.string().min(1, 'Por favor, informe um email válido'),
   minimumWage: z.string().min(1, 'Por favor, informe uma renda válida'),
   password: z.string().min(10, 'Por favor, informe uma senha válida'),
   confirmPassword: z.string().min(10, 'Por favor, informe uma senha válida'),
   mother: z.string().min(1, 'Por favor, informe um nome válido'),

  address : z.object ({
    zipcode: z.string().min(8, 'Por favor, informe um CEP válido'),
    addressState: z.string().max(2, 'Por favor, informe um Estado válido'),
    addressNumber: z.string().min(1, 'Por favor, informe um número válido').max(40, 'Por favor, informe um número válido'),
    country: z.string().min(1, 'Por favor, informe um País válido'),
    city: z.string().min(8, 'Por favor, informe uma cidade válido'),
    addressDistrict: z.string().min(1, 'Por favor, informe um bairro válido'),
    addressStreet: z.string().min(1, 'Por favor, informe um endereço válido'),
    addressComplement: z.string(),


  })
})


type createUserFormData = z.infer<typeof schemaForm>
type AddressProps = {
  bairro:string;
  complemento:string;
  uf:string;
  logadouro:string;
 localidade:string;
}

export default function App() {
 const{
  register,
  handleSubmit,
  watch,
  setValue,
  formState: { errors }
 } = useForm<createUserFormData>({
  criteriaMode: 'all',
  mode: 'all',
  resolver: zodResolver(schemaForm),

 })
 const zipcode = watch('address.zipcode')

 const onSubmit = ( data: createUserFormData ) => console.log(data)
 
 const handleSetData = useCallback(
    (data: AddressProps) =>{
      setValue('address.city', data.localidade)
      setValue('address.addressStreet', data.logadouro)
      setValue('address.addressState', data.uf)
      setValue('address.addressDistrict', data.bairro)
 }, [setValue])


const handleFetchAddress = useCallback(
  async (zipcode:string) => {
    const{ data } =
  await axios.get(
    `https://viacep.com.br/ws/${zipcode}/json/`
  );
  handleSetData(data)
}, [handleSetData])

useEffect(() =>{
 // setValue('address.zipcode', Masks(zipcode) ) aqui não estou conseguindo aplicar a máscara no CEP 
  if(zipcode !== 8)  return
  handleFetchAddress(zipcode)
}, [handleFetchAddress, zipcode])



 
  return (
    <div className='  bg-zinc-50 flex items-center justify-center ' >
      <form onSubmit={handleSubmit(onSubmit)}>

        <div  >
        <label htmlFor="name">Nome Completo</label>
        <input type="text" 
        {...register("fullname")}
        />
        {errors.fullname && <span className=' text-red-500 '>{errors.fullname.message}</span>}
        </div>

        
        <div>
        <label htmlFor="cpf">CPF</label>
        <IMaskInput
        mask={"000.000.000-00"}
         type="text" 
        {...register("documentNumber")}
        />
        {errors.documentNumber && <span className=' text-red-500 '>{errors.documentNumber.message}</span>}
        </div>

        <div className=' flex flex-col gap-1 '>
        <label htmlFor="name">Data de nascimento</label>
        <input type="number" 
        {...register("birthdate")}
        className=' border border-zinc-200 shadow-sm rounded h-10 '
        />
        {errors.birthdate && <span className=' text-red-500 '>{errors.birthdate.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Contato</label>
        <IMaskInput
        mask={"(00)00000-0000"}
        {...register("phoneNumber")}
        />
        {errors.phoneNumber && <span className=' text-red-500 '>{errors.phoneNumber.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Nome da Mãe</label>
        <input type="text" 
        {...register("mother")}
        />
        {errors.mother && <span className=' text-red-500 '>{errors.mother.message}</span>}
        </div>

        <div>
        <label htmlFor="cep">CEP</label>
        <input
        type="text"
        {...register("address.zipcode")}
        />
        {errors.address?.zipcode && <span className=' text-red-500 '>{errors.address?.zipcode.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Estado</label>
        <input type="text" 
        {...register("address.addressState")}
        />
        {errors.address?.addressState && <span className=' text-red-500 '>{errors.address?.addressState.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Cidade</label>
        <input type="text" 
        {...register("address.city")}
        />
        {errors.address?.city && <span className=' text-red-500 '>{errors.address?.city.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Endereço</label>
        <input type="text" 
        {...register("address.addressStreet")}
        />
        {errors.address?.addressStreet && <span className=' text-red-500 '>{errors.address?.addressStreet.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Bairro</label>
        <input type="text" 
        {...register("address.addressDistrict")}
        />
        {errors.address?.addressDistrict && <span className=' text-red-500 '>{errors.address?.addressDistrict.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Número</label>
        <input type="number" 
        {...register("address.addressNumber")}
        />
        {errors.address?.addressNumber && <span className=' text-red-500 '>{errors.address?.addressNumber.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Complemento</label>
        <input type="text" 
        {...register("address.addressComplement")}
        />
        {errors.address?.addressComplement && <span className=' text-red-500 '>{errors.address?.addressComplement.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Email</label>
        <input type="email" 
        {...register("email")}
        />
        {errors.email && <span className=' text-red-500 '>{errors.email.message}</span>}
        </div>

        <div>
        <label htmlFor="name">Renda Mensal</label>
        <IMaskInput
        mask={"R$ 0,000,00"}
        type='text'
        {...register("minimumWage")}
        />
        {errors.minimumWage && <span className=' text-red-500 '>{errors.minimumWage.message}</span>}
        </div>

        <div>
        
        <label htmlFor="name">Escolaridade</label>
       <label htmlFor="">Ensino Fundamental Completo
       <input 
        {...register("educationLevel")} 
        type="radio"
        />
        </label>
        <label htmlFor="">Ensino Médio Completo
       <input 
        {...register("educationLevel")} 
        type="radio"
        />
        </label>
        <label htmlFor="">Ensino Superior Completo
       <input 
        {...register("educationLevel")} 
        type="radio"
        />
        </label>
        </div>

        <div>
        <label htmlFor="senha">Senha</label>
        <input type="password" 
        {...register("password")}
        />
        {errors.password && <span className=' text-red-500 '>{errors.password.message}</span>}
        </div>

        <div>
        <label htmlFor="senha">Confirmar senha</label>
        <input type="password" 
        {...register("confirmPassword")}
        />
        {errors.confirmPassword && <span className=' text-red-500 '>{errors.confirmPassword.message}</span>}
        </div>
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
import axios from "axios"

export interface LoginInterface{
   username: string,
   password: string
}

export interface RegisterInterface {
   username: string;
   password: string;
   email: string;
 }

 export interface ForgotPasswordInterface{
    email: string;
 }

 export interface ResetPasswordInterface{
   password: string;
   confirmPassword: string;
   token: string;
   public_id: string;
}

export interface VerfiyAccountInterface{
   public_id:string;
   token:string;
}

export default class AccountService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   static login = (data: LoginInterface) : Promise<any> =>{
      return axios.get(`${AccountService.BASE_URL}/login`, {
         auth: data
   })}

   static register = (data:RegisterInterface) : Promise<any> =>{
      return axios.post(`${AccountService.BASE_URL}/register`,data)
   }

   static forgotPassword = (data:ForgotPasswordInterface) : Promise<any> =>{
      return axios.post(`${AccountService.BASE_URL}/forgotpass`,data)
   }

   static resetPassword = (data:ResetPasswordInterface) : Promise<any> =>{
      //console.log(data)
      return axios.post(`${AccountService.BASE_URL}/resetpass`,data)
   }

   static verifyAccount (data:VerfiyAccountInterface) : Promise<any> =>{
      return axios.post(`${AccountService.BASE_URL}/verifyaccount`,data)
   }
   
}
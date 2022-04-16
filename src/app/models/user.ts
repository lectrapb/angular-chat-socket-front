export class User {

     constructor(
         public name: string,
         public email: string,
         public img: string,
         public google: boolean,
         public password?: string,
         public role?: string, 
         public uid?: string,
     ){}
}

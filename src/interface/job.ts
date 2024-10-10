export interface User {
   name: string;
   phoneNumber: string;
}

export interface Job {
   id: number;
   title: string;
   content: string;
   createdAt: string;
   updatedAt: string;
   user: User;
}

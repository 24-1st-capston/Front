export interface User{
   name: string;
}

export interface Article {
   id: number;
   title: string;
   content: string;
   imgUrl: string;
   createdAt: string;
   updatedAt: string;
   rentAt: string;
   user: User;
}
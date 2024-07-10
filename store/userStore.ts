'use client'

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';

interface User {
    userId : string;
    username: string;
    email?: string;
    avatar?: string;
    status_pool?: {
        imcomplete:{
            id: string;
            status:{
                name: string;
                description: string;
            }
        }[],
        complete:{
            name: string;
            description: string;
        }
    }

    setUserId: (userId: string) => void
    setUserName: (username: string) => void
    setEmail: (email:string) => void
    setAvatar: (avatar:string) => void
    setStatusPool:(statusPool:User["status_pool"]) => void
}

export const useUserStore = create<User>()(
    immer(
        persist(
            (set)=>({
                userId:"",
                username:"",
                email:"",
                avatar:"",
                status_pool:undefined,
                setUserId: (id: string) => set(state => { state.userId = id }),
                setUserName: (username: string) => set(state => { state.username = username}),
                setEmail: (email:string) => set(state =>{state.email=email}),
                setAvatar: (avatar:string) => set(state => {state.avatar = avatar}),
                setStatusPool:(statusPool:User["status_pool"]) => set(state => {state.status_pool = statusPool})
            }),
            {
                name: 'user-store',
            }
        )
    )
);
import { Injectable } from "@angular/core";

export interface DataForm {
    usernameOrEmail: string;
    password: string;
}
export interface User {
    data: {
        id: number;
        username: string;
        email: string;
        first_name: string; 
        last_name: string;
        date_of_birth: string;
        time_zone: string;
    }
}

export interface GetUserResponse {
    data: {
        username: string;
        email: string;
        firstName: string; 
        lastName: string;
        dateOfBirth: string;
    }
}
export interface UserUpdateRequest {
    first_name: string
    last_name: string
    username: string
    date_of_birth: string
}


export interface LoginResponse {
    error: boolean;
    message: string;
    data: {
        token: string;
        message: string;
        id: number;
        username: string;
    };
}
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    time_zone: string;
}
export interface RegisterResponse {
    error: boolean;
    message: string;
    data: number;
}
export interface ConfirmEmailData {
    code: string;
    id: number;
}

export interface ResetPassword{
    email:string
    password: string
    id: number
}
export interface ResetPasswordResponde {
    message: string
    id: number
}
export interface JWTClaims {
    Usrname: string
    Email: string
    Id: string 
}
export interface SubscriptionSubmit {
    id: number
    name: string
    discription: string
    status_subscription: {
        type_sub: number
        time_limited: number
        custom_timeLimit: number
    }
    price_subscription: {
        price: number
        currency: string
    }
    days_of_week: string[]
    time: string[]
    automatically_management: boolean
}
export interface SubscriptionResp {
    message: string
    id: number
}
Injectable({
    providedIn: 'root'
})
export interface SubscriptionData {
    id: number
    name: string
    description: string
    typeSub: string
    timeLimited: string
    customTimeLimited: number
    price: number
    currency: string
    daysOfWeek: string[]
    automaticallyManagement: boolean
    cronId: number
    idScheduler: number
    time: string[]
}
export interface GroupData {
    id: number
    name: string
    coachId: number
    subscriptionId: number
    subscriptionName: string
    customTimeLimited: number
    timeLimited: string
}

export interface AthleteData{
    id: number
    firstName: string
    lastName: string
    dateLast: number
    daysLeft: number
    subscriptionId: number
    groupId: number
}

export interface requestForSelected {
    id: number[]
}
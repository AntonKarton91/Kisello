export interface IUser {
    id: string
    name: string
    avatar: string
}

export enum TypeEmployerPosition {
    Engineer,
    Designer,
    Sales_manager,
    Department_Head,
    Supply,
    Worker
}

export interface IColumn {
    _id: string
    name: string
    cardList: string[]
}

export interface IComment {
    _id: string
    userId: string
    cardId: string
    body: string
    createdAt: string
}

export interface ICartPrev {
    _id: string
    title: string
    tagList: string[]
    date: string
    participants: string[]
    completed: boolean
    description: string
}

export interface ITagList {
    _id: string
    title: string
    color: string
}



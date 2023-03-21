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

export interface ICartPrev {
    id: string
    title: string
    tagList: string[]
    date: string
    participants: string[]
    completed: boolean
}

export interface ITagList {
    id: string
    title: string
    color: string
}



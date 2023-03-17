export interface IUser {
    id: string
    name: string
    surname: string
    avatar: string
}

export interface IColumn {
    id: string
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



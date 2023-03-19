import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useRef, useState} from "react";
import styles from "./mainProfile.module.scss"
import {useAppDispatch, useAppSelector} from "../../../Store/hooks";
import {Button, CircularProgress, TextField} from "@mui/material";
import {ImageComponent} from "../../../UIComponents";
import {AvatarPlaceholderComponent} from "../../../UIComponents/AvatarPlaceholder/avatarPlaceholder.component";
import FileUploadIcon from '@mui/icons-material/FileUpload';

export interface MainProfileProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}


export const MainProfileComponent = ({}: MainProfileProps): React.ReactElement => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPhone, setCurrentPhone] = useState<string>("");

    const ref = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const {
        id,
        surname,
        position,
        phoneNumber,
        email,
        name,
        avatar,
        loading
    } = useAppSelector(state => state.user)

    const downloadClickHandler = (e: React.MouseEvent) => {
        e.preventDefault()
        if (ref.current) {
            ref.current.click()
        }
    }

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(selectedImage)
    }

    return (
        <div className={styles.container} >
            <div className={styles.name}>{"Антон"} {"Киселев"}</div>
            <div className={styles.email}>{"anton.karton91@mail.ru"}</div>
            <div className={styles.avatarContainer}>
                    {
                        avatar || selectedImage
                            ? <ImageComponent width={120} height={120} circle src={selectedImage ? URL.createObjectURL(selectedImage) : avatar}/>
                            : <AvatarPlaceholderComponent circle size={120} title={"Антон"} fontSize={40}/>
                    }
                <Button
                    classes={{root: styles.uploadButton}}
                    size={"small"}
                    variant={"outlined"}
                    onClick={(e)=>downloadClickHandler(e)}
                >
                    <div>Загрузить</div>
                    <FileUploadIcon sx={{width: "20px"}}/>
                </Button>
                <input
                    hidden
                    ref={ref}
                    type="file"
                    id={"ava"}
                    name="myImage"
                    onChange={(event) => {
                        // @ts-ignore
                        setSelectedImage(event.target.files[0]);
                    }}
                />
            </div>
            <div className={styles.content}>
                <TextField
                    id={"phone"}
                    label="Телефон"
                    variant="standard"
                    value={currentPhone ? currentPhone : phoneNumber} onChange={e=>{setCurrentPhone(e.target.value)}}/>
            </div>

            {/*{*/}
            {/*    loading*/}
            {/*        ? "Profile"*/}
            {/*        : <CircularProgress />*/}
            {/*}*/}
            <Button
                classes={{root: styles.submit}}
                onClick={submitHandler}
                disabled={loading}
                variant={"contained"}>
                Изменить
            </Button>
        </div>
    )
};


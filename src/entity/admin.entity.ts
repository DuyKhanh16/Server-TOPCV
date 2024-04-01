import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'admin'})
export class Admin {

    @PrimaryGeneratedColumn({type:'int'})
    admin_id:number

    @Column({type:'varchar',length:50})
    admin_name:string
    
    @Column({type:'varchar',length:50})
    admin_email:string

    @Column({type:'varchar',length:50})
    admin_password:string

    @Column({type:'varchar',length:255,
    default:"https://cdn.openart.ai/uploads/image_WsyXXCRR_1689685834461_512.webp"
    })
    admin_avatar:string

    @Column({default:2})
    role:number
}
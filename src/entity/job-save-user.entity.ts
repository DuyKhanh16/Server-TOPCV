import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";
import { Job } from "./job.entity";
import { Notification } from "./notification.entity";


@Entity({name:'job_save_user'})
export class JobSaveUser{
    @PrimaryGeneratedColumn()
    job_save_id:number;
    @ManyToOne(()=>UserEntity,(user)=>user.job_save_user)
    @JoinColumn({name:'user_id'})
    user:UserEntity;
     
    @ManyToOne(()=>Job,(job)=>job.job_save_user)
    @JoinColumn({name:'job_id'})
    job:Job

    notification:Notification
}
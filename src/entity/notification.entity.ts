import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompanyCv } from "./company_cv.entity";
import { JobSaveUser } from "./job-save-user.entity";
import { Apply } from "./apply.entity";

@Entity("notification")
export class Notification {
    @PrimaryGeneratedColumn()
    notification_id:number

    @Column({type:"varchar",length:255})
    notification_content:string

    @Column({type:"int",default:0})
    notification_status:number
    
    @ManyToOne(()=>CompanyCv,companyCv=>companyCv.notification,{cascade:true,nullable:true})
    @JoinColumn({name:'companyCv_id'})
    companyCv:CompanyCv

    @ManyToOne(()=>JobSaveUser,jobsaveuser=>jobsaveuser.notification,{cascade:true,nullable:true})
    @JoinColumn({name:'job_save_id'})
    jobsaveuser:JobSaveUser

    @ManyToOne(()=>Apply,apply=>apply.notification,{cascade:true,nullable:true})
    @JoinColumn({name:'apply_id'})
    apply:Apply


}
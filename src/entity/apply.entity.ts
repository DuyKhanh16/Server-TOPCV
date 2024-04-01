import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cv } from "./cv.entity";
import { Job } from "./job.entity";
import { Notification } from "./notification.entity";

@Entity({name:'apply'})
export class Apply {
    @PrimaryGeneratedColumn()
    apply_id:number;
    
    @Column({type:"int",default:0})
    apply_status:number
    
    @ManyToOne(()=>Cv,cv=>cv.apply,{cascade:true})
    @JoinColumn({name:'cv_id'})
    cv:Cv

    @ManyToOne(()=>Job,job=>job.apply,{cascade:true})
    @JoinColumn({name:'job_id'})
    job:Job

    notification:Notification
}
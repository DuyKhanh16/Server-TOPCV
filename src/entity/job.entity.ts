import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { JobSaveUser } from "./job-save-user.entity";
import { Apply } from "./apply.entity";

@Entity({name:'job'})
export class Job{
    @PrimaryGeneratedColumn({type:"int"})
    job_id:number;

    @Column({type:"varchar",length:255})
    job_name:string;

    @Column({type:"varchar"})
    job_city:string;
    
    @Column({type:"longtext"})
    job_address:string;

    @Column({type:"longtext"})
    job_description:string;

    @Column({type:"longtext"})
    job_request:string;

    @Column({type:"varchar"})
    job_salary:string

    @Column({type:"longtext"})
    job_welfare:string

    @Column({default:1})
    job_status:number

    @Column({type:"varchar"})
    job_exp:string

    @ManyToOne(()=>Company,(company)=>company.job)
    @JoinColumn({name:'company_id'})
    company:Company

    @OneToMany(()=>JobSaveUser,(job_save_user)=>job_save_user.job,{
        cascade:true
    })
    job_save_user:JobSaveUser[]

    apply:Apply
}
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Cv } from "./cv.entity";
import { Notification } from "./notification.entity";


@Entity("company_cv")
export class CompanyCv {
    @PrimaryGeneratedColumn()
    companyCv_id:number

    @ManyToOne(()=>Company,(company)=>company.companyCv,{cascade:true})
    @JoinColumn({name:'company_id'})
    company:Company

    @ManyToOne(()=>Cv,(cv)=>cv.companyCv,{cascade:true})
    @JoinColumn({name:'cv_id'})
    cv:Cv
    
    notification:Notification
}
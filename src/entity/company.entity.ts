import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";
import { AddressEntity } from "./address.entity";
import { CompanyCv } from "./company_cv.entity";

@Entity({name:'company'})
export class Company {
    @PrimaryGeneratedColumn()
    company_id:number;

    @Column()
    company_email:string;

    @Column()
    company_password:string;

    @Column()
    company_name:string;

    @Column({type:"varchar",nullable:true})
    company_phone:string;

    @Column({default:"https://www.incnow.com/wp-content/uploads/2023/08/Shutterstock_1059255266-scaled.jpg",
    type:"varchar",length:5000})
    company_avata:string;

    @Column({default:0})
    company_pay:number;

    @Column({type:"varchar",length:255,nullable:true})
    company_web:string

    @Column({type:"varchar",length:255,nullable:true})
    company_career:string

    @Column({type:"varchar",length:255,nullable:true})
    company_human:string

    @Column({type:"varchar",length:1000,nullable:true})
    company_bacgroundPhoto:string

    @Column({type:"varchar",length:3000,nullable:true})
    company_description:string

    @Column({default:1})
    role:number;
    @OneToMany(()=>Job,(job)=>job.company,{
        cascade:true
    })
    job:Job[]

    @OneToOne(()=>AddressEntity,(address)=>address.company,{
        cascade:true
    })
    @JoinColumn({name:'address_id'})
    address:AddressEntity

    @OneToMany(()=>CompanyCv,(companyCv)=>companyCv.company)
    companyCv:CompanyCv
}

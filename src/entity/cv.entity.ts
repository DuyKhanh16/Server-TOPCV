import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";
import { Apply } from "./apply.entity";
import { CompanyCv } from "./company_cv.entity";

@Entity({name:'cv'})
export class Cv{
    @PrimaryGeneratedColumn()
    cv_id:number;

    @Column()
    cv_fullnName:string;

    @Column()
    cv_email:string;

    @Column()
    cv_job:string;

    @Column()
    cv_brirthday:string;

    @Column()
    cv_address:string;

    @Column()
    cv_phone:string;

    @Column({type:"longtext"})
    cv_avata:string

    @Column({type:"longtext"})
    cv_skill:string

    @Column({type:"longtext"})
    cv_experience:string

    @Column({type:"longtext"})
    cv_action:string

    @Column({type:"longtext"})
    cv_cartificate:string

    @Column({type:"longtext"})
    cv_target:string
    
    @Column({type:"longtext"})
    cv_education:string

    @Column({type:"int",default:0})
    cv_status:number

    @Column({type:"varchar"})
    cv_date:string
    @ManyToOne(()=>UserEntity,user=>user.user_id,{
        cascade: true
      })
    @JoinColumn({name:'user_id'})
    user:UserEntity|number

    @OneToMany(()=>Apply,apply=>apply.cv)
    apply:Apply

    @OneToMany(()=>CompanyCv,companyCv=>companyCv.cv)
    companyCv:CompanyCv
}
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users.entity";
import { Company } from "./company.entity";

@Entity({name:'address'})
export class AddressEntity {
    @PrimaryGeneratedColumn({type:"int"})
    address_id:number;

    @Column({type:"varchar"})
    home:string;

    @Column({type:"varchar"})
    street:string;

    @Column({type:"varchar"})
    district:string;

    @Column({type:"varchar"})
    city:string;

    @OneToOne(()=>UserEntity,(user)=>user.address)
    user:UserEntity

    @OneToOne(()=>Company,(company)=>company.address)
    company:Company
}
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from './cv.entity';
import { JobSaveUser } from './job-save-user.entity';
import { AddressEntity } from './address.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({type:'varchar',length:55})
  user_fullName: string;

  @Column({nullable:true})
  user_number: string;

  @Column()
  user_email: string;

  @Column()
  user_password: string;

  @Column({ default: 1 })
  user_status: number;

  @Column({ default: 0 })
  user_recruitment: number;

  @Column({default:'',
    type: "varchar",length:5000
  })
  user_avata: string;

  @Column({ default: 0 })
  role: number;

  @Column({nullable:true})
  user_phone: string;

  @OneToMany(() => Cv, (cv) => cv.user)
  cv: Cv[];
 
@OneToMany(()=>JobSaveUser,(job_save_user)=>job_save_user.user,{cascade:true})

job_save_user:JobSaveUser[]

@OneToOne(()=>AddressEntity,(address)=>address.user,{cascade:true,
})
@JoinColumn({name:'address_id'})
address:AddressEntity
}

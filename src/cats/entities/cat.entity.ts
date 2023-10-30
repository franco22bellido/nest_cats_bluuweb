import { Breed } from '../../breeds/entities/breed.entity';
import { User } from '../../user/entities/user.entity';
import {Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Cat {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;
    @Column()
    age : number;

    @DeleteDateColumn()
    deletedAt : Date;

    @Column()
    breedId: number;

    @ManyToOne(()=> Breed, breed => breed.cats, {eager: false})
    breed: Breed;
    
    @ManyToOne(()=> User)
    @JoinColumn({
        name: 'userEmail',
        referencedColumnName: 'email'
    })
    user: User;

    @Column()
    userEmail : string;
    

}
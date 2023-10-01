import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from 'typeorm'
import { Cat } from '../../cats/entities/cat.entity'

@Entity()
export class Breed {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name : string;

    @OneToMany(()=> Cat, cat => cat.breed,{eager: false, cascade: false})
    @JoinColumn({name: "breedId"})
    cats: Cat[];

}
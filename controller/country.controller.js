import db from '../config/db.js';
import path from 'path';
import { countryPatchValidation, countryValidation } from '../validations/country.validation.js';



async function getAllCountries(req, res) {
    try {
        let [country] = await db.query("select * from country")

        res.status(202).json({country})
        
    } catch (error) {
        res.json({error: error.message})
    }
}

async function getCountryById(req, res) {
    try {
        let {id} = req.params

        let [country] = await db.query("select * from country where id = ?", [id])

        if (!country.length) {
            return res.status(202).json({country: "country not found !"})
            
        }
        res.status(202).json({country})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function createCountry(req, res) {
    try {
        let {error, value} = countryValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }
        let {nameUZ, nameRU} = value

        console.log(nameUZ, nameRU);    
        let [user] = await db.query("insert into country(nameUZ, nameRU) values (?, ?)", [nameUZ, nameRU])
        if(user.affectedRows == 1){
            res.json({data:"Created"})
        }
        else{
            res.json({message: "Bazaga saqlashda xatolig"})
        }
    } catch (error) {
        res.json({error: error.message})
    }
}

async function updateCountry(req, res) {
    try {
        let {id} = req.params
        let {error, value} = countryPatchValidation.validate(req.body)
        if (error) {
            return res.status(401).json({error: error.details[0].message})
        }


        let keys = Object.keys(value)
        let values = Object.values(value)
        let queryKey = keys.map((k) => (k += " = ?"))
        let result = await db.query(`UPDATE country SET ${queryKey.join(",")} where id = ?`, [...values, id])
        console.log(result);
        
        res.status(202).json({data: "country updated"})

    } catch (error) {
        res.json({error: error.message})
    }
}

async function deleteCountry(req, res) {
    try {
        let {id} = req.params

        let [user] = await db.query("select * from country where id = ?", [id])     
        if (!user.length) {
            return res.status(401).json({error: "country not found"})
        }
        await db.query("delete from country where id = ?", [id])     
        res.status(202).json({data: "country deleted"})    
    } catch (error) {
        res.json({error: error.message})
    }
}

export { createCountry,deleteCountry,getAllCountries,getCountryById,updateCountry };

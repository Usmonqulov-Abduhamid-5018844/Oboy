import db from '../config/db.js';
import { countryPatchValidation, countryValidation } from '../validations/country.validation.js';



async function getAllCountries(req, res) {
    try{
        const [data] = await db.query("select * from country");
        if(!data.length){
            return res.status(401).json({message: "country not fount"});
        }
        
        if (Object.keys(req.query).length === 0) {
            res.status(201).json({data})
        }else{
            let keys = Object.keys(req.query)
            let value = Object.values(req.query)
    
            let queryKey = keys.map((p)=> (p += " = ?"))
            let queryValues = value.map((p)=> (p += ""))
    
            let country = []
            for (let i = 0; i < keys.length; i++) {
    
                keys[i] = keys[i].toLowerCase()
                
                if (keys[i] === "nameUZ" || keys[i] === "nameRU") {
                    let [countrys] = await db.query(`select * from country where ${queryKey.join(" AND ")}`,[...queryValues])   
                    country.push(countrys)
                }
            }
    
            if (keys[0] === "page" || keys[1] === "take") {
                
                let page = parseInt(req.query.page) || 1
                let take = parseInt(req.query.take) || 10
    
                let offset = (page - 1) * take; 
    
                try {
                    let [countrys] = await db.query(`SELECT * FROM country LIMIT ? OFFSET ?`, [take, offset]);
                    return res.status(200).json({ page, take, countrys });
                } catch (error) {
                    return res.status(500).json({ error: "Server xatosi" });
                }
            }
            country = country.flat()
                if (!country.length) {
                    return res.status(401).json({country: "Data not Found"})
                }
             res.status(201).json({country})               
        }    
    }catch(e){
        res.status(401).json({message: e.message})
        console.log(e);
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

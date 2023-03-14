const mongoose = require('mongoose');

const AnimalRecord = require("../models/animalRecord")
const fs = require('fs')

exports.createAnimalRecord = async (req, res) => {
    try {


        let grazing_facility = req.body.grazing_facility;
        let stall_lick = req.body.stall_lick;
        let deformity_status = req.body.deformity_status;
        let vet_consultency = req.body.vet_consultency;
        let vaccination_status = req.body.vaccination_status;
        let deworming_status = req.body.deworming_status;





        if(grazing_facility=='true'){
            grazing_facility=true
        }else{grazing_facility=false}

        if(deformity_status=='true'){
            deformity_status=true
        }else{deformity_status=false}
        
        if(stall_lick=='true'){
            stall_lick=true
        }else{stall_lick = false}

        if(vet_consultency=='true'){
            vet_consultency=true
        }else{vet_consultency = false}

        if(vaccination_status=='true'){
            vaccination_status=true
        }else{vaccination_status = false}

        if(deworming_status=='true'){
            deworming_status=true
        }else{deworming_status = false}


      
        const {
            breed,
            body_coat_major_color,
            body_coat_minor_color,
            horns_type,
            horns_position,
            known_age,
            live_weigh_kg,
            origin,
            farmer_name,
            address,
            housing_roof_type,
            housing_floor_type,
            living_climate_temp_centigrade,
            stall_type,
            health_status,
            disease_condition_history,
            treatment_history,
            withdrawal_period,
            name_of_slaughter_house,
            method_of_slaughter,
            carcass_weight,
            qr_code,
            feeding_dry_roughage,
            feeding_green_roughage,
            feeding_concentrated
        } = req.body;

        

        const foundResult = await AnimalRecord.findOne({qr_code:qr_code});
        if(foundResult){
            return(
                res.json({
                    message: "Animal already registered with this qr_code",
                    status:false
                })
            )
        }

        console.log(qr_code)
        if(!qr_code){
            return(
                res.json({
                    message: "please must provide qr_code",
                    status:false
                })
            )
            
        }
        let image;
        if(req.file){
             image = req.file.path
        }

        const animalRecord = new AnimalRecord({
            _id: mongoose.Types.ObjectId(),
            breed,
            body_coat_major_color,
            body_coat_minor_color,
            horns_type,
            horns_position,
            known_age,
            live_weigh_kg,
            origin,
            farmer_name,
            address,
            housing_roof_type,
            housing_floor_type,
            living_climate_temp_centigrade,
            stall_type,
            grazing_facility,
            stall_lick,
            health_status,
            deformity_status,
            disease_condition_history,
            vet_consultency,
            treatment_history,
            withdrawal_period,
            vaccination_status,
            deworming_status,
            name_of_slaughter_house,
            method_of_slaughter,
            carcass_weight,
            qr_code,
            image:image,
            feeding_concentrated:feeding_concentrated, 
            feeding_green_roughage : feeding_green_roughage,
            feeding_dry_roughage:feeding_dry_roughage
        });

        

        const result = await animalRecord.save();

        if(result){
            res.status(201).json({
                message: 'Animal record created successfully',
                status:true,
                animalRecord: result
            });
        }
        else{
            res.status(404).json({
                message: "Could not save record due to some reason",
                status:false,
                
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Error",
            error:error.message
        });
    }
};


exports.getAnimalBy_QR = async (req , res)=>{
    try{
        const qr_code = req.query.qr_code;

        if(!qr_code){
            return(
                res.json({
                    message: "qr_code must be provided",
                    status : false
                })
            )
        }

        const result = await AnimalRecord.findOne({qr_code:qr_code});
        
        if(result){
            res.status(201).json({
                message: 'Animal record found successfully',
                status:true,
                animalRecord: result
            });
        }
        else{
            res.status(404).json({
                message: "Could not find",
                status:false,
                
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

exports.deleteAnimalRecord = async (req,res)=>{
    try{
        const animal_id = req.query.animal_id;

        const foundResult = await AnimalRecord.findOne({_id: animal_id});

        if(foundResult){
            if(foundResult.image){
                fs.unlink(foundResult.image , (err, data)=>{
                    if(!err){
                        console.log("previous image deleted");
                    }
                    else{
                        console.log("COuld not find or delete previous image ")
                    }
                })
            }
        }


        const result = await AnimalRecord.deleteOne({_id: animal_id});
        if(result.deletedCount>0){
            res.json({
                message: "Successfully deleted",
                status:true,
                result:result
            })
        }
        else{
            res.json({
                message: "Could not delete any record",
                status:false
            })
        }
      }
      catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
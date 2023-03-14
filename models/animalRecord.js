 const mongoose = require('mongoose');


 const animalRecord = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    breed : {
        type:String,
        enum: ["niliravi" , "kundi" , "non descript buff" , 'dhanni' , 'cholistani' , 'sahiwal' , 'dajal' , 'lohani' , 'red sindhi' , 'bhagnari' , 'cross breed' , 'non descript cattle']
    },
    body_coat_major_color: {
        type:String,
        enum:['black' , 'grey' , 'white', 'red' , 'miscellaneous']
    }
    , 
    body_coat_minor_color:{
        type:String,
        enum:['white spots' , 'black spots' , 'red spots' , 'brown spots' , 'none']
    },
    horns_type:{
        type:String,  
        enum:['small' , 'medium' , 'large' , 'polled']
    },
    horns_position:{
        type:String,  
        enum:['inward' , 'outward' , 'downward' , 'half ring' , 'full ring' , 'none']
    },
    known_age:{
        type:String,
        enum:["kheera" , 'donda' , 'choga' ,'chigga' , 'full mouth' , 'broken teeth' ]
    }, 
    live_weigh_kg:String,
    origin: String,
    farmer_name: String,
    address: String,
    housing_roof_type: {
        type:String,
        enum:['lenter' , 'slabs' ,'iron sheet' , 'fibre sheet' , 'other roof']
    }, 
    housing_floor_type:{
        type:String,
        enum:["brick" , 'pakka' , 'katcha' , 'cubical' , 'other floor']
    },
    living_climate_temp_centigrade:{
        type:String
    },
    stall_type:{
        type:String,
        enum:['tie' , 'free']
    },
  
    grazing_facility:{
        type:Boolean
    },
    stall_lick :{
        type:Boolean
    },
    health_status:{
        type:String,
        enum:['dull'  , 'active_alert']
    },
    deformity_status:Boolean,
    disease_condition_history:{
        type:String,
        enum:['diarrhea' , 'cough' ,'fever' , 'skin allergy' , 'injury' , 'indigestion']
    },
    vet_consultency: Boolean,
    treatment_history:String,
    withdrawal_period : {
        type:String,
        enum:['completed' , 'not_completed']
    },
    vaccination_status:Boolean,
    deworming_status: Boolean, 
    name_of_slaughter_house:String,
    method_of_slaughter:{
        type:String,
        enum:["halal"]
    },
    carcass_weight:Number,
    qr_code:String,
    image:String,
    feeding_dry_roughage : {
        type: String,
        default : "null"
    },
    feeding_green_roughage :{
        type: String,
        default : "null"
    },
    feeding_concentrated : {
        type: String,
        default : "null"
    }

 })


module.exports = mongoose.model ("animal_record" , animalRecord)

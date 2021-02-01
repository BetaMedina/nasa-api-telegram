export type INasaEntity = {
  name:String,
  close_approach_data:{
    miss_distance:{
      kilometers:String
    }
  }
  relative_velocity:{
    kilometers_per_second:String
  }
  estimated_diameter:{
    kilometers:{
      estimated_diameter_min:Number
      estimated_diameter_max:Number
    }
  } 
}

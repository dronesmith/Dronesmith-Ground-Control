require 'pry'
require 'json'
require 'httparty'


class TelemetryController < ApplicationController

include HTTParty
  

 ##METHOD OBTAINS USER FORM INFO TO SEND TO MAPQUEST
   def get_form
 	@form_params = request.request_parameters
     binding.pry
     self.send_loc(@form_params) 
   end

   def send_loc(form_params)
   	 @current_loc =  @form_params["locations"][0] 
     @destination_loc = @form_params["locations"][1]
     response = HTTParty.post("http://www.mapquestapi.com/directions/v2/route?key=#{ENV["pusher_key"]}",
      {
	    locations: [
	        @current_loc,
	        @destination_loc
	    ],
	    options: {
	        avoids: [],
	        avoidTimedConditions: false,
	        doReverseGeocode: true,
	        shapeFormat: raw,
	        generalize: 0,
	        routeType: fastest,
	        timeType: 1,
	        locale: en_US,
	        unit: m,
	        enhancedNarrative: false,
	        drivingStyle: 2,
	        highwayEfficiency: 21.0	    
        }
      }
     )   
   end

 ##METHOD OBTAINS MAPQUEST TELEMETRY INFORMATION TO SEND TO THE DS CLOUD SERVICE
   def parse_data
 	@data_params = request.request_parameters
    @shape_points =  @data_params["route"]["shape"]["shapePoints"] 
     binding.pry
     self.send_data(@shape_points) 
   end

  #SEND MAP POINTS TO DS SERVER 
    def send_data(data) 
      data.each do |lat, lon|
	    response= HTTParty.post("http://www.api.dronesmith.io/api/drone/elegant_brattain/goto",
           { 
          	"lat": lat,
            "lon": lon
            }
        )
     #ADD response AND ERROR
	   end  
    end

end


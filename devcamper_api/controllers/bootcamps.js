//we export each file so that we can use them in the routes file
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
//@desc       Get all bootcamps
//@route      GET /api/v1/bootcamps
//@access     public 
exports.getBootcamps = asyncHandler(async (req, res, next) => {
          const bootcamps = await Bootcamp.find();
          res.status(200).json({
               success: true,
               count: bootcamps.length,
               data: bootcamps
          });
});
//@desc       Get single bootcamps
//@route      GET /api/v1/bootcamps/:id
//@access     public 
exports.getBootcamp = asyncHandler(async(req, res, next) => { 
          const bootcamp = await Bootcamp.findById(req.params.id);
          if(!bootcamp) 
          {
               //return res.status(400).json({success: false});
               return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))//for a fromatted object id but not in the database
          }
          res.status(200).json({
               success: true,
               data: bootcamp
          });
});
//@desc       Create new bootcamp
//@route      POST /api/v1/bootcamps
//@access     private 
exports.createBootcamp = asyncHandler(async (req, res, next) => {
          const bootcamp = await Bootcamp.create(req.body);
          res.status(201).json({
               success: true,
               data: bootcamp
          });
     /*console.log(req.body);
     res.status(200).send({success: true, msg:'Create new bootcamp'});*/
})
//@desc       Update bootcamp
//@route      PUT /api/v1/bootcamps/:id
//@access     private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
           const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
               runValidators: true
          });
          if(!bootcamp)
          {
               return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))    
          }
               res.status(200).json({ success: true, data: bootcamp });
});

//@desc       Delete bootcamp
//@route      DELETE /api/v1/bootcamps/:id
//@access     private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
          const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
          if(!bootcamp)
          {
               return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
          }
          res.status(200).json({ success: true, data: {} });   
});
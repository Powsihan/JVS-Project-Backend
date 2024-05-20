import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicleModal.js";

const addVehicle = asyncHandler(async (req, res) => {
  const {
    name,
    registerno,
    type,
    brand,
    model,
    price,
    ownership,
    transmission,
    gear,
    color,
    yom,
    fuel,
    fuelcap,
    power,
    mileage,
    noofdoors,
    noofseats,
    district,
    description,
    features,
    documents,
    image,
    status,
  } = req.body;

  const vehicleExists = await Vehicle.findOne({ registerno });

  if (vehicleExists) {
    res.status(400);
    throw new Error("Vehicle already exists");
  }

  const vehicle = await Vehicle.create({
    name,
    registerno,
    type,
    brand,
    model,
    price,
    ownership,
    transmission,
    gear,
    color,
    yom,
    fuel,
    fuelcap,
    power,
    mileage,
    noofdoors,
    noofseats,
    district,
    description,
    features,
    documents,
    image,
    status,
  });

  if (vehicle) {
    res.status(200).json({
      data: vehicle,
      message: "Vehicle added Sucessfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid Vehicle Data");
  }
});

const getAllVehciles = asyncHandler(async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    if (vehicles.length === 0) {
      return res.status(404).json({ message: "Vehicle is Empty !" });
    }
    res.status(200).json(vehicles);
  } catch (err) {
    console.error("Failed to fetch Vehciles from MongoDB:", err);
    res.status(500).json({ message: err.message });
  }
});


const vehicleDetail =asyncHandler(async (req,res)=>{
    try {
        let _id = req.params.id;
        const vehicle = await Vehicle.findById(_id);
        if (!vehicle) {
          return res.status(404).json({ message: "Vehicle Not Found !" });
        }
        res.status(200).json(vehicle);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
})

export { addVehicle, getAllVehciles,vehicleDetail };
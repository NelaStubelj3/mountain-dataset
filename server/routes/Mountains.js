const express = require("express");
const router = express.Router();
const { Mountains } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listOfMountains = await Mountains.findAll();
    res.json({
      status: "OK",
      message: "Fetched all mountains",
      response: listOfMountains,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      message: error.message,
      response: null,
    });
  }
});

router.get("/:mountain_id", async (req, res) => {
  try {
    const mountain = await Mountains.findById(req.params.mountain_id);
    if (mountain) {
      res.status(200).json({
        status: "OK",
        message: "Fetched mountain",
        response: mountain,
      });
    } else {
      res.status(404).json({
        status: "Not found",
        message: "Mountain not found",
        response: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMountain = req.body;

    console.log(newMountain.mountain_name);
    const createdMountain = await Mountains.create(newMountain);

    res.status(201).json({
      status: "Created",
      message: "Mountain created successfully",
      response: createdMountain,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});

router.put("/:mountain_id", async (req, res) => {
  try {
    const updatedMountain = await Mountains.findByIdAndUpdate(
      req.params.mountain_id,
      req.body,
      { new: true }
    );
    if (updatedMountain) {
      res.status(200).json({
        status: "OK",
        message: "Mountain updated",
        response: updatedMountain,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: "Mountain not found",
        response: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});

router.delete("/:mountain_id", async (req, res) => {
  try {
    const deletedMountain = await Mountains.findByIdAndDelete(
      req.params.mountain_id
    );
    if (deletedMountain) {
      res.status(200).json({
        status: "OK",
        message: "Mountain deleted",
        response: deletedMountain,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: "Mountain not found",
        response: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
      response: null,
    });
  }
});

module.exports = router;

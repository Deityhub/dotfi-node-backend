const express = require("express");
const router = express.Router();
const { addEvent, fetchEvent, fetchEventList } = require("../services/store");

router.post("/store", async (req, res) => {
  try {
    const event = req.body;

    if (!event) {
      const error = new Error("Please provide an event object");
      error.code = 400;
      throw error;
    }

    await addEvent(event);

    return res.status(201).send({
      data: event,
    });
  } catch (error) {
    return res.status(error.code || 500).send({
      error:
        error.message || "Some error occurred while parsing the store data",
    });
  }
});

router.get("/store", async (req, res) => {
  try {
    const events = await fetchEventList();

    return res.status(200).send({
      data: events,
    });
  } catch (error) {
    return res.status(error.code || 500).send({
      error: error.message || "Some error occurred while fetching event list",
    });
  }
});

router.get("/store/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;

    if (!storeId) {
      const error = new Error("Please provide an event id");
      error.code = 400;
      throw error;
    }

    const event = await fetchEvent(storeId);

    return res.status(200).send({
      data: event,
    });
  } catch (error) {
    return res.status(error.code || 500).send({
      error: error.message || "Some error occurred while fetch an event",
    });
  }
});

module.exports = router;

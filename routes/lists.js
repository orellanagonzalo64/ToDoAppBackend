const router = require("express").Router();
const Lists = require("../models/Lists");

//Create lists
router.post("/", async (req, res) => {
    const newLists = new Lists(req.body);
    try {
      const savedLists = await newLists.save();
      res.status(200).json(savedLists);
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

    //Get lists
router.get("/:id", async (req, res) => {
    
  try {
      console.log("El id es" + req.params.id);
      const lists = await Lists.findOne( {"userId" : req.params.id});
      console.log(lists);
      if(lists === null) {
          console.log("listas nulas");
          return res.status(404).json(lists);
      }

      if (lists.userId === req.params.id) {
          res.status(200).json(lists);
        } else {
            
          res.status(403).json("No se encontro la lista");
        }
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Update lists
router.put("/:id", async (req, res) => {
    
  try {
      console.log("El id es" + req.params.id);
      const lists = await Lists.findOne( {"userId" : req.params.id});
      console.log(lists);
      if(lists === null) {
          console.log("listas nulas");
          res.status(404).json(lists);
      }

      if (lists.userId === req.params.id) {

        await lists.updateOne({ $set: req.body });
          res.status(200).json(lists);
        } else {
            
          res.status(403).json("No se encontro la lista");
        }
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


  module.exports = router;
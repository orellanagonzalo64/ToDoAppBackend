const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

  id: {
    type: String,
    required: true,
    
  },
  desc: {
    type: String,
    required: true,
  }
 
})


const ColumnSchema = new mongoose.Schema({

  idList: {
    type: String,
    
    
  },
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    dafault: {type: [TaskSchema],
              default: []
    }
  },

})

const ListsSchema = new mongoose.Schema({

  userId: {
      type: String,
      required: true,
    },
  lists: {type: [ColumnSchema],
          default: []
  }

});

module.exports = mongoose.model("Lists", ListsSchema);

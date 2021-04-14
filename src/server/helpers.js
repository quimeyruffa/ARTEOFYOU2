const moment = require("moment")
const helpers ={}

helpers.timeago = timestamp =>{
   return  moment(timestamp).startOf('minute').fromNow();
}
helpers.ifEqual= (obj, value,image)=> {
   console.log("ID", image)
   return ( (obj===value) ? 
  ` <button class="btn btn-danger" id="btn-delete" data-id="${image}" >
            <i class="fa fa-times"></i> Delete
        </button>`
   : null)};

module.exports = helpers; 
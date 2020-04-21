const fs = require("fs");

var result = "first_number;second_number;date\n";

for (var i = 0; i < 1901; i++) {
    try{
        var contents = fs.readFileSync(
            "./data/withDate/actorsRelationWithDate" + i + ".csv",
            "utf8"
          );
        
            result += contents;
        
        }
    catch(e){
        console.log(i + " missing");
    }        
}
 
fs.writeFile(
    "./data/allActorsRelationWithDate.csv",
    result,
    function(err) {
        if (err) {
        return console.log(err);
        }
        console.log("The file was saved!");
        console.log(result.length);
    }
);
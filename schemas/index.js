const mongoose = require("mongoose")
const connect = () => {
    const mongoId = process.env.MONGO_ID
    const mongoPw = process.env.MONGO_PW
    mongoose.connect(`mongodb://${mongoId}:${mongoPw}@localhost:27017/goodcode?authSource=admin&authMechanism=SCRAM-SHA-1`, {ignoreUndefined : true}).catch((err)=>{
        if (err) throw err; console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
    })
    console.log("mongoDB 연결 완료" );
}

module.exports = connect
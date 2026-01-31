import app from "./app"
import config from "./config/config"


try {
    app.listen(config.PORT, ()=>{
        console.log("Running the server on port 3000")
    })
} catch (error) {
    
}
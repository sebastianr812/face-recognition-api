
// checking to see if the grpc clarifai api is working 

const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 3b5e08e186c84e24925041f53bf36cb9");

const handleApiCall = (req,res)=>{
    try{
        stub.PostModelOutputs(
            {
                // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
                model_id: 'a403429f2ddf4b49b307e318f00e528b',
                inputs: [{data: {image: {url: req.body.input}}}]
            },
            metadata,
            (err, response) => {
                console.log(response)
                if (err) {
                    console.log("Error: " + err);
                    return;
                }
        
                if (response.status.code !== 10000) {
                    console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                    return;
                }
                res.json(response)
        
                console.log("Predicted concepts, with confidence values:")
                for (const c of response.outputs[0].data.concepts) {
                    console.log(c.name + ": " + c.value);
                }
                // res.json(response)
            }
        );
    }
    catch(error){
        console.log('something went wrong ', error)
    }
   
}

handleApiCall();


import "dotenv/config";
import cors from "cors";
import express from "express";
import { auth } from "@rideSharing/auth";
import { toNodeHandler } from "better-auth/node";
import { json } from "zod";

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (_req, res) => {
	res.status(200).send("OK");
});

app.post("/request-ride",(req, res)=>{
	res.json({message :" request api"})
})

app.post("/post-ride",(req,res)=>{
	res.json({message:"post ride request"})
})

app.post("/pos/:lat/:long",(req, res)=>{
	const {lat,long} = req.params
	console.log(lat,long)
	res.json({lat,long})
})

app.post("/status/:userId",(req, res)=>{
	const {userId} = req.params;
	// query in db for active status
	// if active then change it to inactive
	// send 
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
